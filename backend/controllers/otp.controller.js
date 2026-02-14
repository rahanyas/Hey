import otpModal from '../models/otp.modal.js';
import otpCreate from '../helpers/createOtp.js';
import { transporter } from '../service/mailer.js'

export const sendOtp = async (req, res) => {
  try {
    const {email} = req.body;
    if(!email){
      return res.status(400).json({
        success : false,
        msg : 'Email is required'
      })
    };

  const otp = otpCreate();

  await otpModal.deleteMany({email});

  // store otp in db 

  await otpModal.create({
    email : email,
    otp : otp,
    expiresAt : new Date(Date.now() + 5 * 60 * 1000) // 5mnts
  });

  res.status(200).json({
    success : true,
    msg : 'OTP sent successfully'
  })

   transporter.sendMail({
    from : `HEY APP ${process.env.USER}`,
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
  }).then(info => {
    console.log('Messsage sent : ', info.messageId)
  }).catch(err => {
    console.error('Email send error : ',err)
  })

 

  } catch (err) {
    console.log('error in send otp : ', err);
    return res.status(500).json({
      success : false,
      msg : 'Failed to send OTP'
    })
  }
};


