// 1) frontend send sender and reciever id ;

// 2) check if they are already friends and then add to ;

// 3) by going the sender user and check the reciever is in  his freinds field;

// 4)if yes return . else add the user to freindReq collection;

// 5)and show the req that a user got in req page in frontend where he can add or rejct the req
// frend Request modal in db;

import friendRequestModal from "../models/friendRequest.modal.js";
import userModal from "../models/user.modal.js";

class FriendRequest{
     async sendRequest(req, res){
            const {recieverId} = req.body;
            const {senderId} = req.user?._id || req.body;
            console.log('sender id : ', senderId, 'reciever id : ', recieverId);

            if(!recieverId && !senderId){
                return res.status(400).json({msg : 'reciver id or sender id is not defined'})
            };

            try {             
                const isAlreadyFriends = await userModal.findOne({
                    _id : senderId,
                    'friends.userId' : recieverId
                });
    
                if(isAlreadyFriends){
                    return res.status(400).json({success : false, msg : 'already in friend list'})
                };

                //check already has sended frend req //

                const isAlreadyRequested = await friendRequestModal.findOne({
                   $or : [
                    { sender : senderId, reciever : recieverId},
                    {sender : recieverId , reciever : senderId}
                   ] 
                });

                if(isAlreadyRequested){
                    return res.status(400).json({msg : 'already has a sended req', success : false})
                }

                // add sender id and reciver id in frend req modal //
                const addReqToDb = new friendRequestModal({
                    sender : senderId,
                    reciever : recieverId,
                    status : "pending"
                });

                await addReqToDb.save();

                if(!addReqToDb){
                    return res.status(400).json({success : false, msg : 'something went wrong, please try again'})
                }

                // if added send success msg to frontend //
                return res.status(200).json({success : true, msg : 'request sended'});
                
            } catch (err) {
                console.log('error in sendReq function : ', err);
                return res.status(500).json({success : false, msg : 'Internel Server Error'})
            }

    };

    async showReqToUser(req, res){
        const { viewer } = req.body;
        console.log('who want to see req : ', viewer);
        try {
            // fetch req recieved to this user from db
            const viewerReq = await friendRequestModal.find({
                reciever : viewer
            })
            console.log('req recieved to this users : ', viewerReq);
            
            // check if user has any freind req , if not return
            if(viewerReq === 0){
                return res.status(400).json({
                    success : false,
                    msg : 'You dont Have any req'
                })
            };

            // viewerReq gives an array of users who sended req to viewer , so i have to loop through the arr to fetch the id of senders and then to fetch their details

            const senderIds = viewerReq.map(item => item.sender);
            
            // if has friend req , only select name from them and send to frontend;
            // sender id is also an array so i included in operator to find user in the this array

            const userNameOfReqSenders = await userModal.find({_id : {$in : senderIds}}, {
                name : 1
            });

            console.log('userNameOfReqSenders : ', userNameOfReqSenders)

            // pass userNameOfReqSenders to frontend to display thier names , in there viewer can decide whether  accept or rejct the req

            return res.status(200).json({msg : 'fetched req from db', data : userNameOfReqSenders})

        } catch (err) {
            console.log('error in req showing function : ', err);
            return res.status(500).json({msg : 'Internel Server Error', success : false})
        }
    }
};

export default new FriendRequest();
