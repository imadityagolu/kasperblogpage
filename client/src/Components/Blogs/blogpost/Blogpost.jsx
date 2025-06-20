import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { FaRegSmile} from "react-icons/fa";
import ShareButton from "../ShareButton";
import LikeButton from "../LikeButton";
import {
 
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import "./blogpost.css";
import CommentSection from "../../CommentSection/CommentSection";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import parse, { domToReact } from "html-react-parser";
import BASE_URL from "../../../Pages/Config/config";
import slugify from "slugify";

const BlogPost = () => {
  const { slugOrId } = useParams();
  const [blog, setBlog] = useState(null);
  const [toc, setToc] = useState([]);
   const imageRef = useRef(null);
  const navigate = useNavigate();

    const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
   const [showFullImage, setShowFullImage] = useState(false);
const [isTallImage, setIsTallImage] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [blogs, setBlogs] = useState([]);


  //image-length
      useEffect(() => {
  const img = imageRef.current;
  if (img && img.complete) {
    const height = img.naturalHeight;
    setIsTallImage(height > 500);
  }
}, [blog?.thumbnail, selectedIndex, blog?.image]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/blog/all-blog`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (data?.success) {
          setBlogs(data.blogs.slice().reverse());
        }
      } catch (error) {
        //console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);
  
  
  //fetch blog
  useEffect(() => {
    if (!slugOrId) {
      
      return;
    }
    const fetchBlog = async () => {
      // console.log("User Info:", blog?.user);
      try {
      
        const { data } = await axios.get(`${BASE_URL}/api/v1/blog/get-blog/${slugOrId}`, {
          headers : token ? {Authorization:`Bearer ${token}` }:{},
        });
     
        if (data?.success) {
          setBlog(data.blog);
        

        }
      } catch (error) {
        //console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [slugOrId]);

  //toc section
  const [parsedContent, tocData] = useMemo(() => {
    if (!blog?.description) return [null, []];

    const headings = [];
    // let index = 0;

    //slugigy code
      const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/-/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
      
    const content = parse(DOMPurify.sanitize(blog.description), {
  replace: (domNode) => {
    if (
      domNode.type === "tag" &&
      /^h[1-6]$/.test(domNode.name)
    ) {
       // Extract text from heading
   

      const extractText = (node) => {
  if (!node) return "";
  if (node.type === "text") return node.data;
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractText).join("");
  }
  return "";
};

const formatTextForTOC = (text , wordLimit=5)=> {
  const cleaned = text
    .replace(/-/g, ' ')                     
    .replace(/([a-z])([A-Z])/g, '$1 $2')     
    .replace(/\s+/g, ' ')                  
    .trim();

      const words = cleaned.split(" ");
  return words.slice(0, wordLimit).join(" ") + (words.length > wordLimit ? "..." : "");
};

 
 const fullText = extractText(domNode).trim();


          const id = slugify(fullText);

   const textContent = formatTextForTOC(fullText, 5);
      headings.push({ id, text: textContent });

      return React.createElement(
        domNode.name,
        { id },
        domToReact(domNode.children)
      );
    }
  },
});

    return [content, headings];
  }, [blog?.description]);
  useEffect(() => {
    setToc(tocData);
  }, [tocData]);

  //fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/category/all-categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (data?.success && Array.isArray(data.category)) {
          setCategories(data.category);
        } else {
          setCategories([]);
        }
      } catch (error) { }
    };
    fetchCategories();
  }, []);

  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 4);

  if (!blog) {
    return (
      <div className="container mt-5">
        <Skeleton height={40} width={`60%`} />
        <Skeleton height={200} />
        <Skeleton count={6} />
      </div>
    );
  }

    const blogId = blog._id;

  let headingRenderIndex = 0;
  const contentWithAnchors = parse(DOMPurify.sanitize(blog.description), {
    replace: (domNode) => {
      if (domNode.name && /^h[1-6]$/.test(domNode.name)) {
        const id = `heading-${headingRenderIndex++}`;
        const text = domToReact(domNode.children);
        return React.createElement(domNode.name, { id }, text);
      }
    },
  });

  //blog-image
  const imageUrl =
    Array.isArray(blog.thumbnail) && blog.thumbnail.length > 0
      ? `${BASE_URL}/${blog?.thumbnail[0].startsWith("/")
        ? blog.thumbnail[0].slice(1)
        : blog.thumbnail[0]
      }`
      : blog.image || "/imgthumb.png";

  

      // Function to change image
const handleImageScrolls = (changedirection) => {
  if(!blog?.thumbnail || blog.thumbnail.length === 0) return;

  const total = blog.thumbnail.length;
  const nextIndex = (selectedIndex + changedirection + total)%total;
  setSelectedIndex(nextIndex);
};

const getImageUrl = (path) => {
  // console.log("path received" ,path);
  if(typeof path !== "string") return "/imagethumb.png";
 return  `http://localhost:8080/${path.startsWith('/') ? path.slice(1) : path}`;
}

  return (

    <div className="blogpost container-fluid my-0 py-5">
  <div className="row h-100">
        {/* <Link to="/blogpage" className="backtohome text-decoration-none">
          <span className="custom-back-btn">
            <IoIosArrowBack className="me-2" />
            <span>Back</span>
          </span>
        </Link> */}
     

    <div className="row h-100">
      
      {/* Main Blog Post */}
      <div className="blog-main-section col-lg-9 d-flex flex-column">
         <div className="imagesec-wrapper">
         <div className="blog-titles sticky-title bg-white">
        <h3 className="mb-3 tittle">{blog.title}</h3>
      </div>
        {/* your blog content here */}
          {/* Combine slider + expandable main image */}




            <div
  className="blog-img-container position-relative mb-2"
  style={{
       maxHeight: showFullImage ? "none" : "600px", borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
  }}
>
  <img
    ref={imageRef}
    src={  blog?.thumbnail?.length
            ? getImageUrl(blog.thumbnail[selectedIndex])
            : blog?.image || "/imgthumb.png"
        }
    className="img-fluid w-100"
      alt={`Blog  ${selectedIndex + 1}`}
     onLoad={(e) => {
    const height = e.target.naturalHeight;
   
      setIsTallImage(height> 500);
    
  }}
    style={{ display: "block", borderRadius: "8px", aspectRatio: "16 / 9", objectFit: "cover" ,objectPosition:"top",  transition: "max-height 0.4s ease",
          maxHeight: showFullImage ? "none" : "500px",
    }}
  />

  {/* Slider arrows */}
 {blog?.thumbnail?.length> 1 && (
    <>
    <button
    className="slider-button-left"
    onClick={()=> handleImageScrolls(-1)}
    aria-label="previous Image"
          style={{ position: "absolute", top: "50%", left: 0, zIndex: 5 ,width:"44px"}}
    >
      <AiOutlineLeft size={24}/>
    </button>
    <button
    className="slider-button right"
    onClick={() => handleImageScrolls(1)}
    aria-label="Next Image"
     style={{ position: "absolute", top: "50%", right: 0 ,width:"44px"}}
    >
      <AiOutlineRight size={24} />
    </button>
    </>
  )}

    {/* Expand toggle button */}

 {isTallImage &&  (
    <div
      onClick={() => setShowFullImage(!showFullImage)}
      className="image-toggle-arrow position-absolute bottom-0 w-100 text-center p-3"
      style={{
        background:
          "linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.1))",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      
        <IoIosArrowDown size={30} style={{ color: "#333" }} />
    
    </div>
  )}

   
    </div>


       {/* Author and Actions Section */}
       
  <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 py-2 px-1  bg-light rounded ">
     {/* LEFT: Author Info */}
    <div className="author-info d-flex align-items-center gap-3">
        <img 
              src={
                blog?.user?.profile
                  ? `${BASE_URL}/upload/${blog.user.profile}`
                  : "https://via.placeholder.com/50x50?text=No+Img"
              }
        alt="Author"
        className="rounded-circle"
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
      />
   <div>
        <p className="mb-0 fw-bold text-capitalize">{blog?.user?.username || "Unknown Author"}</p>
       
      </div>
      <div>
         <p className="mb-0 text-muted ps-3 " style={{ fontSize: "0.9rem",   borderLeft: "3px solid #6c757d" }}>
          {moment(blog.createdAt).format("LL")}
        </p>
      </div>
    </div>
  {/* RIGHT: Like & Share */}
    <div className="d-flex align-items-center gap-3">
      <LikeButton blogId={blog._id} />
        <ShareButton slug={blog.slug || blog._id} />
         </div>
          </div>



          <div className="parsed-content">{parsedContent}</div>

           <p className="fs-6 fw-400">Thankyou for you time.Hope you enjoy and revisit soon! 
            <FaRegSmile style={{color:"gold",fontSize:"22px"}} />
            </p>
        
   

     
      <CommentSection blogId={blogId}/>
       </div>
    </div>

      {/* Sidebar */}
      <div className="side-blogcontainer col-lg-3 d-none d-lg-block">
          {toc.length > 0 && (
            <div className="mb-4 toc-section">
              <h4>Table of Contents</h4>
              <div className="button-container">
                {toc.map((item, index) => (
                  <button key={item.id} className="custom-button">
                    <a href={`#${item.id}`} className="button-link">
                      {index + 1}. {item.text}
                    </a>
                  </button>
                ))}
              </div>
            </div>
          )}



          <div className="mb-4 shadow rounded border p-4 bg-light text-primary categories-section ">
            <h4 className="mb-3 text-dark border-bottom pb-2">Categories</h4>

            <div className="category-grid">
              {visibleCategories.length === 0 ? (
                <button className="category-btn">
                  No Categories Available
                </button>
              ) : (
                visibleCategories.map((cat) => {
                   const slugOrId = cat.slug
                    ? cat.slug
                    : cat.title
                    ? slugify(cat.title)
                    : cat._id;

                  return(
                  <button
                    key={cat._id}
                    className="category-btn"
                    onClick={() => navigate(`/category/${slugOrId}`)}
                  >
                    {cat.title}
                  </button>
                );
                })
              )}
            </div>
            {categories.length > 4 && (
              <div className="mt-3 text-center">
  <span
    className="show-more-btn d-inline-flex align-items-center gap-1"
    onClick={() => setShowAll(!showAll)}
    style={{ cursor: "pointer", fontWeight: "bold" }}
  >
    {showAll ? (
      <>
        Show Less <FaChevronUp />
      </>
    ) : (
      <>
        Show More <FaChevronDown />
      </>
    )}
  </span>
</div>
              
        
            )}
          </div>

          <div className="mb-4 shadow rounded border p-4 bg-light text-primary">
            <h4 className="mb-3 text-dark border-bottom pb-2">Recent Posts</h4>
            <ul className="list-unstyled m-0">
              {blogs.slice(0, 4).map((blog, index) => (
                <li
                  key={index}
                  className="mb-2"
                  style={{ backgroundColor: "white" }}
                >
                  <Link
                    to={`/blogpost/${blog.slug || blog._id}`}
                    className="recent-post-item d-flex align-items-start text-decoration-none"
                  >
                    <img
                      src={
                        Array.isArray(blog.thumbnail) &&
                          blog.thumbnail.length > 0
                          ? `${BASE_URL}/${blog.thumbnail[0].startsWith("/")
                            ? blog.thumbnail[0].slice(1)
                            : blog.thumbnail[0]
                          }`
                          : blog.image ||
                          "https://via.placeholder.com/50x40?text=No+Img"
                      }
                      alt="recent"
                      className="img-thumbnail"
                    />
                    <div className="recent-post-text">
                    <span className="title">{blog.title.slice(0, 25)}...</span>
                      <span className="date">
                        {moment(blog.createdAt).format("LL")}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
         
    </div>
  </div>
  
</div>

   
  );
};

export default BlogPost;
