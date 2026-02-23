import dotenv from 'dotenv';
dotenv.config();
import {Resend} from 'resend';
import nodemailer from 'nodemailer';

// const pass =  process.env.RESEND_PASS;

// const resend = new Resend(pass)
console.log( process.env.ZOHO_PASS)

const transporter = nodemailer.createTransport({
  service : 'gmail',
  port : 587,
  connectionTimeout : 90000,
  greetingTimeout : 60000,
  socketTimeout : 300000,
  
  auth : {
    user : process.env.USER,
    pass : process.env.PASS
  }
})


export default transporter