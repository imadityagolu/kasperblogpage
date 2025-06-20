// POST: Submit a comment to a blog
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Blog = require("../models/blogModel");

// GET: View all comments for blogs created by logged-in user
// exports.getAllCommentController = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) return res.status(404).send("User not found");

//     const blogs = await Blog.find({ user: user._id }).populate("user");
//     const comments = await Comment.find({
//       blog: { $in: blogs.map((blog) => blog._id) },
//       approved: true,
//     }) //Comment documents where the blog field is in the array of blog IDs, all comments that are on any of these blogs
//       .populate("blog")
//       .populate("user");

//     //Send data to frontend as JSON
//     res.status(200).json({ user, blogs, comments });
//   } catch (error) {
//     console.log("Error fetching comments", error);
//     res.status(500).json({ error: "comment not found" });
//   }
// };

//get all comments
exports.getAllCommentController = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("blog", 'title createdAt')     
      .populate("user", "username email")       
      .lean()
        .sort({ createdAt: -1 });  
        
        const filtered = comments.filter(comment => comment.blog != null);

    res.status(200).json({ success: true, comments : filtered });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Server error" });
  }
};



// Everyone to See All Approved Comments:(for all blogs)
exports.getAllApprovedCommentController = async(req,res) => {
    try{
        const comments = await Comment.find({status: 'approved' })
        .populate("blog" , "title slug")
        .populate("user" , "username");
       
        res.status(200).json({success:true,comments});
    }catch(error){
        console.error("error fetching comments" , error);
        res.status(500).json({error:"server error"});
    }

    }

// GET: View all approved comments for a specific blog
exports.getBlogCommentController = async (req, res) => {
  const {id: blogId} = req.params; 
   const userId = req.user?.id;
  const guestEmail = req.query.guestEmail;
  

  try {
    const comments = await Comment.find({ blog: blogId, status: 'approved'
})
   .select('-approved') 
  .populate("user", "username")
  .populate("blog", "title slug")
  .populate("replies");

   const detailedComments = comments.map(comment => {
      const plainComment = comment.toObject();
      const liked = comment.likes?.some(like =>
        userId ? like.user?.toString() === userId : like.guestEmail === guestEmail
      );
      const disliked = comment.dislikes?.some(dislike =>
        userId ? dislike.user?.toString() === userId : dislike.guestEmail === guestEmail
      );

       return {
        ...plainComment,
        likedByCurrentUser: liked || false,
        dislikedByCurrentUser: disliked || false
      };
    });
  
    res.status(200).json({ success: true, comments:detailedComments });
  } catch (error) {
    console.error("Error fetching comments for blog", error);
    res.status(500).json({ error: "Server error" });
  }
};


//GET Controller – Show the Edit Form

exports.getEditComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId)
      .populate("user")
      .populate("blog");
    if (!comment) {
      return res.status(404).json({ error: "comment not found" });
    }

    res.json({ comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};
//POST/PUT Controller – Handle the Form Submission
exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content, status: 'pending' }, // Set status to approved
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ error: "update failed" });
    }

    // Send updated comment and blog ID (frontend can redirect)
    res.status(200).json({
      message: "comment updated successfully",
      comment,
      blogId: comment.blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"server error"});
  }
};

//Allow for either guest or user:create comment
exports.commentToBlogController = async (req, res) => {
  console.log("Incoming comment payload:", req.body);

    try {
      const { content, name, email } = req.body;
      const blogId = req.params.id;
  
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      const commentData = {
        blog: blogId,
        content,
       status: 'pending' 
      };
      if(req.user){
        commentData.user = req.user.id; // from auth middleware if logged in
      } else {
        if (!name || !email){
        return res.status(400).json({error:"Name and email are required for guest"})
        }
        commentData.guest = {name,email};
    }
    const newComment = new Comment(commentData);
    await newComment.save();

    res.status(201).json({
        success:true,
        message:"Comment submitted, pending approval",
    })
} catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ error: "Server error" });
  }
};
      

