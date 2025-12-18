import mongoose from 'mongoose';

//here iam doing is , creatiing friend Request schema which add who sended the req to whom 

const friendRequest  = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    status : {
        type : String,
        enum : ["pending", "accepted", "rejected", "blocked"],
        default : "pending",
        required : true
    }
},{timestamps : true});

const friendRequestModal = mongoose.model('friendRequests', friendRequest);

export default friendRequestModal;