import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
	type : String,
	required : true
},
   email : {
	type : String,
	required : true,
	unique : true
},
   mobile : {
	type : String, //  used to string instead of num because of entrering zeros
	min :  [10, "mobile number must be atleast 10 digits"],
	max : [10, "mobile number cannot exceed more than 10 digits"],
	match : [/^[0-9]+$/, "mobile number must contain only digits"]
},
  pass : {
	type : String,
	select : false
},
  profilePic : {
	type : String
},
  googleId: {
	type : String,
	unique : true,
	sparse : true
},
  provider : {
	type : String,
	required : true,
	enum : ['local', 'google'],
	default : 'local'
},
  active : {
	type : String,
	default : true
},
 friends :  [{
			type : mongoose.Schema.Types.ObjectId,
			ref : 'user'
}]
}, {timestamps : true})

const userModal =  mongoose.model('user', userSchema);

export default userModal
