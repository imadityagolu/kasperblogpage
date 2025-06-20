import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import  getUserIdFromToken  from '../../utils/commentHelpers';
import ShareButton from "../Blogs/ShareButton";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import Comment from './Comment';
import GuestLoginModal from './GuestLoginModal';

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [sortBy, setSortBy] = useState('oldest');
  const [formData, setFormData] = useState({ name: '', email: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState(null);
  const [replyingToId, setReplyingToId] = useState(null);
    const [showGuestForm, setShowGuestForm] = useState(false);
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '' });
  const [pendingLikeDislike, setPendingLikeDislike] = useState(null);
  const [replyForm, setReplyForm] = useState({ name: '', email: '', content: '' });
  const [visibleCount, setVisibleCount] = useState(3);

const token = localStorage.getItem("token");
const userIsAuthenticated = !!token;
    const userId = token ? getUserIdFromToken(token) : null;
  
// const userIsGuest = !userIsAuthenticated && !!formData.email;

  // Load guest info from localStorage on mount
useEffect(() => {
    const storedEmail = localStorage.getItem('guestEmail');
    const storedName = localStorage.getItem('guestName');
    if (storedEmail && storedName) {
      setGuestInfo({ name: storedName, email: storedEmail });
      setFormData((prev) => ({ ...prev, name: storedName, email: storedEmail }));
    }
  }, []);

  
  // Map replies recursively, setting liked/disliked flags and mapping _id to id
  const mapReplies = (replies, userId, guestEmail) =>
    replies.map((r) => ({
      ...r,
      id: r._id,
      liked: userId
        ? r.likes?.some((like) => like.user === userId)
        : guestEmail
        ? r.likes?.some((like) => like.guestEmail === guestEmail)
        : false,
      disliked: userId
        ? r.dislikes?.some((dislike) => dislike.user === userId)
        : guestEmail
        ? r.dislikes?.some((dislike) => dislike.guestEmail === guestEmail)
        : false,
      replies: r.replies ? mapReplies(r.replies, userId, guestEmail) : [],
    }));


// Map top-level comments similarly

const remapComments = (comments, userId, guestEmail) =>
   comments.map(c => ({
    ...c,
    id: c._id,
    liked: userId
      ? c.likes?.some(like => like.user === userId)
      : guestEmail
      ? c.likes?.some(like => like.guestEmail === guestEmail)
      : false,
    disliked: userId
      ? c.dislikes?.some(dislike => dislike.user === userId)
      : guestEmail
      ? c.dislikes?.some(dislike => dislike.guestEmail === guestEmail)
      : false,
    replies: c.replies ? mapReplies(c.replies, userId, guestEmail) : [],
  }));

  // Fetch comments on blogId, userId or guest email change
  useEffect(() => {
    if (!blogId) return;

    const fetchComments = async () => {
      try {
        const guestEmailLower = formData.email?.toLowerCase().trim();
        const headers = userIsAuthenticated ? { Authorization: `Bearer ${token}` } : {};
        const params = !userIsAuthenticated && guestEmailLower ? { guestEmail: guestEmailLower } : {};

        const res = await axios.get(`/api/v1/comment/blog/${blogId}/comments`, { headers, params });
        const remapped = remapComments(res.data.comments, userId, guestEmailLower);
        setComments(remapped);
      } catch (error) {
        toast.error('Error loading comments');
        // console.error(error);
      }
    };

    fetchComments();
  }, [blogId, userId, token, formData.email, userIsAuthenticated]);

   // Update a comment (or reply) by id, used after like/dislike or reply add
  const updateCommentById = (list, id, updater) => 
     list.map((comment) => {
      if (comment.id === id) return updater(comment);
      if (comment.replies.length > 0) {
        return { ...comment, replies: updateCommentById(comment.replies, id, updater) };
      }
      return comment;
    });

    // Add reply to a comment or nested reply
   const addReplyById = (list, id, reply) => {
    return list.map((comment) => {
      if (comment.id === id) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      if (comment.replies.length > 0) {
        return { ...comment, replies: addReplyById(comment.replies, id, reply) };
      }
      return comment;
    });
  };


  
  
