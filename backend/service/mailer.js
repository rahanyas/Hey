
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const user = process.env.USER;
const pass =  process.env.PASS;

export const transporter = nodemailer.createTransport({
  host : 'smtp.gmail.com',
  service : 'gmail',
  port : 465,
  secure : false,
  auth : {
    user : user,
    pass : pass
  },
  tls : {
    family : 4
  }
});

transporter.verify((err, success) => {
  if(err){
    console.log('error in tranporter : ', err)
  }else{
    console.log('Ready for message : ', success)
  }
})

