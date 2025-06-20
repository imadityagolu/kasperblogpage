const multer = require('multer');
const path =require('path'); 

//multer,file upload
const storage= multer.diskStorage({
    destination:function (req,file ,cb){ // destination to file upload
        cb(null,`public/upload/`);// Save uploaded images
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    },// Use a timestamp for file names to avoid collisions
});

// Define multer options (limits and file type filter)
const upload = multer({
    storage: storage,  // Use the defined storage config
    limits: { fileSize: 2 * 1024 * 1024 ,  files: 5,  },  // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
      // Allowed file types (JPEG, JPG, PNG)
      const allowedTypes = /jpeg|jpg|png/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = allowedTypes.test(file.mimetype);
  
      // Check if the file type matches allowed types
      if (extname && mimeType) {
        return cb(null, true);
      } else {
        cb(new Error('Error: Only images (JPEG, JPG, PNG) are allowed'), false);
      }
    }
  });

module.exports =  upload;

