import jwt from 'jsonwebtoken';

// const isProduction = process.env.NODE_ENV === 'production';
// console.log(isProduction);

export const createToken = (userId, res) => {
 try{
  //  console.log(userId);
   if(!userId){
    //  console.log('user id is not definded');
     return res.status(400).json({msg : 'Error in token Creation', success : false})
   }
   //create jwt token
   const token = jwt.sign({id:userId}, process.env.JWT_SECRET,
    {expiresIn : '2d'});
    
    if(!token){
      return res.status(400).json({success : false, msg : 'Token creation Failed'})
    }

    res.cookie("token", token, {
      secure : process.env.NODE_ENV !== 'development',
      sameSite : process.env.NODE_ENV !== 'development' ? 'None' : 'Lax',
      httpOnly  : true,
      maxAge : 2 * 24 * 60  * 60 * 1000,
    });

    // console.log('token created ', token);

 }catch(err){
	console.error('error in createToken : ', err);
	return res.status(500).json({sucesss:false,msg:'Token Generation Failed'})
 }
}