// Guest form submit handler for login info
  const handleSubmitGuest = (e) => {
  e.preventDefault();
  if (guestInfo.name && guestInfo.email) {
    setShowGuestForm(false);


    // Sync all relevant form states
    setFormData((prev) => ({
      ...prev,
      name: guestInfo.name,
      email: guestInfo.email,
    }));

    setReplyForm((prev) => ({
      ...prev,
      name: guestInfo.name,
      email: guestInfo.email,
    }));
    // setFormData({ ...guestInfo });
    localStorage.setItem('guestEmail', guestInfo.email);
    localStorage.setItem('guestName', guestInfo.name);
 // Retry the pending like/dislike
    if (pendingLikeDislike) {
      const { type, id } = pendingLikeDislike;
      if (type === 'like') onToggleLike(id);
      if (type === 'dislike') onToggleDislike(id);
      setPendingLikeDislike(null);
    }
  }
};

// Handle form input changes and store guest info locally
const handleChange = (e) => {
  const { name, value } = e.target;
   const trimmed = value.trim();
  setFormData({ ...formData, [name]: value });

  if (name === 'name') {
  localStorage.setItem('guestName', trimmed);
}

  if (name === 'email') {
    // setGuestEmail(value.trim()); 
     localStorage.setItem('guestEmail', trimmed);
  }
};

 // Like toggling handler
 const onToggleLike = async (id) => {
  const emailFromStorage = localStorage.getItem('guestEmail')?.trim();
const emailFromForm = formData.email?.trim();
// console.log("Is user authenticated:", userIsAuthenticated);

// console.log("emailFromStorage:", emailFromStorage);
// console.log("emailFromForm:", emailFromForm);

const currentGuestEmail = emailFromStorage || emailFromForm;
// console.log("Using guest email:", currentGuestEmail);

if (!userIsAuthenticated && !currentGuestEmail) {
  toast.error('Login by email required to like or dislike comments.');
  setPendingLikeDislike({ type: 'like', id }); 
  setShowGuestForm(true);
  return;
}

// console.log("emailFromStorage:", emailFromStorage);
// console.log("emailFromForm:", emailFromForm);
// console.log("Using guest email:", currentGuestEmail);

const headers = {
  'Content-Type': 'application/json',
  ...(userIsAuthenticated ? { Authorization: `Bearer ${token}` } : {}),
};

  
    // console.log("Clicked like for comment:", id);
  // console.log("FormData email:", formData.email);
  // console.log("Guest email from localStorage:", localStorage.getItem('guestEmail'));
  // console.log("Guest email being sent:", currentGuestEmail); 

  const body = userIsAuthenticated ? {} : { guestEmail: currentGuestEmail };
  // const headers = {
  //   ...(userIsAuthenticated && token
  //     ? { Authorization: `Bearer ${token}` }
  //     : {}),
  //   'Content-Type': 'application/json', 
  // };

// console.log("Sending body:", JSON.stringify(userIsAuthenticated ? {} : { guestEmail: currentGuestEmail }));
// console.log("Final body being sent to like endpoint:", JSON.stringify(body));

  // const body = userIsAuthenticated ? {} : { guestEmail: currentGuestEmail };
  // const headers = {};
  // if (userIsAuthenticated && token) {
  //   headers.Authorization = `Bearer ${token}`;
  // }
  
  
   try {
       const { data } = await axios.post(`/api/v1/comment/${id}/like`, 
body, { headers }
);
    // console.log("Like response data:", data);
    // console.log("Guest email sending like:", formData.email);
    // console.log("Sending POST body:", body);
// console.log("Sending headers:", headers);

    
   if (data?.success) {
      // const currentUserId = token ? getUserIdFromToken(token) : null;
    
    //  console.log("Current guest email:", currentGuestEmail);
      // console.log('Current user ID:', currentUserId);
    // console.log("FormData email before update:", formData.email);
// console.log("localStorage guestEmail before update:", localStorage.getItem('guestEmail'));

    const guestEmailNormalized = currentGuestEmail?.toLowerCase().trim() || '';
      setComments((prev) =>
  updateCommentById(prev, id, (c) => {
    // console.log('Updating comment:', c.id);
    // console.log('Likes from API:', data.likes);
  
      //  const likedFlag = currentUserId
           const likedFlag = userId
            ? data.likes.some((like) => like.user === userId)
            // ? data.likes.some((like) => like.user === currentUserId)
            : data.likes.some((like) =>
                (like.guestEmail?.toLowerCase().trim() || '') === guestEmailNormalized
              );


// console.log("All guest likes from API:", data.likes.map(like => like.guestEmail));

          // console.log("Liked flag:", likedFlag);

          data.likes.forEach((like) => {
  // console.log('API like email:', `"${like.guestEmail}"`);
});

  // console.log('Normalized currentGuestEmail:', `"${guestEmailNormalized}"`);


        return {
      ...c,
      likes: data.likes,
      liked: likedFlag,
      // liked: currentUserId
      //   ? data.likes.some((like) => like.user === currentUserId)
      //   : currentGuestEmail
      //   ? data.likes.some((like) => like.guestEmail?.toLowerCase().trim() === currentGuestEmail.toLowerCase().trim())
      //   : false,
      disliked: false, // Unset dislike on like
    };
  })
);
   }
    } catch (error){
      toast.error('Failed to like comment.');
        // console.error('Like error:', error.response?.data || error.message);
      
    }
  };

  // Dislike toggling handler
  const onToggleDislike = async (id) => {
    const emailFromStorage = localStorage.getItem('guestEmail')?.trim();
const emailFromForm = formData.email?.trim();
  const currentGuestEmail = emailFromStorage || emailFromForm;
  if (!userIsAuthenticated && !currentGuestEmail) {
  toast.error('Login by email required to like or dislike comments.');
  setPendingLikeDislike({ type: 'like', id }); 
  setShowGuestForm(true);
  return;
}

 const body = userIsAuthenticated ? {} : { guestEmail: currentGuestEmail };
  const headers = {
    ...(userIsAuthenticated && token
      ? { Authorization: `Bearer ${token}` }
      : {}),
    'Content-Type': 'application/json', 
  };
    

    try {
      const { data } = await axios.post(
        `/api/v1/comment/${id}/dislike`,
        body,
        { headers }
      );

      if (data?.success) {
        const guestEmailNormalized = currentGuestEmail?.toLowerCase().trim() || '';
        setComments((prev) =>
          updateCommentById(prev, id, (c) => {
            const dislikedFlag = userId
              ? data.dislikes.some((dislike) => dislike.user === userId)
              : data.dislikes.some((dislike) => (dislike.guestEmail?.toLowerCase().trim() || '') === guestEmailNormalized);

            return {
              ...c,
              dislikes: data.dislikes,
              disliked: dislikedFlag,
              liked: false, // Unset like on dislike
            };
          })
        );
      }
    } catch (error) {
      toast.error('Failed to dislike comment.');
      // console.error('Dislike error:', error);
    }
  };

  //submit and reply handler
  const handleSubmitComment = async (e) => {
    //console.log("Submitting comment...");
//console.log("Form data:", formData);
//console.log("Is Authenticated:", userIsAuthenticated);
//console.log("Replying to ID:", replyingToId);
    //console.log("Guest Info:", guestInfo);
    //console.log("Guest Email:", formData.email);
       e.preventDefault();
      
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.content?.trim()) {
      toast.error('Please fill out all fields.');
      return;
    }
    // console.log("formData values:", formData.name, formData.email, formData.content);


    // Require guest login if unauthenticated
    if (!userIsAuthenticated && (!formData.email || !formData.name)) {
      toast.error('Please provide name and email before submitting a comment.');
      setShowGuestForm(true);
      return;
    }


    if (
      lastSubmitted &&
      lastSubmitted.name?.trim() === formData.name.trim() &&
      lastSubmitted.email?.trim() === formData.email.trim() &&
      lastSubmitted.content?.trim() === formData.content.trim()
    ) {
      toast.error('Duplicate comment detected.');
      return;
    }
    setIsSubmitting(true);

    try {
      const payload = {
  blogId,
  content: formData.content.trim(),
  name: formData.name.trim(),
  email: formData.email.trim(),
};


      if (replyingToId) payload.replyTo = replyingToId;

      //  if (!userIsAuthenticated) {
      //   payload.guestEmail = formData.email.trim();
      //   payload.guestName = formData.name.trim();
      // }
      // console.log("Payload:", payload);
        const headers = userIsAuthenticated ? { Authorization: `Bearer ${token}` } : {};
     const res= await axios.post(`/api/v1/comment/blog/${blogId}`, payload, { headers });
    //  console.log("Response:", res.data);
      //  if (res.data?.success) {
      //   const newComment = {
      //     ...res.data.comment,
      //     id: res.data.comment._id,
      //     liked: false,
      //     disliked: false,
      //     replies: [],
      //   };

        if (res.data?.success) {
  const comment = res.data.comment;

  if (comment && comment.status === 'approved') {
    const newComment = {
      ...comment,
      id: comment._id,
      liked: false,
      disliked: false,
      replies: [],
    };
        if (replyingToId) {
          // Add reply to comment list
          setComments((prev) => addReplyById(prev, replyingToId, newComment));
        } else {
          // Add new top-level comment
          setComments((prev) => [...prev, newComment]);
        }

  
    toast.success('Comment submitted!');
  } else {
    toast.success('Comment submitted and awaiting approval!');
  }
      setFormData((prev)=>({  ...prev, content: '' }));
        setReplyingToId(null);
      setLastSubmitted(formData);
      }
      
    } catch (err) {
        //.error(err);
        //console.error("Error submitting comment:", err?.response?.data || err.message);
        //console.error("Full error:", err);
//console.error("Response error:", err?.response?.data);

      toast.error('Failed to submit comment.');
    } finally {
      setIsSubmitting(false);
    }
  };


  // Reply submission handler
  const onReply = async (commentId, newReply) => {
  // Send to backend, get response
  
  try {
    const payload = {
      blogId,
      replyTo: commentId,
      name: newReply.name,
      email: newReply.email,
      content: newReply.content,
    };
    
    const emailFromStorage = localStorage.getItem('guestEmail')?.trim();
    const emailFromForm = formData.email?.trim();
    
    const currentGuestEmail = emailFromStorage || emailFromForm;
    
    const body = userIsAuthenticated ? {} : { guestEmail: currentGuestEmail };
    const headers = {
      'Content-Type': 'application/json',
      ...(userIsAuthenticated ? { Authorization: `Bearer ${token}` } : {}),
    };
    
    
    const res = await axios.post( `/api/v1/comment/${commentId}/reply`, payload,{headers});
    
    //console.log('Reply response:', res.data);
  

  if (res.data.success) {
       const comment = res.data.updatedComment
     const formattedReply = {
        ...comment,
        id: comment._id,
        liked: false,
        disliked: false,
        replies: [],
      };

      // Insert reply into the state
      setComments((prev) => addReplyById(prev, commentId, formattedReply));

      return comment; // Return the result so Comment.jsx can show message
    }
  } catch (err) {
    //console.error('Error submitting reply:', err);
    throw err;
  }
};

  


 // Start replying to a comment
  
