import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import ErrorBoundary from "./Components/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import "aos/dist/aos.css";
import AOS from "aos";

// Lazy load main pages
const Home = lazy(() => import("./Pages/HomePage/Home"));
const AboutPage = lazy(() => import("./Pages/AboutPage/AboutPage"));
const Career = lazy(() => import("./Pages/Career/Career"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const Webdevelopment = lazy(() => import("./Pages/ServicesPages/Webdevelopment"));
const AppDevelopment = lazy(() => import("./Pages/ServicesPages/MobileAppDevelopment"));
const DigitalMarketing = lazy(() => import("./Pages/ServicesPages/DigitalMarketing"));
const CMSdevelopmet = lazy(() => import("./Pages/ServicesPages/CMSdevelopmet"));
const HealthandFitness = lazy(() => import("./Pages/IndustriesPage/HealthandFitness"));
const BusinessAppdev = lazy(() => import("./Pages/IndustriesPage/BusinessAppdev"));
const ITESDevelopment = lazy(() => import("./Pages/IndustriesPage/ITESDevelopment"));
const CRMDevelopment = lazy(() => import("./Pages/ServicesPages/CRMDevelopment"));
const TravelApp = lazy(() => import("./Pages/IndustriesPage/TravelApp"));
const MediaEntertainment = lazy(() => import("./Pages/IndustriesPage/MediaEntertainment"));
const ERPDevlopment = lazy(() => import("./Pages/ServicesPages/ERPDevlopment"));
const SportsAppDev = lazy(() => import("./Pages/IndustriesPage/SportsAppDev"));
const EducationAppdev = lazy(() => import("./Pages/IndustriesPage/EducationAppdev"));
const FinanceAppdev = lazy(() => import("./Pages/IndustriesPage/FinanceAppdev"));
const RealEstateAppdev = lazy(() => import("./Pages/IndustriesPage/RealEstateAppdev"));
const EcommerceAppDev = lazy(() => import("./Pages/IndustriesPage/EcommerceAppDev"));
const SocialMediaAppDev = lazy(() => import("./Pages/IndustriesPage/SocialMediaAppDev"));
const PrivacyPolicy = lazy(() => import("./Components/PrivacyPolicy/PrivacyPolicy"));
const Login = lazy(() => import("./Pages/BlogPages/Login"));
const Blogs = lazy(() => import("./Pages/BlogPages/Blogs"));
const AdminLayouts = lazy(() => import("./Components/Blogs/AdminBoard/AdminSidebar"));
const Profile = lazy(() => import("./Pages/BlogPages/Profile"));
const UserBlogs = lazy(() => import("./Pages/BlogPages/UserBlogs"));
const Addcategory = lazy(() => import("./Pages/BlogPages/Addcategory"));
const AddBlog = lazy(() => import("./Pages/BlogPages/AddBlog"));
const BlogPagination = lazy(() => import("./Components/Blogs/Blog/BlogPagination"));
const BlogPost = lazy(() => import("./Components/Blogs/blogpost/Blogpost"));
const Footer = lazy(() => import("./Components/Footer/Footer"));
const Header = lazy(() => import("./Components/Blogs/AdminBoard/Header"));
const Register = lazy(() => import("./Pages/BlogPages/Register"));
const BlogDetails = lazy(() => import("./Pages/BlogPages/BlogDetails"));
const CategoryBlogs = lazy(() => import("./Pages/BlogPages/CategoryBlogs"));
const SingleBlog = lazy(() => import("./Pages/BlogPages/SingleBlog"));
const ManageUsers = lazy(() => import("./Pages/BlogPages/ManageUsers"));
const Comment = lazy(() => import("./Pages/BlogPages/Comment"));
const PrivateRoute = lazy(() => import("./Pages/BlogPages/services/ProtectedRoutes"));

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <Toaster position="top-right" reverseOrder={false} />
        <Suspense fallback={<div style={{textAlign:'center',marginTop:'2rem'}}>Loading...</div>}>
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
              <Route path="web-application-development" element={<Webdevelopment />} />
              <Route path="cms-software-development" element={<CMSdevelopmet />} />
              <Route path="mobile-app-development" element={<AppDevelopment />} />
              <Route path="digital-marketing-agency" element={<DigitalMarketing />} />
              {/* Industries Page */}
              <Route path="travel-app-development" element={<TravelApp />} />
              <Route path="sports-app-development-company" element={<SportsAppDev />} />
              <Route path="healthcare-mobile-app-development" element={<HealthandFitness />} />
              <Route path="business-apps-development" element={<BusinessAppdev />} />
              <Route path="ITES-service" element={<ITESDevelopment />} />
              <Route path="media-entertainment-app-development" element={<MediaEntertainment />} />
              <Route path="education-mobile-app-development" element={<EducationAppdev />} />
              <Route path="mobile-banking-app-development" element={<FinanceAppdev />} />
              <Route path="best-real-estate-app-development" element={<RealEstateAppdev />} />
              <Route path="ecommerce-mobile-app-development" element={<EcommerceAppDev />} />
              <Route path="social-app-development" element={<SocialMediaAppDev />} />
              {/* blog route */}
              <Route path="/blogpage" element={<BlogPagination />} />
              <Route path="/blogpost/:slugOrId" element={<BlogPost />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/my-blogs" element={<UserBlogs />} />
              <Route path="/addcategory" element={ <Addcategory />} />
              <Route path="/adminsidebar" element={ <Blogs />} />
              <Route path="/comment" element={  <Comment />} />
              <Route path="/manage-users" element={<><Header /><ManageUsers /></>} />
            </Route>
            <Route path="/blog-details/:id" element={<PrivateRoute><BlogDetails /></PrivateRoute>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/get-profile" element={ <Profile />  } />
            <Route path="/profile/:userId" element={ <Profile /> } />
            <Route path="/category/:slug" element={<CategoryBlogs />} />
            <Route path="/addblog" element={<PrivateRoute><AddBlog /></PrivateRoute>} />
            <Route path="/singleblog/:slug" element={<SingleBlog />} />
            <Route path="/blog/:slug" element={<><BlogPost /><Footer /></>} />
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
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
