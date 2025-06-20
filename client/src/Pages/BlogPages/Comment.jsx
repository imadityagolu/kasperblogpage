import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CommentsTable from '../../Components/CommentsTable';
import axios from 'axios';

const token = localStorage.getItem("token");


const Comment = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const [filterStatus, setFilterStatus] = useState('all');

const commentsPerPage = 5;

// Filter comments by approval status
  const filteredComments = comments.filter(comment => {
    if (filterStatus === 'approved') return comment.status === 'approved';
    if (filterStatus === 'pending') return  comment.status === 'pending';
      if (filterStatus === 'disapproved') return comment.status ==='disapproved';
  return true; 
  });

  // Pagination calculations
  const pageCount = Math.ceil(filteredComments.length / commentsPerPage);

  const currentComments = filteredComments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  // Handler for page click
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  const fetchComments = async () => {
    
    try {
      const res = await axios.get('/api/v1/comment/all-comments'); 
       //console.log("Fetched comments:", res.data);
     setComments(res.data.comments);
    } catch (err) {
      //console.error("Error fetching comments:",err);
       setComments([]);
    }
  };

   
 const handleApprove = async (commentId) => {
    try {
     const res= await axios.post(
        '/api/v1/comment/approve',
        { commentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       if (res.data?.success) {
     toast.success("Blog approved successfully");
      setComments(prev =>
        prev.map(comment =>
          comment._id === commentId ? { ...comment, status: 'approved' } : comment
        )
      );
      fetchComments();
    }
    } catch (err) {
      //console.error("Approval failed:", err);
      toast.error("Approval failed. ");
    }
  };


  const handleDisapprove = async (commentId) => {
    try {
      const res = await axios.post(
        '/api/v1/comment/disapprove',
        { commentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        if (res.data?.success) {
      toast.success("Comment disapproved successfully");
      setComments(prev =>
        prev.map(comment =>
          comment._id === commentId ? { ...comment, status: 'disapproved' } : comment
        )
      );

      fetchComments();
    }
    } catch (err) {
      //console.error("Disapproval failed:", err);
      toast.error("Disapproval failed. ");
    }
  };

  const handleDelete = async (commentId) => {
    

  try {
    const res = await axios.delete(`/api/v1/comment/${commentId}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data?.message) {
          toast.success("Comment deleted successfully");
     setComments(prev => prev.filter(comment => comment._id !== commentId));
    
    }
  } catch (err) {
    //console.error("Delete failed:", err);
    toast.error("Failed to delete comment");
  }
};

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="container-scroller">
      <div className="mb-3 d-flex justify-content-end  align-items-center px-3"   style={{ width: 'fit-content' }}>
    
  <button className="btn btn-outline-secondary me-2" onClick={() => setFilterStatus('all')}>All</button>
  <button className="btn btn-outline-success me-2" onClick={() => setFilterStatus('approved')}>Approved</button>
   <button className="btn btn-outline-secondary me-2" onClick={() => setFilterStatus('disapproved')}>Disapproved</button>
  <button className="btn btn-outline-warning" onClick={() => setFilterStatus('pending')}>Pending</button>
</div>

      <div className="page-body-wrapper">
      
        <div className="main-panel">
          <div className="content-wrapper px-4 py-4">
             {/* HEADER SECTION */}
            <div className="d-flex justify-content-between align-items-center mb-4 p-2 "style={{ backgroundColor: '#1976D2',color: 'white', borderRadius: '5px' }}>
              <h3 className="mb-0 ">Blog Comments</h3>
              {/* Optional button or filters can go here */}
            </div>
                {/* MAIN CONTENT */}
            <CommentsTable
              comments={currentComments}
              onApprove={handleApprove}
              onDisapprove={handleDisapprove}
              onDelete={handleDelete}
            />
          </div>
 {/* Simple pagination below */}
          <div className="userpagination d-flex justify-content-center gap-2 mt-3">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index + 1}
                className={`userpage-btn btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default Comment;