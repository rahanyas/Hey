import dotenv from 'dotenv';
dotenv.config();
import {Resend} from 'resend';
import nodemailer from 'nodemailer';

// const pass =  process.env.RESEND_PASS;

// const resend = new Resend(pass)
console.log( process.env.ZOHO_PASS)

const transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : process.env.USER,
    pass : process.env.ZOHO_PASS
  }
})


export default transporter