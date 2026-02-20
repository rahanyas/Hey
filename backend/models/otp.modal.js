import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
   email : {
    type : String,
    required : true
   },
   otp : {
    type : String,
    required : true
   },
   expiresAt : {
    type : Date,
    required : true,
    index : {expires : 0}
   },
   attempts : {
    type : Number,
    default : 0
   }
}, {timestamps : true});

const otpModal = mongoose.model('otp', otpSchema);

export default otpModal;

// mongodb automatically deletes otp , because of expires : 0 in index