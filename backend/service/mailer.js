// import  { Resend } from  'resend'
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const pass =  process.env.PASS;
const user = 'rahanyas3@gmail.com';

const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth : {
      user : user,
      pass : pass
    }
});

transporter.verify((err, success) => {
  if(err){
    console.log('Erorr : ', err)
  }else{
    console.log('SMTP Ready : ', success)
  }
})

export default transporter