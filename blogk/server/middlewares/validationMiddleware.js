const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;
    
    // Check if all required fields are present
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields: username, email, password'
        });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }
    
    // Validate password strength
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long'
        });
    }
    
    // Validate username
    if (username.length < 3) {
        return res.status(400).json({
            success: false,
            message: 'Username must be at least 3 characters long'
        });
    }
    
    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please provide both email and password'
        });
    }
    
    next();
};

const validateBlog = (req, res, next) => {
    const { title, description, category } = req.body;
    
    if (!title || !description || !category) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields: title, description, category'
        });
    }
    
    if (title.length < 5) {
        return res.status(400).json({
            success: false,
            message: 'Title must be at least 5 characters long'
        });
    }
    
    if (description.length < 20) {
        return res.status(400).json({
            success: false,
            message: 'Description must be at least 20 characters long'
        });
    }
    
    next();
};

module.exports = {
    validateRegistration,
    validateLogin,
    validateBlog
}; 