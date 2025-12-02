import { Router } from "express";
import passport from "passport";
import { createToken } from "../helpers/createToken.helpers.js";

const router = Router();

// app.get('/protected', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info, status) {
//     if (err) { return next(err) }
//     if (!user) { return res.redirect('/signin') }
//     res.redirect('/account');
//   })(req, res, next);
// });

router.get('/google', passport.authenticate(
    'google', {
        scope : ['profile', 'email']
    }
));

router.get('/google/callback', passport.authenticate('google', {
    session : false
}), (req, res) => {
    if(!req.user){
        return res.status(400).json({success : false, msg : 'Authentication Failed'})
    };

    createToken(req?.user?._id, res);

    const redirectUrl =  process.env.PROD_URI 
    console.log('redirect url : ', redirectUrl );
    return res.redirect(`${redirectUrl}/auth/google/success`)
    
});

export default router