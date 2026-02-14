
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const user = process.env.USER;
const pass =  process.env.PASS;

export const transporter = nodemailer.createTransport({
  host : 'smtp.gmail.com',
  port : 587,
  secure : false,
  auth : {
    user : user,
    pass : pass
  },
  tls : {
    family : 4
  }
});