//  const startReplying = (id) => setReplyingToId(id);

  

  // Cancel reply
  const cancelReply = () => setReplyingToId(null);

//sort comments
  // Sort comments function
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'likes') return (b.likes?.length || 0) - (a.likes?.length || 0);
    return 0;
  });




  // const onAddReply = (commentId, reply) => {
  //   setComments((prev) => addReplyById(prev, commentId, reply));
  // };

//    function getUserIdFromToken(token) {
//   try {
//     const payload = token.split('.')[1];
//     return JSON.parse(atob(payload)).id || JSON.parse(atob(payload))._id || null;
//   } catch {
//     return null;
//   }
// }

// function mapReplies(replies, userId, guestEmail) {
//   return replies.map(r => ({
//     ...r,
//       id: r._id, 
//     liked: userId
//       ? r.likes?.some(like => like.user === userId)
//       : guestEmail
//       ? r.likes?.some(like => like.guestEmail === guestEmail)
//       : false,
//     disliked: userId
//       ? r.dislikes?.some(dislike => dislike.user === userId)
//       : guestEmail
//       ? r.dislikes?.some(dislike => dislike.guestEmail === guestEmail)
//       : false,
//     replies: r.replies ? mapReplies(r.replies, userId, guestEmail) : [],
//   }));
// }

