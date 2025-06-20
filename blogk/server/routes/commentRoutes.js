const express = require('express');
const router = express.Router();
const {
    commentToBlogController,
   
    deleteCommentController,
    approveCommentController,
    disapproveCommentController,
    getAllCommentController,
    getEditComment,
    updateComment,
    toggleCommentLike,
    addReplyToComment,
    deleteReplyFromComment,
    toggleReplyLike,
    getBlogCommentController,
    toggleCommentDislike
} = require('../controllers/commentController');
const checkIsUserAuthenticated = require('../middlewares/authMiddleware');

//get all comments
router.get('/all-comments',getAllCommentController);

// POST: Submit comment to blog
router.post('/blog/:id',commentToBlogController);

// GET: Get comments for a specific blog
router.get('/blog/:id/comments', getBlogCommentController);

//PUT: Edit comment
router.get('/:id', getEditComment);
router.put('/:id/edit',updateComment);

// DELETE: Delete comment
router.delete('/:id/delete', checkIsUserAuthenticated , deleteCommentController);

// POST: Approve comment (admin or blog owner)
router.post('/approve', checkIsUserAuthenticated , approveCommentController);

// POST: Disapprove comment
router.post('/disapprove', checkIsUserAuthenticated, disapproveCommentController);

// POST: Add a reply to a comment
router.post("/:id/reply" , checkIsUserAuthenticated , addReplyToComment);

// DELETE: Delete a reply from a comment
router.delete("/:commentId/replies/:replyId" , checkIsUserAuthenticated , deleteReplyFromComment)

//likes-dislikes id comment that you want to like
router.post('/:id/like' , checkIsUserAuthenticated , toggleCommentLike);

// dislikes id comment that you want to dislike
router.post('/:id/dislike', checkIsUserAuthenticated, toggleCommentDislike);


//replyliketoggle
router.post('/:commentId/reply/:replyId/like',
    checkIsUserAuthenticated , toggleReplyLike
);


module.exports = router;
