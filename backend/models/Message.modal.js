import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    conversationId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'conversation',
        required : true
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    text : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["sent", "deliverd", "read"],
        default : "sent"
    }
}, {timestamps : true});

const msgModal = mongoose.model('message', msgSchema);

export default msgModal;