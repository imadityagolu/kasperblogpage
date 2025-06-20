import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminSidebar from "../../Components/Blogs/AdminBoard/AdminSidebar";
import TopMobileNavbar from "../../Components/Blogs/AdminBoard/TopMobileNavbar";
import "./blogdetails.css";
import Header from "../../Components/Blogs/AdminBoard/Header";

const BlogDetails = () => {
  //const { slugOrId } = useParams();
   const id = useParams().id;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const editor = useRef(null);

  const [inputs, setInputs] = useState({ title: "", description: "", image: "" });
  const [selectedTab, setSelectedTab] = useState("my-blogs"); 

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data?.success) {
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
        });
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
           user: id,

        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data?.success) {
        toast.success("Blog updated successfully!");
        navigate("/adminsidebar/my-blogs");
      }
    } catch (error) {
      //console.log("Update error:", error?.response?.data || error.message);
      toast.error("Failed to update blog");
    }
  };

  return (
    <>
    <Header className="header-updatepage"/>
     
      <div className="mobile-top-navbar">
        <TopMobileNavbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>

      <div className="update-layout">
     
        <div className="admin-sidebar">
          <AdminSidebar />
        </div>

        <div className="update-content">
          <form onSubmit={handleSubmit} className="content-container">
            <h2
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "gray",
                marginBottom: 20,
              }}
            >
              Update a post
            </h2>

            <label
              htmlFor="title"
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={inputs.title}
              onChange={handleChange}
              required
              style={{
                height: 40,
                padding: "6px 14px",
                marginBottom: 20,
                fontSize: 16,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />

            <label
              htmlFor="description"
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}
            >
              Description
            </label>
            <div style={{ marginBottom: 20, width: "100%" }}>
              <JoditEditor
                ref={editor}
                value={inputs.description}
                tabIndex={1}
                onChange={(newContent) =>
                  setInputs((prev) => ({ ...prev, description: newContent }))
                }
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#f57c00",
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: "10px 20px",
                fontWeight: "bold",
                cursor: "pointer",
                alignSelf: "center",
              }}
            >
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
