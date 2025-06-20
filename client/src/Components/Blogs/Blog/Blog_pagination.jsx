import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import "./blog.css";
import Pagination from "../pagination/Pagination";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import BASE_URL from "../../../Pages/Config/config";
import { Container, Form, Row, Col } from "react-bootstrap";
import ServiceMainSection from "../../SubComponents/ServiceComponents/ServiceSubComponents/ServiceMainSection";

const Blog_pagination = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;
  const [searchTerm, setSearchTerm] = useState("");
      const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchBlogs = async () => {
    
      try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/blog/all-blog`, {
          headers : token ? 
           { Authorization: `Bearer ${token}`}
          :{},
        });
        if (data?.success) {
          setBlogs(data.blogs.reverse());
        }
      } catch (error) {
        //console.error("Error fetching blogs:", error);
        //console.error("Error fetching blogs:", error.response?.data || error.message);
      }
    };
    fetchBlogs();
  }, [token]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div style={{ backgroundColor: "#f5f3ff", minHeight: "100vh", paddingBottom: "3rem" }}>
      <Container className="text-center py-4">
        {/* <span className="badge bg-light text-primary mb-2">Our Blog</span> */}
          <ServiceMainSection highlights="OUR BLOGS" highlightsDouble="BLOGS"/>
        {/* <h3 className="fw-bold">Resources and Insights</h3> */}
        {/* <p className="text-muted">
          The latest industry news, interviews, technologies, and resources.
        </p> */}

        <Form className="d-flex justify-content-center my-4">
          <Form.Control
            type="search"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ maxWidth: "400px" }}
            className="shadow-sm"
          />
        </Form>
      </Container>

      <Container>
        <Row className="gy-4">
          {currentBlogs.map((post) => (
            <Col key={post._id} xs={12} sm={6} md={4} lg={3}>
                            <div className="blog-part h-100 d-flex flex-column">
                <div className="blog-imagesec position-relative overflow-hidden"style={{padding:"9px", borderRadius:"5px"}}>
                  <Link to={`/blogpost/${post.slug || post._id}`}>
                    {/* <img
                      src={
                        Array.isArray(post.thumbnail) && post.thumbnail.length > 0
                          ? `${BASE_URL}/${post.thumbnail[0].startsWith("/") ? post.thumbnail[0].slice(1) : post.thumbnail[0]}`
                          : post.image
                          ? post.image
                          : "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={post.title}
                      className="img-fluid rounded-top"
                      style={{ width: "100%", height: "auto", maxHeight: "230px", objectFit: "cover" }}                    /> */}

                      <img 
  src={
    Array.isArray(post.thumbnail) && post.thumbnail.length > 0
      ? `${BASE_URL}${post.thumbnail[0].startsWith('/') ? post.thumbnail[0] : '/' + post.thumbnail[0]}`
      : post.image
      ? post.image
      : "https://via.placeholder.com/300x200?text=No+Image"
  }
  alt={post.title}
/>

                  </Link>
                </div>

                <div className="blog-part-inner flex-grow-1 d-flex flex-column">
                  <div className="blogpost_detail d-flex justify-content-between text-primary small mb-2">
                    <span><FaUser className="me-1" />{post?.user?.username || "Unknown"}</span>
                    <span><SlCalender className="me-1" />{moment(post.createdAt).format("LL")}</span>
                  </div>
                  <h6 className="fw-bold h6" >
                    <Link to={`/blogpost/${post.slug || post._id}`} className="text-decoration-none text-dark">
                      {post.title.slice(0,27)} ...
                    </Link>
                  </h6>
                  <p className="text-muted flex-grow-1 mb-0">
                    {parse(DOMPurify.sanitize(post.description?.slice(0, 40)))}
                  </p>
                  <Link
  to={`/blogpost/${post.slug || post._id}`}
  state={{ width: "fit-content",  }}
  className="btn btn-outline-primary mt-auto "
  style={{ width: "fit-content", alignSelf: "center" , fontSize: "12px", padding: "4px 12px" }}
>
  Read more
</Link>

                  
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div className="d-flex justify-content-center mt-5">
        <Pagination
  blogsPerPage={blogsPerPage}
  totalPages={Math.ceil(filteredBlogs.length / blogsPerPage)}  currentPage={currentPage}
  paginate={setCurrentPage}
/>

        </div>
      </Container>
    </div>
  );
};

export default Blog_pagination;
