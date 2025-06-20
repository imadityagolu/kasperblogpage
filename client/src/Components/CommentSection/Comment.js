import React, { useEffect, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';

import FilledHeartIcon from '@mui/icons-material/Favorite';
import OutlineHeartIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import "./comment.css";
import toast from 'react-hot-toast';

const Comment = ({
  commentData,
  onToggleLike,
  onToggleDislike,
  onReply,
  replyingToId,
   setReplyingToId,
   userId,
    guestEmail,
  
}) => {
  const { id ,guest, content, liked, disliked, replies } = commentData;
  const name = guest?.name || commentData.user?.name || "User";
const comment = content;
// console.log("Comment ID:", id, "Liked:", liked);




  // const [replyForm, setReplyForm] = useState({ name: '', email: '', content: '' });

  const [replyForm, setReplyForm] = useState({
  name: guestEmail || (userId ? 'LoggedInUserName' : ''),
  email: guestEmail || '',
  content: '',
});
  const [isSubmitting, setIsSubmitting] = useState(false);
//    const guestName = localStorage.getItem('guestName');
// const guestEmail = localStorage.getItem('guestEmail');

  const [showGuestForm, setShowGuestForm] = useState(false);
  

  useEffect(() => {
  //console.log(`Comment ${id} liked changed: `, liked);
}, [liked]);

  
useEffect(() => {
  if (replyingToId === id) {
    setReplyForm(prev => ({
      ...prev,
      name: guestEmail || (userId ? 'LoggedInUserName' : ''),
      email: guestEmail || '',
    }));
  }
}, [replyingToId, guestEmail, userId, id]);

  const handleReplyChange = (e) => {
    setReplyForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLike = (id,disliked, liked) => {
      // console.log("handleLike triggered for id:", id);
  // console.log("guestInfo:", guestEmail);
     
  
      if (!userId && !guestEmail ) {
      setShowGuestForm(true);
      return;
    }
     // If liked already, toggle it off
//   if (commentData.liked) {
//     onToggleLike(id, false);
//   } else {
//     onToggleLike(id, true);
//     onToggleDislike(id, false); // remove dislike
//   }
// };

 if (liked) {
    onToggleLike(id, false);
  } else {
    onToggleLike(id, true);
    if (disliked) onToggleDislike(id, false); // only if disliked before
  }
};

  const handleDislike = (id,liked,disliked) => {
    // console.log("handleDislike triggered for id:", id);
  // console.log("guestInfo:", guestEmail);
  
      if (!userId && !guestEmail) {
    setShowGuestForm(true);
    return;
  }
 // If disliked already, toggle it off
//   if (commentData.disliked) {
//     onToggleDislike(id, false);
//   } else {
//     onToggleDislike(id, true);
//     onToggleLike(id, false); // remove like
//   }
// };

if (disliked) {
    onToggleDislike(id, false);
  } else {
    onToggleDislike(id, true);
    if (liked) onToggleLike(id, false); // only if liked before
  }
};

  const submitReply = async() => {
      const { name, email, content } = replyForm;
    if (!name.trim() || !email.trim() || !content.trim()) {
    alert('Please fill all reply fields');
    return;
  }

    setIsSubmitting(true);
   const newReply = {
    name,
    email,
    content,
    liked: false,
    disliked: false,
    replies: [],
  };
     try {
      // console.log('Submitting reply...', newReply);
    const replyResponse =await  onReply(id, newReply);
    // console.log('Reply response:', replyResponse);
    setReplyForm({ name: '', email: '', content: '' });
    setReplyingToId(null);
    if (replyResponse.status === 'approved') {
      toast.success('Reply submitted!');
    } else {
      toast.success('Reply submitted and awaiting approval!');
    }
  } catch {
    toast.error('Failed to submit reply');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Box sx={{ position: 'relative', display: 'block' }}>
    <Box sx={{ mb: 2, borderLeft: '1px solid #ddd'}}>
      <Card>
        <CardContent sx={{ display: 'flex', gap: 2 }}>
         <Avatar sx={{ bgcolor: '#34B7F1', width: 40, height: 40 }}>
  {name.charAt(0).toUpperCase()}
</Avatar>
          <Box>
            <Typography fontWeight="bold">{name}</Typography>
            <Typography>{comment}</Typography>
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 ,width: 'fit-content', mt: 1 , mt: 1,minWidth: '180px'}}>
  <Box sx={{ display: 'inline-flex', gap: 0.5, position: 'relative' ,overflow: 'visible' }}>
  <IconButton
    onClick={() => handleLike(id, liked, disliked)}
     color={liked ? 'error' : 'default'}
    aria-label="Like comment"
    className="p-0 m-0"
  >
     {liked ? <FilledHeartIcon /> : <OutlineHeartIcon />}
  </IconButton>

  <IconButton
    onClick={() => handleDislike(id,liked, disliked)}
    color={disliked ? 'error' : 'default'}
    aria-label="Dislike comment"
    className="p-0 m-0"
  >
    <ThumbDownIcon />
  </IconButton>

  {showGuestForm && (
    <div className="guest-popup">
      <p>Please login to like or dislike comments.</p>
      <button onClick={() => setShowGuestForm(false)}>Close</button>
    </div>
  )}
</Box>

  
  {/* Push Reply button farther right */}
  <Box sx={{ marginLeft: 'auto' }}>
    <Button size="small" onClick={() => setReplyingToId(replyingToId === id ? null : id)}>
      {replyingToId === id ? 'Cancel' : 'Reply'}
    </Button>
  </Box>
</Box>

            {replyingToId === id && (
              <Box sx={{ mt: 1 }}>
                <TextField
                  label="Name"
                  name="name"
                  value={replyForm.name}
                  onChange={handleReplyChange}
                  fullWidth
                  margin="dense"
                   sx={{
    '& .MuiInputBase-input': {
      padding: '26.5px 14px !important',
      boxSizing: 'border-box',
    },
  }}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={replyForm.email}
                  onChange={handleReplyChange}
                  fullWidth
                  margin="dense"
                   sx={{
    '& .MuiInputBase-input': {
      padding: '26.5px 14px !important',
      boxSizing: 'border-box',
    },
  }}
                />
                <TextField
                  label="Reply"
                  name="content"
                  value={replyForm.content}
                  onChange={handleReplyChange}
                  fullWidth
                  multiline
                  rows={2}
                  margin="dense"
                />
                <Button
                  variant="contained"
                  onClick={submitReply}
                  disabled={isSubmitting}
                  sx={{ mt: 1 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Reply'}
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Recursive replies */}
      {replies.map((reply) => (
        <Comment
          key={reply.id}
          commentData={reply}
          onToggleLike={onToggleLike}
          onToggleDislike={onToggleDislike}
          onReply={onReply}
          replyingToId={replyingToId}
          setReplyingToId={setReplyingToId}
         
        />
      ))}
    </Box>
    </Box>
  );
};
export default React.memo(Comment);