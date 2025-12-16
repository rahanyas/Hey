import mongoose, { mongo } from "mongoose";

// here iam tracking which users started conversations which is one to one;

const conversatinSchema = new mongoose.Schema({
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            required : true
        }
    ]
}, {timestamps : true});

const conversationModal =  mongoose.model('conversation', conversatinSchema);

export default conversationModal;