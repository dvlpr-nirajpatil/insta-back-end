const bcrypt = require("bcrypt");


module.exports.hashPassword = async function(password){
    try {
        return await bcrypt.hash(password,10 );
    } catch (error) {
        throw error;
        
    }
}


module.exports.comparePassword = async function(password,hash){
    try {
    return await bcrypt.compare(password,hash);
    } catch (error) {
        throw error;
    }
}