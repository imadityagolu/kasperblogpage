const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogsByIdController,
  deleteBlogController,
  userBlogController,
  getBlogsByCategory,
} = require("../controllers/blogController");
const checkIsUserAuthenticated = require("../middlewares/authMiddleware");
const { commenttoblogcontroller } = require("../controllers/commentController");

const upload = require("../middlewares/multer");
const multerErrorHandler = require("../middlewares/multerErrorHandler");
const { adminUpdateBlogDetailsController } = require("../controllers/blogController");

//router object,protected route
const router = express.Router();

//define all routes,protected routes
//GET || all blogs
router.get("/all-blog", checkIsUserAuthenticated,getAllBlogsController);

//POST || CREATE BLOG
router.post(
  "/create-blog",
  checkIsUserAuthenticated,
  upload.array("thumbnail", 5),
    multerErrorHandler,
  createBlogController
);

//PUT || update blog
router.put("/update-blog/:slugOrId", checkIsUserAuthenticated, updateBlogController);

//GET || SINGLE blog details
router.get("/get-blog/:slugOrId", getBlogsByIdController);

//DELETE || DELETE BLOG
router.delete(
  "/delete-blog/:id",
  checkIsUserAuthenticated,
  deleteBlogController
);

//GET || USER BLOG(SINGLE BLOG)
router.get("/user-blog/:id", userBlogController);

//get blogs by category
router.get("/category/:slug", getBlogsByCategory);

// router.put("/blog-details/:slugOrId",updateBlogController);


router.put(
  "/blog-details/:id",
  checkIsUserAuthenticated,
  upload.array("thumbnail", 5), // support up to 5 thumbnail uploads
  multerErrorHandler,
  adminUpdateBlogDetailsController
);



module.exports = router;
