// import  { Resend } from  'resend'
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const pass =  process.env.RESEND_PASS;
// const user = process.env.USER;

const transporter = nodemailer.createTransport({
    host : 'smtp.resend.com',
    port : 587,
    auth : {
      user : 'resend',
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