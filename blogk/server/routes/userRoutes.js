const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  updateProfileController,
  getProfileController,
} = require("../controllers/userController");
const { updateUserRole } = require("../controllers/adminController");

const upload = require("../middlewares/multer");
const checkIsUserAuthenticated = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/roleMiddleware");
const { deleteUser } = require("../controllers/adminController");

//router object
const router = express.Router(); //call router from express only we get

//create all routes

//get all users || GET
router.get("/all-users", getAllUsers);

//create user || POST
router.post("/register", upload.single("profile"), registerController);

//Login || POST
router.post("/login", loginController);

//update||put
router.put(
  "/update-profile/:id",
  upload.single("profile"),
  updateProfileController
);

//Get specific users|| GET
router.get("/get-profile/:id", getProfileController);

// DELETE user by ID (admin only)
router.delete("/users/:id", checkIsUserAuthenticated, admin, deleteUser);

//role change
router.put("/role/:id", checkIsUserAuthenticated, admin, updateUserRole);


module.exports = router;
