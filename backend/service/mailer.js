import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
const user = process.env.USER;
const pass =  process.env.PASS;

export const transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : user,
    pass : pass
  },
});


