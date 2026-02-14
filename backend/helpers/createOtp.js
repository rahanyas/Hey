

const otpCreate = () => {
  // otp will generate according to the limit passed from frontend
    let otp = ''
    const OTP_DIGITS = 4
     for(let i=0; i < OTP_DIGITS; i++){
         otp += Math.floor(Math.random() * 10);
         
     }
     return otp
};


export default otpCreate
