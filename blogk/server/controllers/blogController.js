const mongoose= require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');
const slugify = require("slugify");
const categoryModel = require("../models/categoryModel");

const Comment = require('../models/commentModel');

const path = require('path');
const downloadImageFromUrl = require("../utils/fileUrl");
//GET ALL BLOGS
// Fetch only approved blogs for normal users
// Fetch all blogs (including unapproved) for admin
exports.getAllBlogsController = async (req, res) => {
  try {
    let blogs;
    //console.log("Decoded User from Token:", req.user);
    //console.log('User ID:', req.user?._id);
    //console.log('User Role:', req.user?.role);
    
    
    const user = req.user;
    const userId = user?._id;
    const isAdmin = user?.role === 'admin';
  

    //console.log('Is Admin:', isAdmin);
    //console.log('User ID:', userId);
  
      if (isAdmin) {
        //console.log('Fetching blogs for admin...');
        blogs = await blogModel.find().populate('user', 'username email profile role')
        .populate("category", "title")
        .sort({ createdAt: -1 });
      }else if (userId) {
        console.log('Fetching blogs for authenticated user...');
            // Authenticated user sees approved blogs and their own unapproved blogs
            blogs = await blogModel
              .find({
                $or: [
                  { isApproved: true },
                  { user: userId } // includes their unapproved blogs too
                ],
              })
              .populate("user", "username email role")
              .populate("category", "title")
              .sort({ createdAt: -1 });
            
      } else {
        //console.log('Fetching blogs for public user...');
            // Public sees only approved blogs
        blogs = await blogModel.find({ isApproved: true }).populate('user', 'username email role')
        .populate("category", "title")
        .sort({ createdAt: -1 });
        //console.log(`Blogs Retrieved (${isAdmin ? "Admin" : userId ? "Authenticated User" : "Public"}):`, blogs);
 
      }

      // Log the number of blogs retrieved
    //console.log("Blogs Retrieved: ", blogs);
    //console.log("Blogs Count: ", blogs.length);
  
      if (!blogs || blogs.length === 0) {
        return res.status(404).send({
          success: false,
          message: "No blogs found",
        });
      }

       // Log success message and return the list of blogs
    //console.log("Blogs fetched successfully");
     return res.status(200).send({
        success: true,
        BlogCount: blogs.length,
        message: "Blog list fetched successfully",
        blogs,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Error while getting blogs",
        error,
      });
    }
  };
  

//create Blog
exports.createBlogController=async(req,res)=>{
    //console.log(req.files); 
    try{
        const {title,description,category, image }=req.body;
        //console.log("Received Title:", title); 
        //validation
        if(!title || !description  || !category ){
            return res.status(400).send({
                success:false,
                message:"please provide all fields",
            });
        }
        const existingUser= await userModel.findById(req.user._id)
        //validation
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:'unable to find user'
            })
        }
         // Prepare thumbnails
        const thumbnail=req.files?req.files.map(file=>`/upload/${file.filename}`):[];


           // Handle image URL (if no files uploaded)
if (image && (!req.files  ||  !req.files.length)) {
       const  imageUrl = image;
      const uploadFolder = path.join(__dirname, "../public/upload");

    try {
       const { filename } = await downloadImageFromUrl(imageUrl, uploadFolder);
        thumbnail.push(`/upload/${filename}`);
    } catch (err) {
        console.error("Failed to download image from URL:", err.message);
        return res.status(400).send({
            success: false,
            message: "Image URL could not be downloaded",
        });
    }
}
       
       // Generate unique slug
    const baseSlug = slugify(title, { lower: true, strict: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await blogModel.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }
     // Create blog
       const newBlog= new blogModel({
        title,
        description,
        image,
        user:req.user._id,
        category,
        thumbnail,
        slug: uniqueSlug,
        createdByAdmin: req.user.role === 'admin',
        isApproved:req.user.role === "admin" ?true:false,
  
    });
       const session= await mongoose.startSession();
       session.startTransaction();
       try{
       await newBlog.save({session});
       existingUser.blogs.push(newBlog) 
       await existingUser.save({session});
       
       // Populate user before returning
await newBlog.populate("user", "username email profile");
     await session.commitTransaction();

       return res.status(201).send({
        success:true,
        message:"Blog created",
        newBlog,
       });
    } catch (error) {
        await session.abortTransaction(); 
  //console.error("Transaction failed:", error);
        console.log(error,"error.message")
         //console.error("Transaction failed:", error);
        throw error; 

    }finally{
        session.endSession(); 
    }
    } catch(error){
        console.log("Outer error:",error);
        return res.status(400).send({
            success:false,
            message:"Error while creating blog",
            error,
        });
    };
};

