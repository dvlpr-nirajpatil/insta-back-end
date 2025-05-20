const response = require("../core/response");
const logger = require("../core/logger");
const Request = require("../models/request");
const { log } = require("winston");




module.exports.sendRequest = async function(req,res){
    const {receiverId} = req.params;
    if(!receiverId){
        return response(res,400,"Receiver ID is required");
   
    }
    try {

        const request = new Request({
            senderId:req.user.id,
            receiverId : receiverId,
        });

        await request.save();
        return response(res,200,"Request sent successfully",request);
    } catch (error) {
        logger.error(error);
        return response(res,500,"Internal Server Error");
    }
    
}


module.exports.updateRequestStatus = async function(req,res){
    const {reqestId,status} = req.params;
    if(!reqestId || !status){
        return response(res,400,"Receiver ID and status are required");
    }
    if(status !== "ACCEPTED" && status !== "REJECTED"){
        return response(res,400,"Status must be either ACCEPTED or REJECTED");
    }

    try {
        const request = await Request.findByIdAndUpdate(
            reqestId,
            {

            status:status

        },{new :true})
         return 
    } catch (error) {
        logger.error(error);
        return response(res,500,"Internal Server Error");
        
    }
}