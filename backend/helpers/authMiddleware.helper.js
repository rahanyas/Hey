import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const token =  req?.cookies?.token;
        // console.log('token : ', token);

        if(!token){
            return res.status(401).json({success : false , msg : 'user is not Authenticated'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (err) {
        console.log('Error in authCheck : ', err);
        return res.status(401).json({msg : 'invalid or expired token', success : false})
    }
}