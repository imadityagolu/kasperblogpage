import React, { useEffect, useRef, useState } from "react";
import "./addblog.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import JoditEditor from "jodit-react";
import BASE_URL from "../Config/config";

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    imageURL: "",
    imageFiles: [],
  });

  const [categories, setCategories] = useState([]);
  const [imageSource, setImageSource] = useState("file");

  useEffect(() => {
    const fetchAllcategories = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/category/all-categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        //console.error("Error fetching categories:", error);
      }
    };
    fetchAllcategories();
  }, []);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const contentFieldChanged = (data) => {
    setFormData({ ...formData, description: data });
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      setFormData({
        ...formData,
        imageFiles: Array.from(files),
      });
    }
  };

  const handleImageURLChange = (e) => {
    setFormData({
      ...formData,
      imageURL: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.description) {
      toast.error("All fields are required!");
      return;
    }

    if (imageSource === "file" && !formData.imageFiles.length) {
      toast.error("Please upload an image file!");
      return;
    }

    if (imageSource === "url" && !formData.imageURL) {
      toast.error("Please provide an image URL!");
      return;
    }

    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("category", formData.category);
    formdata.append("description", formData.description);
    formdata.append("user", id);

    if (formData.imageFiles.length) {
      formData.imageFiles.forEach((file) => {
        formdata.append("thumbnail", file);
      });
    }

    if (formData.imageURL) {
      formdata.append("image", formData.imageURL);
    }

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/blog/create-blog`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        toast.success("Blog added successfully");
        navigate("/adminsidebar/my-blogs");
      }
    } catch (error) {
       const errorMessage = error.response?.data?.message || "Error adding blog";
      toast.error(errorMessage);
      //console.error(error.response?.data || error.message);
    }
  };

  if (!id) {
    return (
      <Container className="text-center mt-5">
        <h4>Please login to create a blog.</h4>
      </Container>
    );
  }



  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="border p-4 rounded shadow-sm bg-light">
            <h2 className="text-center mb-4 bg-addform">Create New Blog Post</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="add-form-group">
                <Form.Label className="add-form">Blog Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter blog title"
                  className="add-form-input"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 ">
                <Form.Label className="add-form"> Select Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                >
                  <option value="">-- Select --</option>
                  {categories &&
                    categories.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.title}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="add-form">Description</Form.Label>
                <div className="border rounded bg-white">
                  <JoditEditor
                    ref={editor}
                    value={formData.description}
                    onChange={contentFieldChanged}
                  />
                </div>
              </Form.Group>

              <p>Max Filesize 2Mb</p>

              <Form.Group className="mb-3">
                <Form.Label className="add-form">Main Image</Form.Label>
                <div className="d-flex gap-3 mb-2 
                " >
                  <Form.Check
                  
                    inline
                  label={<span className="form-check-label-custom">Upload File</span>}
                    type="radio"
                    name="imageSource"
                      className="image-url-input"
                    id="fileOption"
                    value="file"
                    checked={imageSource === "file"}
                    onChange={() => setImageSource("file")}
                  />
                  <Form.Check
                    inline
                     label={<span className="form-check-label-custom">Image URL</span>}
                      className="image-url-input"
                    type="radio"
                    name="imageSource"
                    id="urlOption"
                    value="url"
                    checked={imageSource === "url"}
                    onChange={() => setImageSource("url")}
                  />
                </div>

                {imageSource === "file" ? (
                  <Form.Control
                   className="image-url-input"
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                  />
                ) : (
                  <Form.Control
                   className="add-form-input"
                    type="text"
                    placeholder="Enter Image URL"
                    
                    value={formData.imageURL}
                    onChange={handleImageURLChange}
                  />
                )}
              </Form.Group>

              <div className="text-center mt-4">
                <Button variant="primary" type="submit" size="lg" className="add-form-btn">
                  Add Blog
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBlog;
