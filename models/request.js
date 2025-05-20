const mongoose = require('mongoose');



const requestSchema = mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    receiverId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    status:{type:String,enum:["PENDING","ACCEPTED","REJECTED"],default:"PENDING"},
    
},{timestamps:true})


let request = mongoose.model("request",requestSchema);

mongoose.exports = request; 