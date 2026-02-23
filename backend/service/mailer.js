import dotenv from 'dotenv';
dotenv.config();
import {Resend} from 'resend';
import nodemailer from 'nodemailer';

// const pass =  process.env.RESEND_PASS;

// const resend = new Resend(pass)
console.log( process.env.ZOHO_PASS)

const transporter = nodemailer.createTransport({
  host : 'smtp.gmail.com',
  port : 465,
  secure : true,
  family : 4,
  auth : {
    user : process.env.USER,
    pass : process.env.PASS
  },
  connectionTimeout : 90000,
  greetingTimeout : 60000,
  socketTimeout : 300000,
  tls : {
    rejectUnauthorized : false
  }
})


export default transporter