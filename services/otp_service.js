
const axios = require('axios');



module.exports.sendOtp = async function(phone){

    let sendOtpUrl =  `https://2factor.in/API/V1/${process.env.API_KEY}/SMS/${phone}/AUTOGEN3/${process.env.TEMPLATE}`;
;      if(process.env.TEST_CREDENTIALS){
       const testCredentialsArray = process.env.TEST_CREDENTIALS.split(',');
       if(testCredentialsArray.includes(phone)){
        sendOtpUrl =  `https://2factor.in/API/V1/${process.env.API_KEY}/SMS/${phone}/${process.env.STATIC_OTP}/${process.env.TEMPLATE}`;
       }
}
    try {
    return await axios.get(sendOtpUrl);
    } catch (error) {
        throw error;        
    }
}


module.exports.validateOtp = async function (phone, otp) {
  const validateOtpUrl = `https://2factor.in/API/V1/${process.env.API_KEY}/SMS/VERIFY3/${phone}/${otp}`;
  try {
    return await axios.get(validateOtpUrl);
  } catch (error) {
    throw error;
  }
};