// POST: Approve a comment
exports.approveCommentController = async (req, res) => {
  try {
    const { commentId } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId
      ).populate("blog");;
    if(!comment){
        return res.status(404).json({error:"Comment not found"});
    }
    const blogOwner = comment.blog.user.toString();
    if (blogOwner !== userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied: Not authorized" });
    }

      // if (comment.approved) {
         if (comment.status === 'approved') {
      return res.status(400).json({ error: "Comment is already approved" });
    }
    comment.status = 'approved';
    // comment.approved = true;

    await comment.save();
    
    res.status(200).json({
        success:true,
        message:"comment approved",
        comment,
    });
  
   
  } catch (error) {
    console.log("Error approving comment:", error);
    res.status(500).json({error:"server error"});
};
};


//POST: Disapprove a comment
exports.disapproveCommentController = async (req, res) => {
  try {
    const { commentId } = req.body;

    const comment = await Comment.findById(commentId).populate("blog");
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const blogOwner = comment.blog.user.toString();
    if (blogOwner !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied: Not authorized" });
    }

    if (comment.status === 'disapproved') {
      return res.status(400).json({ error: "Comment is already disapproved" });
    }

    comment.status = 'disapproved';
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment disapproved",
      comment,
    });

  } catch (error) {
    console.log("Error disapproving comment:", error);
    res.status(500).json({ error: "Server error" });
  }
};


//by user
exports.deleteCommentController = async (req, res) => {
  try {
    const userId = req.user.id; //user from middleware
    const commentId = req.params.id;
     
    //get the comment
    const comment = await Comment.findById(commentId);
    if(!comment){
      return res.status(404).json({error:"comment not found"});
    }

      // 2. Get the blog from the comment
    const blog = await Blog.findById(comment.blog);
    if(!blog){
      return res.status(404).json({error:"Blog not found"});
    }

    // 3. Only the blog owner can delete the comment
    // Admin check
    if (blog.user.toString()!==userId && req.user.role !== "admin" ) {
      return res.status(403).json({ error: "Access denied: You must be the blog owner or an admin" });
    }

    // Try to delete the comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Error deleting comment:", error);
    res.status(500).json({ error: "server error" });
  }
};

//reply to Comment
 
exports.addReplyToComment = async(req,res)=> {
  try{
    const commentId = req.params.id;
    const { content , name , email } =req.body;
 // Ensure content is provided
    if(!content){
      return res.status(400).json({error:"please comment"});
    }
    // Create the reply object
    const reply = {
      content,
      approved:false,
      date: new Date(),
    };
     // Check if the user is authenticated (logged in)
    if (req.user){
           // If user is authenticated, attach their user ID
        reply.user = req.user.id;
    }else{
       // If user is not authenticated (i.e., guest), check for name and email
      if (!name || !email){
        return res.status(400).json({error:"Guest name and email required"});
      }
      reply.guest = {name , email};
    }
      // Update the comment by adding the new reply

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $push: { replies: reply } },
      { new: true } // return the updated document
    ).populate("replies.user", "username email");
    // await Comment.findByIdAndUpdate(
    //   commentId,
    //   { $push :{replies:reply}}
    // );
    // const updatedComment = await Comment.findById
    // (commentId).populate("replies.user", "username email");
     // Check if the comment was found and updated
    if(!updatedComment){
      return res.status(404).json({error:"Comment not found"});

    }
    res.status(201).json({success:true,message:"Reply added and pending approval",
      updatedComment
    })
  }
   catch (error){
    console.error("Error adding reply" , error);
    res.status(500).json({error:"server error"});
  }
};


//delete comment
exports.deleteReplyFromComment = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;
    const userId = req.user?.id || req.user?._id;
    if(!userId){
  return res.status(401).json({message:"unauthorized to delete the comment"});
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const reply = comment.replies.id(replyId);
    if (!reply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    if(reply.user.toString() !== req.user._id.toString()){
      return res.status(403).json({message:"unauthorized to delete the reply"});
    }

    // Permission check: user is reply owner OR is admin
    const isOwner = reply.user?.toString() === userId;
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Access denied" });
    }
    comment.replies.pull(replyId);
    //reply.remove(); // Remove reply from replies array
    await comment.save();

    res.status(200).json({ success: true, message: "Reply deleted successfully" });
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).json({ error: "Server error" });
  }
};


