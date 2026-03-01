import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer'

const PASS = process.env.GOOGLE_PASS;
const USER = process.env.GOOGLE_USER;

const transporter = nodemailer.createTransport({
  host : 'smtp-gmail.com',
  port : 587,
  secure : false,
  family : 4,
  auth : {
    user : USER,
    pass : PASS
  },
})


export default transporter