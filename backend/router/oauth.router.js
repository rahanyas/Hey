import { Router } from "express";
import passport from "passport";
import { createToken } from "../helpers/createToken.helpers.js";
import { checkAuth } from "../controllers/auth.controller.js";
const router = Router();


router.get('/google', passport.authenticate(
    'google', {
        scope : ['profile', 'email']
    }
));


router.get('/google/callback', passport.authenticate('google', {
    session : false,
}), (req, res) => {
    if(!req.user){
        return res.status(400).json({success : false, msg : 'Authentication Failed'})
    };
      
    // console.log(req.user)
    createToken(req.user?._id, res);

    const redirectUrl =  process.env.NODE_ENV === 'development' ? process.env.DEV_URI : process.env.PROD_URI ;

    console.log('redirect url : ', redirectUrl );
    return res.redirect(`${redirectUrl}/oauth/google/success`)
    
});

router.get('/checkstatus', checkAuth);

export default router