//liketoggle
exports.toggleCommentLike = async(req,res)=>{
//   console.log("Full request body:", req.body);
// console.log("Raw headers:", req.headers);
// console.log("Decoded req.user:", req.user);

  const commentId = req.params.id;
  const userId = req.user?.id;
 const guestEmail = !userId ? req.body.guestEmail?.trim().toLowerCase() : null;

//  console.log("Received guestEmail:", req.body.guestEmail);
//   console.log("Received userId:", userId);
//   console.log("req.user:", req.user);
// console.log("req.body.guestEmail:", req.body.guestEmail);


if(!userId && !guestEmail) {
  return res.status(400).json({error:"user or guest email is required"});
}

if (userId && guestEmail) {
  return res.status(400).json({ error: "Cannot be both guest and user" });
}


try{
  const comment = await Comment.findById(commentId);
  if  (!comment) return res.status(404).json({error:"comment not found"});
  
  
  
  //check if user/guest already liked
  const alreadyLikedIndex = comment.likes.findIndex((like) => userId ? like.user?.toString() === userId : like.guestEmail === guestEmail
);

let likedByCurrentUser = false;

if(alreadyLikedIndex > -1) {
  //unlike
  comment.likes.splice(alreadyLikedIndex ,1);
  likedByCurrentUser = false;
} else {
  //like
  comment.likes.push(userId ? {user: userId} : {guestEmail});
  likedByCurrentUser = true;
  
  // Remove opposite (dislike) if it exists
  const dislikeIndex = comment.dislikes.findIndex(dislike =>
    userId ? dislike.user?.toString() === userId : dislike.guestEmail === guestEmail
  );
  if (dislikeIndex > -1) {
    comment.dislikes.splice(dislikeIndex, 1);
  }
}

 // Clean up invalid entries
    comment.likes = comment.likes
      .map((like) => {
        if (like.user) return { user: like.user };
        if (like.guestEmail) return { guestEmail: like.guestEmail };
        return null;
      })
      .filter(Boolean);

await comment.save();

const dislikedByCurrentUser = comment.dislikes.some(d =>
  userId ? d.user?.toString() === userId : d.guestEmail === guestEmail
);
console.log('Comment likes before return:', comment.likes);
      res.status(200).json({
  success: true,
    likes: comment.likes.map((like) => ({
    user: like.user?.toString() || null,
    guestEmail: like.guestEmail || null,
  })),
      status: { likedByCurrentUser, dislikedByCurrentUser },
    });

    } catch(error) {
      console.log("like error", error);
      res.status(500).json({error :"server error"});
    }

};

//dislike toggle
exports.toggleCommentDislike = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user?.id;
  const guestEmail = req.body.guestEmail;

  if (!userId && !guestEmail) {
    return res.status(400).json({ error: "user or guest email is required" });
  }

  if (userId && guestEmail) {
  return res.status(400).json({ error: "Cannot be both guest and user" });
}

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: "comment not found" });

    

    // Check if user/guest already disliked
    const alreadyDislikedIndex = comment.dislikes.findIndex(dislike =>
      userId ? dislike.user?.toString() === userId : dislike.guestEmail === guestEmail
    );
        let dislikedByCurrentUser = false;

    if (alreadyDislikedIndex > -1) {
      // Remove dislike (toggle off)
      comment.dislikes.splice(alreadyDislikedIndex, 1);
        dislikedByCurrentUser = false;
    } else {
      // Add dislike
      comment.dislikes.push(userId ? { user: userId } : { guestEmail });
       dislikedByCurrentUser = true;

       // Remove like if exists (optional, usually like and dislike are mutually exclusive)
    const likeIndex = comment.likes.findIndex(like =>
      userId ? like.user?.toString() === userId : like.guestEmail === guestEmail
    );
    if (likeIndex > -1) {
      comment.likes.splice(likeIndex, 1);
    }
    }
   console.log('Saving like for guest:', guestEmail);

    await comment.save();

      const likedByCurrentUser = comment.likes.some(l =>
      userId ? l.user?.toString() === userId : l.guestEmail === guestEmail
    );
    res.status(200).json({ success: true, dislikes: comment.dislikes ,   status: { likedByCurrentUser, dislikedByCurrentUser },
       });
  } catch (error) {
    console.log("dislike error", error);
    res.status(500).json({ error: "server error" });
  }
};



