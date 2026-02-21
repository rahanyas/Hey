import otpModal from '../models/otp.modal.js';
import otpCreate from '../helpers/createOtp.js';
import resend from '../service/mailer.js'

export const sendOtp = async (req, res) => {
  try {
    const {data} = req.body;
    const { email } = data;

    if(!email){
      return res.status(400).json({
        success : false,
        msg : 'Email is required'
      })
    };

  const otp = otpCreate();

  await otpModal.findOneAndUpdate(
    { email },
    {
      otp,
      expiresAt : new Date(Date.now() + 5 * 60 * 1000)
    },
    {upsert : true}
  );

  const response = await resend.emails.send({
    from : 'onboarding@resend.dev',
    to : email,
    subject : 'Your OTP code',
    html : `
         <div style="font-family: Arial, sans-serif;">
          <h2>Verify your email</h2>
          <p>Your OTP code is:</p>
          <h1 style="letter-spacing: 4px;">${otp}</h1>
          <p>This code expires in 5 minutes.</p>
        </div>
      `,
  });

  return res.status(200).json({
    success : true,
    msg : 'OTP sent successfully'
  })

  } catch (err) {
    console.log('error in send otp : ', err);
    return res.status(500).json({
      success : false,
      msg : 'Failed to send OTP'
    })
  }
};


export const verifyOtp = async (req, res) => {
  try {
     const {email, otp} = req.body.data;
    //  console.log(otp, email);
   
    
     if(!email || !otp){
      return res.status(400).json({
        success : false,
        msg : 'please try again'
      })
     };
    // fetch otp from db related to the user
    const otpDoc = await otpModal.findOne({email});
    // console.log(otpStoredInDb);
    
    if(!otpDoc){
      return res.status(400).json({
        success : false,
        msg : 'OTP expired, please start from first'
      })
    };

    const storedOtp = otpDoc.otp;
    const attempts = otpDoc.attempts;

    if(attempts >= 3){
       await otpModal.deleteOne({email});

        return res.status(400).json({
          success : false,
          msg : 'too many attempts, Please request new OTP'
        });

    }

    if(otp !== storedOtp){
       await otpModal.updateOne({email}, {
        $inc : { attempts :  1}
      });

      return res.status(200).json({
        success : false,
        msg : 'wrong OTP, please try again'
      })
    };

    await otpModal.deleteOne({email});

    return res.status(200).json({
      success : true,
      msg : 'OTP verifyied'
    });

  } catch (err) {
    console.log('error in verifyOtp : ', err);
    return res.status(500).json({
      success : false,
      msg : 'Internal Server Error'
    })
  }
}