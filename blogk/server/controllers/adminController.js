const mongoose= require('mongoose');
const blogModel = require('../models/blogModel');
const User = require('../models/userModel'); 


// PUT /admin/blog/:id/approve
exports.approvedBlog=async(req,res) =>{
    try{

           console.log("Approve route hit with ID:", req.params.id); 
        const blog = await blogModel.findByIdAndUpdate(
            req.params.id,
            {isApproved:true, disapproved: false},
            {new:true} // return the updated document

        );
        if(!blog)return res.status(404).json({message:"Blog not found"});
        res.json({message: "Blog approved successfully",blog});
    } catch(err){
        console.error("Error approving blog:", err);
        res.status(500).json({error:"server error"});
    }
}

// PUT /admin/blog/:id/disapprove

exports.disapprovedBlog = async(req,res) => {
    try {
        const blog = await blogModel.findByIdAndUpdate(
            req.params.id,
            {isApproved: false, disapproved: true},
               { new: true }
        );
           if (!blog) return res.status(404).json({ message: "Blog not found" });
     res.json({ message: "Blog disapproved successfully", blog });
        
    } catch (error) {
        console.error("Disapprove Error:", err);
    res.status(500).json({ error: "Server error" });
    }
}

//detele users
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
       console.error("Error in deleteUser:", error); // Log the real issue
    res.status(500).json({ message: "Error deleting user", error });
  }
};

//rolechange
exports.updateUserRole = async (req, res) => {
  try {
    const requester = req.user; // logged-in user from auth middleware
    const userId = req.params.id.trim();;
    const { role } = req.body;

    // Only allow 'admin' or 'user' roles
    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role value" });
    }

    // Get the user to update
    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only admins can change roles
    if (requester.role !== "admin") {
      return res.status(403).json({ message: "Only admins can change roles" });
    }

    // Admin cannot change own role
    if (requester._id.toString() === userId) {
      return res.status(403).json({ message: "You cannot change your own role" });
    }

    //Admin can only promote user to admin
    if (role === "admin" && userToUpdate.role === "user") {
      userToUpdate.role = "admin";
      await userToUpdate.save();
      return res.status(200).json({ message: "User promoted to admin successfully", user: userToUpdate });
    }

    // Admin cannot demote any admin back to user
    if (userToUpdate.role === "admin" && role === "user") {
      return res.status(403).json({ message: "Admins cannot be demoted to user" });
    }

    // If role unchanged or invalid attempt, return error
    return res.status(400).json({ message: "Invalid role change request" });

  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error" });
  }
};