//update a blog
exports.updateBlogController = async(req,res)=>{
    try{
        const { slugOrId } = req.params
        const {title,description,image} = req.body

         // Use mongoose's built-in ObjectId check
         // // Determine if it's an ObjectId or slug
    const isObjectId = mongoose.Types.ObjectId.isValid(slugOrId);
    const filter = isObjectId ? { _id: slugOrId } : { slug: slugOrId };
        // Find the existing blog
        const existingBlog = await blogModel.findOne(
            filter);
        if (!existingBlog) {
            return res.status(404).json({
              success: false,
              message: "Blog not found with the given ID or slug",
            });
          }
             // Authorization check before update
          if (req.user.role !=='admin' &&  existingBlog.user.toString()!== req.user._id.toString()){
            return res.status(403).json({message:'Unauthorized to modify this blog' });
          }
           // Update the blog (preserving the original user)
           const updatedBlog = await blogModel.findOneAndUpdate(
           filter,
           {...req.body,
             user: existingBlog.user,
            }, // Preserve the original user
           {new:true}
           )
            .populate("user", "username");
        return res.status(200).send({
            success:true,
            message:"blog updated",
            blog:updatedBlog,
        });
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"error while updating blog",
            error,
        });
    }
};

//single blog
exports.getBlogsByIdController= async(req,res)=>{
    try{
        const{slugOrId}= req.params
        //console.log("SlugOrId from params:", req.params.slugOrId);
        //const blog = await blogModel.findById(id).populate('user','username');
        //Find blog by slug
    //const blog = await blogModel.findOne({slug}).populate("user", "username");
    // Check if slugOrId is a number or string, and decide if it's a slug or id
    //Check if it's a valid MongoDB ObjectId:
    const isValidObjectId = mongoose.Types.ObjectId.isValid(slugOrId);

const blog = isValidObjectId
//   const blog = isNaN(slugOrId) // If it's not a number, it's assumed to be a slug
  ? await blogModel.findById(slugOrId ).populate('user', 'username') // Fetch by slug
  : await blogModel.findOne({slug:slugOrId}).populate('user', 'username profile'); // Fetch by ID

//   if (!slugOrId) {
//     return res.status(400).send({
//       success: false,
//       message: "slugOrId is missing from URL",
//     });
//   }


        if(!blog){
            return res.status(404).send({//page not found
                success:false,
                message:'blog not found with this id or slug '
            })
        }

    // Restrict if blog is not approved
    const currentUser = req.user;
    const isOwner = currentUser && blog.user._id.toString() === currentUser._id.toString();
    const isAdmin = currentUser && currentUser.role === 'admin';

    if(!blog.isApproved && !isAdmin && !isOwner){
        return res.status(403).send({
            success: false,
            message: 'This blog is not approved yet',
          });
        }

        //Fetch only approved comments for this blog
        const comments= await Comment.find({blog: blog._id , approved: true})
        .populate('user','username')
        .sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message:"fetch single blog",
            blog,
            comments,
        });
            
    }catch (error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'error while getting single blog',
            error,
        })
    }
};

//Delete blog
exports.deleteBlogController=async(req,res)=>{
    try{
        const { id } = req.params;

    //const blog = await blogModel.findOne({ slug }).populate("user");
         
          const blog= await blogModel.findById(id).populate("user")
          if (!blog){
            return res.status(404).send({
                success:false,
                message:"Blog not found",
            });
          }

            //  Authorization check BEFORE deletion
            if(req.user.role!== 'admin' && blog.user._id.toString()!==req.user._id.toString()){
                return res.status(403).json({message:'Unauthorized to delete this blog' });
            }
       
        await blog.user.blogs.pull(blog._id);
        await blog.user.save();

       
         await blogModel.findByIdAndDelete(id)
        
        
        return res.status(200).send({
            success:true,
            message:"blog deleted"
        })
    } catch (error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"Error while deleting blog",
            error
        }) 
       }
};

//GET USER BLOG
exports.userBlogController = async(req,res)=>{
    try{
        const userBlog= await userModel.findById(req.params.id).populate({
            path: 'blogs', 
            populate: {
              path: 'user',  
              select: 'username role'
            }
          });
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:'blogs not found with this id'
            })
        }
        return res.status(200).send({
            success:true,
            message:"user blogs",
            userBlog,
        });
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'error in user blog',
            error
        })
    }};

   //getbycategory
    
//    exports.getBlogsByCategory = async (req, res) => {
//     try {
//       const slug = req.params.slug.trim().toLowerCase();
     
   

//       const category = await categoryModel.findOne({ slug }); 
//       console.log("Category Slug from params:", slug);

// if (!category) {
// return res.status(404).json({ success: false, message: "Category not found" });
// }
// const categoryId = category._id;

  
//       if (!categoryId) {
//         return res.status(400).json({
//           success: false,
//           message:  `Blogs under category "${category.title}"`,
//           blogs
//         });
//       }

      
  
