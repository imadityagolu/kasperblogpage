import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./userblog.css";
import { useBlogDelete } from "../../BlogContext/BlogDeleteContext";
import BASE_URL from "../Config/config";
import BlogCard from "../../Components/Blogs/AdminBoard/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { deletedBlogId } = useBlogDelete();
  const [filter, setFilter] = useState("all");

  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const filteredBlogs = blogs.filter((blog) => {
  if (filter === "approved") return blog.isApproved;
  if (filter === "disapproved") return blog.disapproved;
  if (filter === "pending") return !blog.isApproved && !blog.disapproved;
  return true; 
});

 
  const getUserBlogs = async () => {
    const id = localStorage.getItem("userId");

    if (!id) {
    return;
    }

    try {
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data?.success) {
        setBlogs(data?.userBlog.blogs.reverse());
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
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
      const { data } = await axios.delete(
        `/api/v1/blog/delete-blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
      
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      //console.log("Error deleting blog:", error);
    }
  };

  return (
    <div className="userblogs-wrapper">
      {/* <div className="usertitle-bar"><strong>User Blogs</strong></div> */}

       {/* Filter Buttons */}
      <div className="userfilter-bar">
        <strong>UserBlogs</strong>
        <div className="userfilter-btn">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("approved")} className={filter === "approved" ? "active" : ""}>Approved</button>
        <button onClick={() => setFilter("disapproved")} className={filter === "disapproved" ? "active" : ""}>Disapproved</button>
        <button onClick={() => setFilter("pending")} className={filter === "pending" ? "active" : ""}>Pending</button>
      </div>
   </div>

      <div className="userblogs-container">
         {filteredBlogs && blogs.length > 0 ? (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                slug={blog.slug}
               isUser={blog.user._id === userId}
                isAdmin={isAdmin}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                thumbnail={blog?.thumbnail}
                username={blog?.user?.username || "unknown"}
                handleDelete={() => handleDelete(blog._id)}
                time={moment(blog.createdAt).format("ll")}
                 previewOnly={true}
                  approved={blog?.isApproved ?? false}
          disapproved={blog?.disapproved ?? false}
              />
            ))}
          </div>
        ) : (
          <div className="no-blogs-text">
            You haven't created a blog yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBlogs;
