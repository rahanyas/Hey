import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dbConnect from './config/db.config.js';

import authRouter from './router/auth.router.js';
import oauthRouter from './router/oauth.router.js';
import friendRouter from './router/friendReq.router.js';

const port = process.env.PORT 

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { oAuth } from './controllers/oauth.controller.js';

const clientID = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;



if(!port || port === undefined){ 
 console.log('port is undefined')
};

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


// iam using cookie with cross-site req vercel to render
// when sending cookies acros diff domains, the browser requires these response headers

// this tells the browser:
//  allow cookies to be sent between these domains
let uri = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'https://hey-stgl.onrender.com'


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   if (req.method === "OPTIONS") return res.sendStatus(200);
//   next();
// });


app.use(express.json());


app.use(morgan('dev'));

console.log(uri);

passport.use(new GoogleStrategy({
  clientID,
  clientSecret,
  callbackURL : `${uri}/auth/google/callback`
}, oAuth));

app.use('/api', authRouter);
app.use('/auth', oauthRouter);
app.use('/feature', friendRouter);

app.listen(port , (err) => {
   if(err) return console.log('error in listen func', err);
   else{
  console.log('app is running on port ', port);
}
})
