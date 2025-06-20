import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Box, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBlogDelete } from "../../BlogContext/BlogDeleteContext";
import BASE_URL from "../Config/config";
import BlogCard from "../../Components/Blogs/AdminBoard/BlogCard";

const Blogs = () => {

   const filterBtnStyle = {
  margin: "0 5px",
  padding: "6px 12px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
  background: "#f5f5f5",
};
   const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const { deletedBlogId, deleteBlog } = useBlogDelete();
   const [filter, setFilter] = useState("all");
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const filteredBlogs = blogs.filter((blog) => {
  if (filter === "approved") return blog.isApproved;
  if (filter === "disapproved") return blog.disapproved;
  if (filter === "pending") return !blog.isApproved && !blog.disapproved;
  return true; // all
});

    useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

      setUserId(storedUserId);
    setIsAdmin(role === "admin");
  }, []);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/blog/all-blog`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (data?.success) {
        
        setBlogs(data?.blogs.reverse());
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    if (deletedBlogId) {
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== deletedBlogId)
      );
    }
  }, [deletedBlogId]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/v1/blog/delete-blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (data?.success) {
        deleteBlog(id); // Update the context with the deleted blog ID
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      //console.log("Error deleting blog:", error);
    }
  };

  const handleApprove = async (id) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8080/api/v1/admin/blog/${id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (data?.success) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === id ? { ...blog, isApproved: true , disapproved: false} : blog
        )
      );
    }
  } catch (error) {
    //console.error("Error approving blog:", error);
  }
};

const handleDisapprove =async (blogId) => {
  try{
await axios.put(`http://localhost:8080/api/v1/admin/blog/${blogId}/disapprove` , 
  {},{
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
 });

  setBlogs((prevBlogs)=> prevBlogs.map((blog)=>
    blog._id ===blogId ? {...blog,isApproved: false, disapproved:true}: blog
  ));
  } catch (error) {
    //console.error("Error disapproving blog" , error);
  }
};
useEffect(() => {
  //console.log("userId or isAdmin changed:", userId, isAdmin);
}, [userId, isAdmin]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            flexDirection: "column",
            padding: 0,
          }}
        >

           <Box sx={{
    display:"flex", justifyContent:"space-between", alignItems: "center", mb: 2 ,px:3 }}>
         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Blog
         </Typography>
           <Box sx={{
    display:"flex"}}>
            <button onClick={()=> setFilter("all")} style={filterBtnStyle}>All</button>
              <button onClick={() => setFilter("approved")} style={filterBtnStyle}>Approved</button>
    <button onClick={() => setFilter("disapproved")} style={filterBtnStyle}>Disapproved</button>
    <button onClick={() => setFilter("pending")} style={filterBtnStyle}>Pending</button>
          </Box>
           </Box>
        

        <div className="blogs-wrapper">
 <div className="blogs-grid">
   {filteredBlogs.map((blog) => {
   

    return (
      <BlogCard
        key={blog?._id}
        id={blog?._id}
        isUser={userId === blog?.user?._id}
          isAdmin={isAdmin}
        title={blog?.title}
        description={blog?.description}
        image={blog?.image}
        thumbnail={blog?.thumbnail}
        slug={blog?.slug || blog?._id}
        username={blog?.user?.username}
        time={moment(blog?.createdAt).format("ll")}
        handleDelete={() => handleDelete(blog._id || blog.slug)}
        previewOnly={true}
         approved={blog?.isApproved ?? false}
        disapproved={blog?.disapproved ?? false}
        onApprove={()=>handleApprove(blog._id)}
        onDisapprove={()=> handleDisapprove(blog._id)}
      />
    );
  })}
</div>

</div>

        </Box>
      </Box>
    </div>
  );
};

export default Blogs;
