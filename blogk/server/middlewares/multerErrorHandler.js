const multer = require('multer');

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Specific Multer errors
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ success: false, message: "File too large. Max size is 2MB." });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
          console.log('Multer error code:', err.code);
      return res.status(400).json({ success: false, message: "Too many files. Max limit is 5 images." });
    }
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    // General or custom errors (e.g., invalid file type)
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
};

module.exports = multerErrorHandler;