// useEffect(() => {
//    if (!blogId || (!userIsAuthenticated && !formData.email)) return;

  
//     const fetchComments = async () => {
//       try {
//         const res = await axios.get(`/api/v1/comment/blog/${blogId}/comments`, {
//           headers: userIsAuthenticated ? { Authorization: `Bearer ${token}` } : {},
//           params: !userIsAuthenticated && formData.email ? { guestEmail: formData.email } : {},
//         });
//           const commentsFromApi = res.data.comments;
//             const currentGuestEmail = localStorage.getItem('guestEmail')?.toLowerCase().trim();
//     const currentUserId = user?._id || null;

//     const mapCommentsWithFlags = (comments) =>
//         comments.map((comment) => {
//           const liked = comment.likes.some(like =>
//             currentUserId
//               ? like.user === currentUserId
//               : like.guestEmail?.toLowerCase().trim() === currentGuestEmail
//           );

//           const disliked = comment.dislikes.some(dislike =>
//             currentUserId
//               ? dislike.user === currentUserId
//               : dislike.guestEmail?.toLowerCase().trim() === currentGuestEmail
//           );

//           return {
//             ...comment,
//             liked,
//             disliked,
//             replies: comment.replies ? mapCommentsWithFlags(comment.replies) : [],
//           };
//         });
//        const updatedComments = mapCommentsWithFlags(commentsFromApi);
//       setComments(updatedComments);
//    } catch (err) {
//       toast.error('Error loading comments');
//     }
//   };

