import React, { useEffect, useState , useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../Config/config";
import "./addcategory.css"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const id = localStorage.getItem("userId");

const Addcategory = () => {
   const inputRef = useRef(null);
  const navigate = useNavigate();
  const [input, setInput] = useState({ title: "" });
  const [categories, setCategories] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/all-categories`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data?.success && Array.isArray(data.category)) {
        setCategories(data.category);
        toast.success("Categories fetched successfully");
      } else {
        toast.error("No categories found");
        setCategories([]);
      }
    } catch {
      toast.error("Failed to fetch categories");
      setCategories([]);
    }
  };

  const handleChange = (e) => {
    setInput({ title: e.target.value });
  };

  const handleCategory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No authentication token found. Please log in.");
      navigate("/login");
      return;
    }
    if (!input.title.trim()) {
      toast.error("Category title is required");
      return;
    }
    try {
        if (editCategoryId) {
        const { data } = await axios.put(
          `http://localhost:8080/api/v1/category/update-categories/${editCategoryId}`,
          { title: input.title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.success) {
          toast.success("Category updated successfully");
          fetchCategories();
          setEditCategoryId("");
          setInput({ title: "" });
        } else {
          toast.error("Failed to update category");
        }
      } else {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/category/add-categories`,
        { title: input.title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Category added successfully");
          setInput({ title: "" });
        fetchCategories();
      } else {
        toast.error("Failed to add category");
      }
    }
    } catch (error) {
      //console.log("Error Response:", error.response);
      toast.error("Something went wrong");

  // if (error.response?.status === 409) {
  //   toast.error("Category already exists");
  // } else {
  //   toast.error("Error adding category");
  //   //console.error("Add Category Error:", error);
  // }
}

  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/category/delete-categories/${id}`
      );
      toast.success("Category deleted");
      fetchCategories();
    } catch (error) {
      //console.error("Failed to delete category", error);
      toast.error("Failed to delete category");
    }
  };

  if (!id) {
    return (
      <div className="cat-logged-in">
        <h4>Please login to add a category.</h4>
      </div>
    );
  }


   return (
    <div className="category-container">
      {/* Add Category Form */}
      <div ref={inputRef} className="category-form">
        <h2 className="categoryform-title">
          {editCategoryId ? "Edit Category" : "Add a new Category"}
        </h2>
        <form onSubmit={handleCategory}>
          <label htmlFor="categoryTitle" className="categoryform-label">
            Title
          </label>
          <input
            id="categoryTitle"
            type="text"
            value={input.title}
            onChange={handleChange}
            placeholder="Category Title"
            className="categoryform-input"
          />
          <button type="submit" className="categoryform-button">
            {editCategoryId ? "Update Category" : "Add Category"}
          </button>
        </form>
      </div>

      {/* List of Categories */}
        <h3 className="catlist-title">Available Categories</h3>
      <div className="category-list">

        {categories.length === 0 ? (
          <p className="no-categories">No categories found.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat._id} className="category-item">
              <span className="category-title">{cat.title}</span>
              <div className="category-actions">
                <button
                  onClick={() => {
                    setInput({ title: cat.title });
                    setEditCategoryId(cat._id);
                    inputRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="catbtn-edit"
                  aria-label="Edit category"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat._id)}
                  className="catbtn-delete"
                  aria-label="Delete category"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Addcategory;
