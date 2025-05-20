 const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = (payload)=>{
   
    try{

      return  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15m'});
    }catch(e){
        throw e; 
       }
    
}

module.exports.generateRefreshToken =(payload)=>{
    try {
        
        return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'15d'},)
    } catch (error) {
        throw error;
    }
}


module.exports.verifyAccessToken = (token)=>{

    try {
        return  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,)
        
    } catch (e) {
        throw e;
    }

}

module.exports.verifyRefreshToken = (token)=>{
    try {
        
        return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,)   
    } catch (error) {
        throw error;
    }
}