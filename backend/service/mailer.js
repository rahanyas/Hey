// import  { Resend } from  'resend'
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import {Resend} from 'resend'
const pass =  process.env.RESEND_PASS;
// const user = process.env.USER;

const resend = new Resend(pass)


// const transporter = nodemailer.createTransport({
//     host : 'smtp.resend.com',
//     port : 587,
//     auth : {
//       user : 'resend',
//       pass : pass
//     },
//     connectionTimeout : 30000,
//     greetingTimeout : 30000,
//     socketTimeout : 30000
// });

// try {
//   transporter.verify()
//   console.log('SMTP Ready : ')
// } catch (err) {
//   console.log('Erorr : ', err)
// }

export default resend