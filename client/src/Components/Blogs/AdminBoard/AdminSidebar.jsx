import React, { useEffect, useState } from "react";
import Header from "../AdminBoard/Header"; 

import {
  Box,
  Drawer,
  Avatar,
  Button,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import CategoryIcon from "@mui/icons-material/Category";
import CreateIcon from "@mui/icons-material/Create";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CommentIcon from '@mui/icons-material/Comment'; 
import BASE_URL from "../../../Pages/Config/config";

const AdminLayouts = () => {
  const [selectedTab, setSelectedTab] = useState("blogs");

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email") || "";
  const user = JSON.parse(localStorage.getItem("user"));
   const isLogin = useSelector((state) => state.auth.isLogin);
  const isUserLogin = isLogin || token || userId;
   

  // const isTablet = useMediaQuery("(max-width: 1200px)");
  // const isMobile = useMediaQuery("(max-width: 768px)");
  const isCompact = useMediaQuery("(max-width: 768px)");

  const location = useLocation();
  
  
  // const isCompactPage = (location.pathname.includes("addblog") || location.pathname.includes("blogs")) ;
  const isCompactPage = [
  "addblog",
  "blogs",
  "my-blogs",
  "addcategory",
  "profile",
  "home",
   "manage-users",
   "comment"
].some((page) => location.pathname.includes(page));

 


  const base = "/adminsidebar";

  const iconNavItems = [
    { icon: <HomeIcon />, path: "/home", key: "home" },
    { icon: <PersonIcon />, path: `${base}/profile`, key: "profile" },
    { icon: <ArticleIcon />, path: `${base}/blogs`, key: "blogs" },
    { icon: <FeaturedPlayListIcon />, path: `${base}/my-blogs`, key: "my-blogs" },
    { icon: <CategoryIcon />, path: `${base}/addcategory`, key: "addcategory" },
    { icon: <CreateIcon />, path: `${base}/addblog`, key: "addblog" },
      { icon: <CommentIcon />, path: `${base}/comments`, key: "comments" },
     ...(user?.role === "admin"?
      [
        {
             icon: <AdminPanelSettingsIcon />,
          path: `${base}/manage-users`,
          key: "manage-users",
        },
      ]
    :[]),
  ];

  // const drawerWidth = isTablet ? 130 : 260;
  const drawerWidth = isCompact ? 0 : 260;


  const [profile, setProfile] = useState(localStorage.getItem("profile"));

useEffect(() => {
  const storedProfile = localStorage.getItem("profile");
  if (storedProfile) {
    setProfile(storedProfile);
  }
}, [location.pathname]); 




  return (
    <>
    <Header />
    <Box sx={{ display: "flex" }}>
     
      {/* Hide sidebar if on AddBlog page and on mobile */}
      {!(isCompact && isCompactPage) && (


<Drawer
  variant="permanent"
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      backgroundColor: "#08325B",
      color: "white",
      padding: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
    
      position: "fixed", 
      top: "60px", 
      left: 0,
      height: "calc(100vh - 60px)",
      overflowY: "auto",
      "&::-webkit-scrollbar": { display: "none" },
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    },
  }}
>

       
          {isUserLogin ? (
            <Box
              sx={{
                textAlign: "center",
                width: "100%",
                mt: isCompact ? "42px" : "0px",
                mb: 4,
              }}
            >
              <Avatar
                src={
                  profile
                    ? `${BASE_URL}/upload/${profile}`
                    : "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg"
                }
                sx={{ width: 90, height: 90, mx: "auto", mb: 1 }}
              />
              <Typography variant="h6">{username}</Typography>
              <Typography
                variant="body2"
                color="gray"
                sx={{
                  fontSize: isCompact ? "10px" : "14px",
                }}
              >
                {email}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" color="gray" sx={{ textAlign: "center" }}>
              Please log in to access the admin panel.
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <Button
              component={Link}
              to="/home"
              fullWidth
              variant={selectedTab === "home" ? "contained" : "outlined"}
              onClick={() => setSelectedTab("home")}
              sx={{
                mb: 2,
                p: 1,
                borderRadius: "22px",
                backgroundColor: "#35c0ca",
                color: "white",
                "&:hover": { backgroundColor: "#3ca8ad" },
              }}
            >
              Home
            </Button>

            <Button
              component={Link}
              to={`${base}/profile`}
              fullWidth
              variant={selectedTab === "profile" ? "contained" : "outlined"}
              onClick={() => setSelectedTab("profile")}
              sx={{
                backgroundColor: "#1976D2",
                color: "white",
                "&:hover": { backgroundColor: "#1565C0" },
              }}
            >
              Profile
            </Button>

            <Button
              component={Link}
              to={`${base}/blogs`}
              fullWidth
              variant={selectedTab === "blogs" ? "contained" : "outlined"}
              onClick={() => setSelectedTab("blogs")}
              sx={{
                backgroundColor: "#388E3C",
                color: "white",
                "&:hover": { backgroundColor: "#2E7D32" },
              }}
            >
              Blogs
            </Button>

            <Button
              component={Link}
              to={`${base}/my-blogs`}
              fullWidth
              variant={selectedTab === "my-blogs" ? "contained" : "outlined"}
              onClick={() => setSelectedTab("my-blogs")}
              sx={{
                backgroundColor: "#F57C00",
                color: "white",
                "&:hover": { backgroundColor: "#E65100" },
              }}
            >
              My Blogs
            </Button>

            <Button
              component={Link}
              to={`${base}/addcategory`}
              fullWidth
              variant={selectedTab === "addcategory" ? "contained" : "outlined"}
              onClick={() => setSelectedTab("addcategory")}
              sx={{
                backgroundColor: "#b0b00e",
                color: "white",
                "&:hover": { backgroundColor: "#66660b" },
              }}
            >
              Add Category
            </Button>

             <Button
                component={Link}
                to={`${base}/comment`}
                fullWidth
                variant={selectedTab === "addblog" ? "contained" : "outlined"}
                onClick={() => setSelectedTab("comment")}
                sx={{
                  backgroundColor: "#f08080",
                  color: "white",
                  "&:hover": { backgroundColor: "#814141" },
                }}
              >
              Comments
              </Button>

            <Button
              component={Link}
              to={`${base}/addblog`}
              fullWidth
              variant={selectedTab === "addblog" ? "contained" : "outlined"}
              onClick={() => setSelectedTab("addblog")}
              sx={{
                backgroundColor: "#D32F2F",
                color: "white",
                "&:hover": { backgroundColor: "#C62828" },
              }}
            >
              Create Blog
            </Button>

             {/* admin manages blogs */}
              {user?.role === 'admin' && (
                <Button
                component={Link}
                to={`${base}/manage-users`}
                fullWidth
                variant={selectedTab==="manage"?"contained":"outlined"}
                onClick={()=>setSelectedTab("manage")}
                sx={{
                  backgroundColor:"#00796B",
                  color:"white",
                  "&:hover":{backgroundColor:"#004D40"},
                }}
                >
                  Manage Users
                </Button>
              )} 
              {/* admin manages blogs */}

            
           </Box>
        </Drawer>
      )}
    <Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 3,
    width: "100%",
    paddingLeft: isCompact || isCompactPage ? 0 : `${drawerWidth}px`,
    marginTop: "64px",
  }}
