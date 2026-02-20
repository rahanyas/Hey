import dotenv from 'dotenv';
dotenv.config();
import {Resend} from 'resend'
const pass =  process.env.RESEND_PASS;

const resend = new Resend(pass)


export default resend