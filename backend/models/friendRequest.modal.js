import mongoose from 'mongoose';

//here iam doing is , creatiing friend Request schema which add who sended the req to whom 

const friendRequest  = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    status : {
        type : String,
        enum : ["pending", "accepted", "rejected", "blocked"],
        default : "pending"
    }
},{timestamps : true});

const RequestModal = mongoose.model('friendRequests', friendRequest);

export default RequestModal;