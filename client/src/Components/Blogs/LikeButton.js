import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../Pages/Config/config";
import { toast } from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";


 const LikeButton = ({ blogId }) => {
    
  const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
      const [loading, setLoading] = useState(false);

        useEffect(()=> {
          const fetchLikes = async() => {
            try {
              const res= await axios.get(`${BASE_URL}/api/v1/like/blog/${blogId}/likes`);
               const count = res.data.likes ?? 0;
             setLikesCount(count);
        if (res.data.liked) {
          setLiked(true);
        }
      } catch (error) {
        toast.error("Failed to load likes.");
      }
    };
    fetchLikes();
  }, [blogId]);

  const handleLike = async () => {
       if (liked || loading) return; 
         setLoading(true);
    try {
   const res = await axios.post(`${BASE_URL}/api/v1/like/blog/${blogId}`);
   if(res.status === 201) {
    setLiked(true);
    setLikesCount(prev => prev > 0 ? prev + 1 : 1);
      toast.success("Blog liked!");
   }
  } catch (error) {
    if (
      error.response &&
      error.response.data.message === "You already liked this blog."
    ) {
         setLiked(true);
           toast("You already liked this blog.");
    } else {
         //console.error("Error liking blog:", error);
          toast.error("Error liking blog:");
    }
  } finally {
      setLoading(false);
  }
  };

    const Icon = liked ? FaHeart : FaRegHeart;
  return (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <Icon
      size={22}
      onClick={handleLike}
      style={{
       cursor: liked || loading ? "default" : "pointer",
        color: liked ? "red" : "#ccc",
        transition: "color 0.3s",
      }}
       title={liked ? "Liked" : loading ? "Loading..." : "Like"}
    />
      <span>{likesCount}</span>
        </div>
  );
};


export default React.memo(LikeButton);
