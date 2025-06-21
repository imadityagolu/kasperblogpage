import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminSidebar from "../../Components/Blogs/AdminBoard/AdminSidebar";
import TopMobileNavbar from "../../Components/Blogs/AdminBoard/TopMobileNavbar";
import "./blogdetails.css";
import Header from "../../Components/Blogs/AdminBoard/Header";
import BASE_URL from "../Config/config";

const BlogDetails = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const editor = useRef(null);

  const [inputs, setInputs] = useState({ title: "", description: "", image: "", category: "", thumbnail: [] });
  const [selectedTab, setSelectedTab] = useState("my-blogs");
  const [categories, setCategories] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogDetail();
    fetchCategories();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/category/all-categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      //console.error(error);
    }
  };

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/blog/get-blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data?.success) {
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
          category: data.blog.category?._id || "",
          thumbnail: data.blog.thumbnail || [],
        });
        setError("");
      }
    } catch (error) {
      console.error("BlogDetails fetch error:", error);
      if (error.response && error.response.status === 403) {
        setError("You are not authorized to edit this blog (it may not be approved or you are not the owner).");
      } else if (error.response && error.response.status === 404) {
        setError("Blog not found.");
      } else {
        setError("An error occurred while fetching the blog.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setInputs((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData;
      let headers = { Authorization: `Bearer ${token}` };
      if (thumbnailFile) {
        formData = new FormData();
        formData.append("title", inputs.title);
        formData.append("description", inputs.description);
        formData.append("category", inputs.category);
        formData.append("user", id);
        formData.append("thumbnail", thumbnailFile);
        headers["Content-Type"] = "multipart/form-data";
      } else {
        formData = {
          title: inputs.title,
          description: inputs.description,
          category: inputs.category,
          user: id,
        };
      }
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/blog/update-blog/${id}`,
        formData,
        { headers }
      );
      if (data?.success) {
        toast.success("Blog updated successfully!");
        navigate("/adminsidebar/my-blogs");
      }
    } catch (error) {
      toast.error("Failed to update blog");
    }
  };

  return (
    <>
      <Header className="header-updatepage" />
      <div className="mobile-top-navbar">
        <TopMobileNavbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <div className="update-layout">
        <div className="admin-sidebar">
          <AdminSidebar />
        </div>
        <div className="update-content">
          {loading ? (
            <div style={{ textAlign: "center", marginTop: 40, fontWeight: "bold" }}>Loading...</div>
          ) : error ? (
            <div style={{ color: "red", textAlign: "center", marginTop: 40, fontWeight: "bold" }}>{error}</div>
          ) : (
            <form onSubmit={handleSubmit} className="content-container">
              <h2 style={{ textAlign: "center", fontWeight: "bold", color: "gray", marginBottom: 20 }}>
                Update a post
              </h2>
              <label htmlFor="title" style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={inputs.title}
                onChange={handleChange}
                required
                style={{ height: 40, padding: "6px 14px", marginBottom: 20, fontSize: 16, borderRadius: 4, border: "1px solid #ccc" }}
              />
              <label htmlFor="category" style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
                Category
              </label>
              <select
                id="category"
                name="category"
                value={inputs.category}
                onChange={handleCategoryChange}
                required
                style={{ height: 40, padding: "6px 14px", marginBottom: 20, fontSize: 16, borderRadius: 4, border: "1px solid #ccc" }}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.title}</option>
                ))}
              </select>
              <label htmlFor="description" style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
                Description
              </label>
              <div style={{ marginBottom: 20, width: "100%" }}>
                <JoditEditor
                  ref={editor}
                  value={inputs.description}
                  tabIndex={1}
                  onChange={(newContent) => setInputs((prev) => ({ ...prev, description: newContent }))}
                />
              </div>
              <label htmlFor="thumbnail" style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
                Thumbnail
              </label>
              {inputs.thumbnail && inputs.thumbnail.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <img src={`${BASE_URL}${inputs.thumbnail[0].startsWith("/") ? inputs.thumbnail[0] : "/" + inputs.thumbnail[0]}`}
                    alt="Current Thumbnail" style={{ maxWidth: 120, borderRadius: 6 }} />
                </div>
              )}
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                style={{ marginBottom: 20 }}
              />
              <button
                type="submit"
                style={{ backgroundColor: "#f57c00", color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: "bold", cursor: "pointer", alignSelf: "center" }}
              >
                UPDATE
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
