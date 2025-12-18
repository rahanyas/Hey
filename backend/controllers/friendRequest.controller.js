// 1) frontend send sender and reciever id ;

// 2) check if they are already friends and then add to ;

// 3) by going the sender user and check the reciever is in  his freinds field;

// 4)if yes return . else add the user to freindReq collection;

// 5)and show the req that a user got in req page in frontend where he can add or rejct the req
// frend Request modal in db;

import friendRequestModal from "../models/friendRequest.modal.js";
import userModal from "../models/user.modal.js";

// error msg is empty when throw error works solve it in register funRequest {
     async sendRequest(req, res){
            const {recieverId} = req.body;
            const senderId = req.user?._id || req.body;
            console.log('sender id : ', senderId, 'reciever id : ', recieverId);

            if(!recieverId && !senderId){
                return res.status(400).json({msg : 'reciver id or sender id is not defined'})
            };

            try {             
                const isAlreadyFriends = await userModal.findOneAndUpdate(
                    {
                    _id : senderId,
                    'friends.userId' : recieverId
                    },
                    {
                        $push : {
                            friends : { userId : recieverId }
                        }
                    },
                    {
                        new : true
                    });
    
                if(!isAlreadyFriends){
                        return res.status(400).json({
                            success : false,
                            msg : 'User Is already Friend'
                        })
                    };

                return res.status(200).json({
                        success : true,
                        msg : 'Request Sended'
                    });
                
            } catch (err) {
                console.log('error in sendReq function : ', err.message);
                return res.status(500).json({success : false, msg : 'Internel Server Error'})
            }

    }
};

const frendReq = new FriendRequest();

export default frendReq;