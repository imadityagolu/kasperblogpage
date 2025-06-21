const jwt= require('jsonwebtoken')
const userModel= require('../models/userModel')


const checkIsUserAuthenticated= async(req,res,next) => {
    let token;
    const {authorization}= req.headers; 
    //console.log("Authorization Header:" , authorization)
    //console.log("All headers", req.headers);
      // Check if the authorization header exists and starts with "Bearer"
    //  console.log("Auth header:", req.headers.authorization);

      if (!authorization || !authorization.startsWith("Bearer ")) {
           req.user = null;
    return next();
  }
  //return res.status(401).json({ message: "Unauthorized: No token" });
//}

    // if(authorization && authorization.startsWith("Bearer")){
        try{
          const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
              // Extract token from the header
            //token = authorization.split(" ")[1];
            //verify token
            //const {userID} = jwt.verify(token,process.env.JWT_SECRETKEY );
              const user = await userModel.findById(decoded.userID).select("-password");
            // const decoded = jwt.verify(token, "pleaseSubscribe");
            // req.user = await userModel.findById(decoded.userID).select("-password");
            
            // Find user by ID
            //req.user= await userModel.findById(userID).select("-password");
            //console.log("Authenticated user:", req.user);
              if (!user) {
            // if (!req.user) {
                return res.status(401).json({ 
                    success: false,
                    message: "Unauthorized: User not found" 
                });
            }
    req.user = user;
            next();  
        }catch(error){
            // return res.status(401).json({message:"unAuthorized User:Invalid token"});
             console.log("Invalid token. Treating as guest.");
              req.user = null;
    return next();
  }
        }
  // If no token is provided, allow the request to proceed (treat as guest)
    // }else{
//  req.user = null; 
 // Set user to null for guests
    //     return res.status(401).json({message:"unAuthorized User:No token provided"});
  // return next();
  //   }

module.exports = checkIsUserAuthenticated;

