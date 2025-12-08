import userModal from '../models/user.modal.js';
import Auth_check from '../helpers/auth.helpers.js';
import bcrypt from 'bcrypt';
import { createToken } from '../helpers/createToken.helpers.js';
import jwt from 'jsonwebtoken';



export const register = async (req, res) => {
	try{

	const {name, email, pass, mobile}  = req.body;
	console.log('mobile nb length', mobile.length);

	if(!name || !email || !pass || !mobile){
	return res.status(400).json({success : false, 
	msg : 'please enter all required feilds'
	})
	}
  

	// setter methods in authcheck 
	Auth_check.checkEmail = email;
	Auth_check.checkPass = pass;
	Auth_check.checkMobile = mobile

	const existingUser = await userModal.findOne({email});
	
	if(existingUser){
	return res.status(400).json({success : false, msg : 'user already exist, please use login instead'})
		};

	const salt = 10;
	const hashedPass = await bcrypt.hash(
	pass, salt);

	const  newUser = new  userModal({
	  name, 
	  email,
	  pass : hashedPass,
	  mobile,
	  provider : 'local',
	  
	})
	
	await newUser.save();

	newUser.pass = undefined

	createToken(newUser._id, res);
	
	return res.status(200).json({success : true, msg : 'User Registered Successfully', data : newUser})
	} catch (err){
	 console.log('error in register function', err);
	return res.status(500).json({msg : err, success : false})
	}
}

export const Login = async (req, res) => {
	try{
		const {email, pass} = req.body;
		if(!email || !pass){
			return res.status(400).json({success : false, msg : 'Please enter all feilds'})
		}

		Auth_check.checkEmail = email;
		Auth_check.checkPass = pass
		
		const user = await userModal.findOne({email}).select("+pass");

		if(!user) return res.status(400).json({success : false,  msg : 'User Not Exist'})
		
		const checkPass =  await bcrypt.compare(pass, user.pass);

		if(!checkPass) return res.status(400).json({success : false, msg : 'Invalid Credentials'});

		user.pass = undefined

		createToken(user._id, res)

		return res.status(200).json({success : true, msg : 'Successfully Loged In', data:user});
	
	}catch(err) {
	console.log('error in login function', err);
	return res.status(500).json({msg : err, success : false})
	}
}

export const checkAuth = async (req, res) => {
	try {
		const token =  req.cookies?.token;
		console.log('recived token : ', token);

		if(!token){
			return res.status(401).json({success : false, msg : 'Not Authenticated'})
		};

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded);
		
		if(!decoded){
			return res.status(400).json({success :false, msg : 'token not decoded'})
		};
		const user = await userModal.findById({_id : decoded.id});
		console.log('authenticated user : ', user);

		if(!user){
			return res.status(400).json({success : false, msg : 'user not found'});
		};

		return res.status(200).json({success : true, msg : 'user is authorized', data: user || null})

	} catch (err) {
		console.error('Error in checkAuth : ', err);

		if(err.name === 'TokenExpiredError'){
			return res.status(401).json({success : false, msg : 'Token Expired'})
		}
		return res.status(500).json({success : false, msg : 'Internal sever Error'})
	}
}


export const logout = async (req, res) => {
	try {
		let token = req?.cookies?.token;
		if(!token) {
			return res.status(401).json({success : false, msg : 'user is not authorized'})
		}
		res.clearCookie('token',{
        secure : process.env.NODE_ENV !== 'development',
        sameSite : process.env.NODE_ENV !== 'development' ? 'None' : 'Lax',
        httpOnly  : true,
		});
		return res.status(200).json({success : true, msg : 'Logged out successfully'})
	} catch (err) {
		console.error('Error in logout function', err);
		return res.status(500).json({success : false, msg : 'Internal Server Error'})
	}
}