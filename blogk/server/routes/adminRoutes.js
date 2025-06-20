const express = require('express');
const router = express.Router();
const checkIsUserAuthenticated = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/roleMiddleware');
const {approvedBlog, disapprovedBlog} =require('../controllers/adminController');


 router.put('/blog/:id/approve'
,checkIsUserAuthenticated,  // check user is logged in
  admin,          // check user has admin role
  approvedBlog );

  router.put(`/blog/:id/disapprove`,
    checkIsUserAuthenticated,
  admin,
  disapprovedBlog
  )

 module.exports = router; 