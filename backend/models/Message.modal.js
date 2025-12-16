import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    conversationId : {
        type : String,
        ref : 'conversation',
        required : true
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    text : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["send", "deliverd", "read"],
        default : "send"
    }
}, {timestamps : true});

const msgModal = mongoose.model('message', msgSchema);

export default msgModal;