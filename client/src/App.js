import { createBrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/HomePage/Home";
import AboutPage from "./Pages/AboutPage/AboutPage";
import Career from "./Pages/Career/Career";
import Contact from "./Pages/Contact/Contact";
import Webdevelopment from "./Pages/ServicesPages/Webdevelopment";
import AppDevelopment from "./Pages/ServicesPages/MobileAppDevelopment";
import DigitalMarketing from "./Pages/ServicesPages/DigitalMarketing";
import CMSdevelopmet from "./Pages/ServicesPages/CMSdevelopmet";
import HealthandFitness from "./Pages/IndustriesPage/HealthandFitness";
import BusinessAppdev from "./Pages/IndustriesPage/BusinessAppdev";
import ITESDevelopment from "./Pages/IndustriesPage/ITESDevelopment";
import CRMDevelopment from "./Pages/ServicesPages/CRMDevelopment";
import TravelApp from "./Pages/IndustriesPage/TravelApp";
import MediaEntertainment from "./Pages/IndustriesPage/MediaEntertainment";
import ERPDevlopment from "./Pages/ServicesPages/ERPDevlopment";
import SportsAppDev from "./Pages/IndustriesPage/SportsAppDev";
import EducationAppdev from "./Pages/IndustriesPage/EducationAppdev";
import FinanceAppdev from "./Pages/IndustriesPage/FinanceAppdev";
import RealEstateAppdev from "./Pages/IndustriesPage/RealEstateAppdev";
import EcommerceAppDev from "./Pages/IndustriesPage/EcommerceAppDev";
import SocialMediaAppDev from "./Pages/IndustriesPage/SocialMediaAppDev";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
//blog routes import

import ReactGA from "react-ga";
import Login from "./Pages/BlogPages/Login";
import BlogRouter from "./Pages/Blog/Blogrouter";

import Blogs from "./Pages/BlogPages/Blogs";
import AdminLayouts from "./Components/Blogs/AdminBoard/AdminSidebar";
import Profile from "./Pages/BlogPages/Profile";
import UserBlogs from "./Pages/BlogPages/UserBlogs";
import Addcategory from "./Pages/BlogPages/Addcategory";
import AddBlog from "./Pages/BlogPages/AddBlog";
import { Navbar } from "react-bootstrap";
import Blog_pagination from "./Components/Blogs/Blog/Blog_pagination";
import BlogPost from "./Components/Blogs/blogpost/Blogpost";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Blogs/AdminBoard/Header";
import Register from "./Pages/BlogPages/Register";
import BlogDetails from "./Pages/BlogPages/BlogDetails";
import CategoryBlogs from "./Pages/BlogPages/CategoryBlogs";
import SingleBlog from "./Pages/BlogPages/SingleBlog";
import ManageUsers from "./Pages/BlogPages/ManageUsers";
import Comment from "./Pages/BlogPages/Comment";

import PrivateRoute from "./Pages/BlogPages/services/ProtectedRoutes";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";


function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route element={<Layout />}>
          {/* Pages */}
          <Route index path="/" element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="/About-us" element={<AboutPage />} />
          <Route path="Career" element={<Career />} />
          <Route path="Contact-us" element={<Contact />} />
          <Route path="Privacy-Policy" element={<PrivacyPolicy />} />

          {/* SERVICES PAGE */}
          <Route path="erp-software-development" element={<ERPDevlopment />} />
          <Route path="crm-development-service" element={<CRMDevelopment />} />
          <Route
            path="web-application-development"
            element={<Webdevelopment />}
          />
          <Route path="cms-software-development" element={<CMSdevelopmet />} />
          <Route path="mobile-app-development" element={<AppDevelopment />} />
          <Route
            path="digital-marketing-agency"
            element={<DigitalMarketing />}
          />
          {/* Industries Page */}

          <Route path="travel-app-development" element={<TravelApp />} />
          <Route
            path="sports-app-development-company"
            element={<SportsAppDev />}
          />
          <Route
            path="healthcare-mobile-app-development"
            element={<HealthandFitness />}
          />
          <Route
            path="business-apps-development"
            element={<BusinessAppdev />}
          />
          <Route path="ITES-service" element={<ITESDevelopment />} />
          <Route
            path="media-entertainment-app-development"
            element={<MediaEntertainment />}
          />
          <Route
            path="education-mobile-app-development"
            element={<EducationAppdev />}
          />
          <Route
            path="mobile-banking-app-development"
            element={<FinanceAppdev />}
          />
          <Route
            path="best-real-estate-app-development"
            element={<RealEstateAppdev />}
          />
          <Route
            path="ecommerce-mobile-app-development"
            element={<EcommerceAppDev />}
          />
          <Route
            path="social-app-development"
            element={<SocialMediaAppDev />}
          />
          {/* blog route */}
          <Route path="/blogpage" element={<Blog_pagination />} />
          <Route path="/blogpost/:slugOrId" element={<BlogPost />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/my-blogs" element={<UserBlogs />} />
          <Route path="/addcategory" element={ <Addcategory />} />
          <Route path="/adminsidebar" element={ <Blogs />} />
          <Route path="/comment" element={  <Comment />} />

         <Route
            path="/manage-users"
            element={
              <>
                <Header />
                <ManageUsers />
              </>
            }
          />
        </Route>
     
      <Route path="/blog-details/:id"
            element={
              <PrivateRoute>
                <BlogDetails />
              </PrivateRoute>
            }
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/get-profile" element={ <Profile />  }
          />
          <Route path="/profile/:userId" element={ <Profile /> }
          />
          {/* <Route path="/category-blog/:slug" element={<CategoryBlogs />} /> */}
            <Route path="/category/:slug" element={<CategoryBlogs />} />
      <Route path="/addblog" element={<PrivateRoute><AddBlog /></PrivateRoute>} />
     <Route path="/singleblog/:slug" element={<SingleBlog />} />

         
          <Route
            path="/blog/:slug"
            element={
              <>
              <BlogPost />
                <Footer />
              </>
            }
          />

          {/* Blog Auth/Login */}
          <Route path="login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Admin Routes with Nested Children protected*/}
          <Route element={<PrivateRoute />}>
          <Route path="adminsidebar" element={<AdminLayouts />}>
            {/* Nested routes inside AdminLayouts */}
            <Route path="blogs" element={<Blogs />} />
            <Route path="addblog" element={<AddBlog />} />
            <Route path="addcategory" element={<Addcategory />} />
            <Route path="comment" element={<Comment />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="my-blogs" element={<UserBlogs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="get-profile" element={<Profile />} />

          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
