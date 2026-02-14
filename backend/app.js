import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dbConnect from './config/db.config.js';

import authRouter from './router/auth.router.js';
import oauthRouter from './router/oauth.router.js';
import friendRouter from './router/friendReq.router.js';
import messageRouter from './router/message.router.js';
import otpRouter from './router/otp.router.js'

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { oAuth } from './controllers/oauth.controller.js';


const clientID = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;


dbConnect(process.env.MONGO_URI);

const app = express();


app.use(cookieParser())
app.use(passport.initialize());

app.use(cors({
   origin : [
      process.env.DEV_URI,       // http://192.168.31.174:5173
      process.env.PROD_URI,
    ],
  credentials: true,
}));


app.use(express.json());


app.use(morgan('dev'));


let callbackUri = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'https://hey-stgl.onrender.com'

passport.use(new GoogleStrategy({
  clientID,
  clientSecret,
  callbackURL : `${callbackUri}/auth/google/callback`
}, oAuth));

app.use('/api', authRouter);
app.use('/auth', oauthRouter);
app.use('/feature', friendRouter);
app.use('/message', messageRouter);
app.use('/otp', otpRouter);

export default app;