//       const blogs = await blogModel
//         .find({ category: categoryId })
//         .populate("user", "username") 
//         .populate("category", "title") 
//         .sort({ createdAt: -1 }); 
  
//       if (!blogs || blogs.length === 0) {
//         return res.status(200).json({
//           success: true,
//           message: "No blogs found for this category",
//           blogs: [],
//         });
//       }
  
//       res.status(200).json({
//         success: true,
//         blogs,
//       });
//     } catch (error) {
//       console.error("Error fetching blogs by category:", error);
//       res.status(500).json({
//         success: false,
//         message: "Server Error",
//         error: error.message,
//       });
//     }
//   };

exports.getBlogsByCategory = async (req, res) => {
    try {
      const param = req.params.slug;
   
      let category = null;
        // Try finding by slug (convert both to lowercase for match)
    const allCategories = await categoryModel.find();
    category = allCategories.find(cat => cat.slug?.toLowerCase() === param.toLowerCase());
     // If not found by slug, try by ID if it's valid
    if (!category && mongoose.Types.ObjectId.isValid(param)) {
        category = await categoryModel.findById(param);
      }

       // 3. If still not found, try match by title (case-insensitive)
    if (!category) {
        category = allCategories.find(
          (cat) => cat.title && cat.title.toLowerCase() === param.toLowerCase()
        );
      }
 // If still not found, return error
 if (!category) {
    return res.status(404).json({ success: false, message: "Category not found" });

 }
     // Generate slug if missing and save
     if (!category.slug) {
        category.slug = slugify(category.title, { lower: true });
        await category.save();
      }
  
const categoryId = category._id;

  
      if (!categoryId) {
        return res.status(400).json({
          success: false,
          message: "Category ID is required",
        });
      }
  

      const currentUserId = req.user?._id?.toString();
      const isAdmin = req.user?.role === 'admin';
  
      let blogs;


       if (isAdmin) {
      blogs = await blogModel
        .find({ category: categoryId })
        .populate("user", "username")
        .populate("category", "title")
        .sort({ createdAt: -1 });
    } else if (currentUserId) {
      blogs = await blogModel
        .find({
          category: categoryId,
          $or: [
            { isApproved: true },
            { user: currentUserId }
          ]
        })
        .populate("user", "username")
        .populate("category", "title")
        .sort({ createdAt: -1 });
    } else {
      blogs = await blogModel
        .find({ category: categoryId, isApproved: true })
        .populate("user", "username")
        .populate("category", "title")
        .sort({ createdAt: -1 });
    }
  
      if (!blogs || blogs.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No blogs found for this category",
          blogs: [],
        });
      }
  
      res.status(200).json({
        success: true,
        blogs,
      });
    } catch (error) {
      console.error("Error fetching blogs by category:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  };
  
// Admin/Moderation: Update blog details by ID


exports.adminUpdateBlogDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID" });
    }

    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Only admin allowed
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const allowedFields = ['title', 'description', 'category', 'isApproved', 'disapproved', 'createdByAdmin', 'image'];
    const updates = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Handle new title and regenerate unique slug if changed
    if (updates.title && updates.title !== blog.title) {
      const baseSlug = slugify(updates.title, { lower: true, strict: true });
      let uniqueSlug = baseSlug;
      let counter = 1;
      while (await blogModel.findOne({ slug: uniqueSlug, _id: { $ne: id } })) {
        uniqueSlug = `${baseSlug}-${counter++}`;
      }
      updates.slug = uniqueSlug;
    }

    // Handle thumbnail updates via file upload
    let newThumbnails = [];
    if (req.files && req.files.length > 0) {
      newThumbnails = req.files.map(file => `/upload/${file.filename}`);
    }

    // Handle image URL download if provided (and no uploaded files)
    if (req.body.image && newThumbnails.length === 0) {
      const uploadFolder = path.join(__dirname, "../public/upload");
      try {
        const { filename } = await downloadImageFromUrl(req.body.image, uploadFolder);
        newThumbnails.push(`/upload/${filename}`);
      } catch (err) {
        console.error("Failed to download image from URL:", err.message);
        return res.status(400).send({
          success: false,
          message: "Image URL could not be downloaded",
        });
      }
    }

    if (newThumbnails.length > 0) {
      updates.thumbnail = newThumbnails;
    }

    // Final update
    const updatedBlog = await blogModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("user", "username");

    return res.status(200).json({
      success: true,
      message: "Blog details updated successfully",
      blog: updatedBlog,
    });

  } catch (error) {
    console.error("Error in admin blog update:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating blog details",
      error: error.message,
    });
  }
};


