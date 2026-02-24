import dotenv from 'dotenv';
dotenv.config();
import {Resend} from 'resend';
import nodemailer from 'nodemailer';

// const pass =  process.env.RESEND_PASS;

// const resend = new Resend(pass)
console.log( process.env.BREVO_PASS);

const transporter = nodemailer.createTransport({
  host : 'smtp-relay.brevo.com',
  port : 587,
  secure : false,
  family : 4,
  auth : {
    user : 
       'a2b142001@smtp-brevo.com',
    pass : process.env.BREVO_PASS
  },
  connectionTimeout : 30000,
  greetingTimeout : 60000,
  socketTimeout : 300000,
  tls : {
    rejectUnauthorized : false
  }
})


export default transporter