//toggle-replylike
exports.toggleReplyLike = async (req,res) => {
  try {
   const { commentId, replyId } = req.params;
   const guestEmail = req.body.guestEmail?.toLowerCase();
    const user = req.user;

    //fetch the comment
    const comment = await Comment.findById(commentId);
    if(!comment) return res.status(404).json({error: "comment not found"});

    if (user && guestEmail) {
  return res.status(400).json({ error: "Cannot be both guest and user" });
}


    //find the reply inside comment
    const reply = comment.replies.id(replyId);
    if(!reply) return res.status(404).json({error:"Reply not found"});


    //determine if the user or guest has already liked the reply
    let existingLikeIndex = -1;

    if(user){
      existingLikeIndex = reply.likes.findIndex(
        (like) => like.user?.toString() === user._id.toString()
      );

    } else if (guestEmail) {
      existingLikeIndex =  reply.likes.findIndex(
        (like) => like.guestEmail === guestEmail
      );
    } else {
      return res.status(400).json({error:"Guest email or user auth required"})
    }

    //Toggle like
    if(existingLikeIndex !== -1){
      // already liked- remove like(unlike)
      reply.likes.splice(existingLikeIndex,1)
      

      } else{
        //not likied yet- add like
        const newLike = user ? {user: user._id} :{ guestEmail};
        reply.likes.push(newLike);
      }
      await comment.save();

       const likedByCurrentUser = reply.likes.some(like =>
      user ? like.user?.toString() === user._id.toString() : like.guestEmail === guestEmail
    );

     const dislikedByCurrentUser = reply.dislikes.some(dislike =>
      user ? dislike.user?.toString() === user._id.toString() : dislike.guestEmail === guestEmail
    );

    
 return res.status(200).json({
  success:true,
 message:existingLikeIndex !== -1? 
 "reply unliked":"reply liked",
 likes:reply.likes,
      status: { likedByCurrentUser, dislikedByCurrentUser },
 });

 }catch (error) {
  console.error("Error toggling reply like:", error);
  res.status(500).json({ error: "Server error" });
  }
} 

//replydislike
exports.toggleReplyDislike = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;
    const guestEmail = req.body.guestEmail?.toLowerCase();
    const user = req.user;

    if (!user && !guestEmail) {
      return res.status(400).json({ error: "Guest email or user auth required" });
    }

    if (user && guestEmail) {
      return res.status(400).json({ error: "Cannot be both guest and user" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const reply = comment.replies.id(replyId);
    if (!reply) return res.status(404).json({ error: "Reply not found" });

    // Optional: Remove like if it's mutually exclusive
    const likeIndex = reply.likes.findIndex((like) =>
      user ? like.user?.toString() === user._id.toString() : like.guestEmail === guestEmail
    );
    if (likeIndex > -1) {
      reply.likes.splice(likeIndex, 1);
    }

    // Check for existing dislike
    let existingDislikeIndex = -1;
    if (user) {
      existingDislikeIndex = reply.dislikes.findIndex(
        (dislike) => dislike.user?.toString() === user._id.toString()
      );
    } else {
      existingDislikeIndex = reply.dislikes.findIndex(
        (dislike) => dislike.guestEmail === guestEmail
      );
    }

    let message = "";
    if (existingDislikeIndex !== -1) {
      reply.dislikes.splice(existingDislikeIndex, 1);
      message = "Reply undisliked";
    } else {
      const newDislike = user ? { user: user._id } : { guestEmail };
      reply.dislikes.push(newDislike);
      message = "Reply disliked";
    }

    await comment.save();

    const dislikedByCurrentUser = reply.dislikes.some(dislike =>
      user ? dislike.user?.toString() === user._id.toString() : dislike.guestEmail === guestEmail
    );

    return res.status(200).json({
      success: true,
      message,
      dislikes: reply.dislikes,
        status: { likedByCurrentUser, dislikedByCurrentUser },
    });
  } catch (error) {
    console.error("Error toggling reply dislike:", error);
    res.status(500).json({ error: "Server error" });
  }
};