>

        
       
        {(isCompact && isCompactPage) && (

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      overflowX: "auto",
      whiteSpace: "nowrap",
      gap: 1,
      px: 1,
      backgroundColor: "#08325B",
      mb: 2,

   
      "&::-webkit-scrollbar": {
        display: "none",
      },
      scrollbarWidth: "none", 
      msOverflowStyle: "none",
    }}
  >
    {iconNavItems.map((item) => (
      <IconButton
        key={item.key}
        component={Link}
        to={item.path}
        onClick={() => setSelectedTab(item.key)}
        sx={{
          color: selectedTab === item.key ? "#35c0ca" : "white",
          flex: "0 0 auto", 
        }}
      >
        {item.icon}
      </IconButton>
    ))}
  </Box>
)}


      {location.pathname.includes("profile") && (
  <>
  <Box sx={{marginLeft:"16px"}}>
    <Typography variant="h4" color="#08325b" sx={{ textAlign: "center" ,textTransform: "capitalize",backgroundColor:"#1976D2" ,padding:"9px",color:"white",wordSpacing:"8px",letterSpacing:"2px"}}>
      Welcome to  <strong style={{  background: "white", color: "blue",padding: "9px"}}>{user?.role}</strong> Panel
    </Typography></Box>
    <Typography
      color="#08325b"
      sx={{ textAlign: "center", fontSize: "12px" }}
    >
      Select an option from the sidebar.
    </Typography>
  </>
)}

     

        <Outlet />
      </Box>
    </Box>
    </>
  );
};

export default AdminLayouts;
