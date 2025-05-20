
const jwt = require("../core/jwt");
const logger = require("../core/logger");

const response = require("../core/response");

 const protectRoute = (req,res,next)=>{
      
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
     if(!token){
        return response(res,400,"Access token is required");
     }
     try {
        let decoded = jwt.verifyAccessToken(token);
        req.user = decoded;
        next();
     } catch (error) {
      logger.error(error);
        if(error.name == "TokenExpiredError"){
           return response(res,401,"Access token expired");

        }

        if(error.name == "JsonWebTokenError"){
           return response(res,401,"Invalid Token");

        }

        return response(res,500,"Internal Server Error");
     }
 }


 module.exports  = protectRoute;