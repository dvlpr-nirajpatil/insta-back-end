const mongoose = require('mongoose');
const logger = require('../core/logger');
const { error } = require('console');

mongoose.connect(process.env.MONGODB_URI ).then(()=>{
    
    logger.info("MongoDB connected");
}).catch((error)=>{ logger.error(error);})