//   fetchComments();
// }, [blogId, token, formData.email, user]);
       
        

// Helper functions assumed to be defined somewhere accessible:


  


  // useEffect(() => {
  //   const sorted = [...comments].sort((a, b) => {
  //     const dateA = new Date(a.createdAt);
  //     const dateB = new Date(b.createdAt);
  //     return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  //   });
  //   setSortedComments(sorted);
  // }, [comments, sortBy]);


   return (
    
    <Box sx={{ px: 2 , py: 4, backgroundColor: '#f9f9fb' }}>

       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom>Comments</Typography>
        <Button  onClick={() => setShowGuestForm(true)}
        sx={{width: 'fit-content',marginLeft: 'auto'}}
         className="text-sm text-blue-600 underline"
        variant="outlined">Login</Button>
   </Box>

      {/* Sort & Share */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 , width: '100%'}}>
        <TextField
          select
          size="small"
          label="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
             sx={{ minWidth: 150 }}
           
        >
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
           <MenuItem value="likes">Most Likes</MenuItem>
        </TextField>
        <ShareButton className="b-" />
         {/* <Button
        sx={{ variant:"outlined",width: 'fit-content',
          color:"primary" }}
          // startIcon={<ShareIcon />}
          // onClick={() => setOpenShare(true)}
        >
          Share
        </Button> */}
      </Box>

     

      {/* Add New Comment */}
      <Box sx={{ mt: 4 }}>
          
        <Typography variant="h6" gutterBottom>Join the discussion</Typography>
        
       <Box
  component="form"
  onSubmit={handleSubmitComment}
  sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}
>
          {!userIsAuthenticated && (
            <>
          <TextField name="name" label="Name" fullWidth value={formData.name} onChange={handleChange}  size="small" required
             sx={{
    '& .MuiInputBase-input': {
      padding: '26.5px 14px !important',
      boxSizing: 'border-box',
    },
  }}
          />  
          <TextField name="email" label="Email"  type="email" size="small" fullWidth value={formData.email} onChange={handleChange}   required
           sx={{
    '& .MuiInputBase-input': {
      padding: '26.5px 14px !important',
      boxSizing: 'border-box',
    },
  }} /></> )}
       
        <TextField
          name="content"
          // label="Comment"
           label={replyingToId ? 'Write a reply...' : 'Write a comment...'}
          multiline
          rows={3}
          fullWidth
          value={formData.content}
          onChange={handleChange}
         
              sx={{ mb: 1 }}
        />
           <Box>
            {replyingToId && (
              <Button variant="text" onClick={cancelReply} sx={{ mr: 1 }}>
                Cancel Reply
              </Button>
            )}
          
          <Button   type="submit" variant="contained" sx={{ mt: 2 ,width:"fit-content"}}  disabled={isSubmitting}>
          {replyingToId ? 'Submit Reply' : 'Submit Comment'}
        </Button>
      </Box>
        
      </Box>

 {/* Guest Login Modal */}
   {showGuestForm && (
      <GuestLoginModal
      open={showGuestForm}
   name={guestInfo.name}
          email={guestInfo.email}
          onNameChange={(e) => setGuestInfo((prev) => ({ ...prev, name: e.target.value }))}
          onEmailChange={(e) => setGuestInfo((prev) => ({ ...prev, email: e.target.value }))}
          onSubmit={handleSubmitGuest}
          onClose={() => setShowGuestForm(false)}
        />
      )}

      

 {/* Comments List */}
      {sortedComments.length === 0 ? (
        <Typography>No comments yet.</Typography>
      ) : (
        <>
         {/* {console.log('visibleCount:', visibleCount, 'total comments:', sortedComments.length)} */}
       { sortedComments.slice(0, visibleCount).map((comment) => (

          <Comment
            key={comment.id}
            commentData={comment}
            onToggleLike={onToggleLike}
            onToggleDislike={onToggleDislike}
            onReply={onReply}
            replyingToId={replyingToId}
            userId={userId}
            guestEmail={formData.email}
              setReplyingToId={setReplyingToId}
              replyForm={replyForm}
              setReplyForm={setReplyForm}
          />
        ))}

          {visibleCount < sortedComments.length && (
            <button onClick={() =>  {
    setVisibleCount(prev => {
      const newCount = prev + 2;
      // console.log("Increasing visibleCount:", newCount);
      return newCount;
         });
          }}>
              Show More
            </button>
          )}
          </>
      )}
    </Box>
    </Box>
   
  );
}

export default CommentSection;
