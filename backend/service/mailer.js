import  { Resend } from  'resend'
import dotenv from 'dotenv';
dotenv.config();

const pass =  process.env.PASS;

const resend = new Resend(pass);

export default resend.emails;
