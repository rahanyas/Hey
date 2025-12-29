// 1) frontend send sender and reciever id ;

// 2) check if they are already friends and then add to ;

// 3) by going the sender user and check the reciever is in  his freinds field;

// 4)if yes return . else add the user to freindReq collection;

// 5)and show the req that a user got in req page in frontend where he can add or rejct the req
// frend Request modal in db;

import friendRequestModal from "../models/friendRequest.modal.js";
import userModal from "../models/user.modal.js";

class FriendRequest{
    
     async searchFriends(req, res){
        // get his id from frontend 
        const {userToFind} = req.query;
        // console.log('user to find (his id) : ', userToFind);

        if(!userToFind){
            return res.status(400).json({msg : "usertofind is undefined", success : false})
        }

        try {
            // find he is in user collection
            const user = await userModal.find({ name : {
                $regex : userToFind, 
                $options : 'i'
            }}).select('name profilePic');
            // console.log(user)
            // if not return no user found msg;
            if(user.length === 0){
                return res.status(200).json({success : true, msg : 'user not found'});
            }
            // if he is in send the user to frontend so the user name can display as search result
            return res.status(200).json({success : true, data : user || []})
        } catch (err) {
            console.log('error in searchFriends : ', err);
            return res.status(500).json({success : false, msg : 'Internel Server Error'});
        }
     }

     async sendRequest(req, res){
            const {recieverId} = req.body;
            const {senderId} = req.user?._id || req.body;
            console.log('sender id : ', senderId, 'reciever id : ', recieverId);

            if(!recieverId || !senderId){
                return res.status(400).json({msg : 'reciver id or sender id is not defined'})
            };

            try {             
                const isAlreadyFriends = await userModal.findOne({
                    _id : senderId,
                    'friends.userId' : recieverId,
                });
                
                if(isAlreadyFriends){
                    return res.status(200).json({success : false, msg : 'already in friend list'})
                };

                //check already has sended frend req //

                const isAlreadyRequested = await friendRequestModal.findOne({
                   $or : [
                    { sender : senderId, reciever : recieverId},
                    {sender : recieverId , reciever : senderId},
                   ],
                  
                });

                if(isAlreadyRequested){
                    return res.status(200).json({msg : 'already has a sended req', success : false})
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
            const reqSenders = await friendRequestModal.find({
                reciever : viewer,
                status : 'pending'
            }).populate('sender', 'name')

            console.log('req recieved to this users : ', reqSenders);
            
            // check if user has any freind req , if not return
            if(reqSenders.length === 0){
                return res.status(200).json({
                    success : false,
                    msg : 'You dont Have any req'
                })
            };

            const reqSenderNames = reqSenders.map(user => user.sender?.name)


            return res.status(200).json({msg : 'fetched req from db', data : reqSenderNames, success : true})

        } catch (err) {
            console.log('error in req showing function : ', err);
            return res.status(500).json({msg : 'Internel Server Error', success : false})
        }
    };

     async acceptReq(req, res){
        // identify which user to accept by sending id of that user from frontend;
        // aaran req accept cheyunnath === accepter,
        // aareyan accept cheyunnath === acceptee
        const { acceptee } = req.body;
        const accepter = req.body.accepter || req.user?._id;
        
        if(!acceptee || !accepter){
            return res.status(400).json({
                msg : 'please try again or refresh the page',
                success : false
            });
        };
        try {


            // go to frendReq collection and change the status to accepted 
            const changeStatus = await friendRequestModal.findOneAndUpdate({
                sender : acceptee,
                reciever : accepter
            }, {
                $set : {
                    status : 'accepted'
                }
            }, {new : true});
            
            // check its updated 
            if(changeStatus.status !== 'accepted'){
                return res.status(400).json({
                    msg : 'somthing went wrong, please try again',
                    success : false
                })
            };

            // then add the accepted user to freind list of accepting user

            const addUserToFriendList = await userModal.bulkWrite([
                {
                    updateOne : {
                        filter : {_id : accepter},
                        update : {$addToSet : {friends : acceptee}}
                    },
                },
                {
                    updateOne : {
                        filter : {_id : acceptee},
                        update : {$addToSet : {friends : accepter}}
                    }
                }
            ])
            // also add accepter id in the acceptee friend 

            return res.status(200).json({msg : 'req accepted', data : changeStatus})
        } catch (err) {
            console.log('error in acceptReq : ', err);
            return res.status(500).json({msg : 'Internal Server Error', success : false})
        }
     };

     async rejectReq(req, res){
            const { rejectee }  = req.body;
            const rejecter = req.user?._id || req.body.rejecter;
            if(!rejectee || !rejecter){
                return res.status(401).json({
                    msg : "got undefined ID's",
                    success : false
                })
            };

            try {               
                // find the rejecter recievedReq in friendReq modal
                // change status to rejected in friend request modal of in recievers  view
                const updateStatus = await friendRequestModal.findOneAndUpdate({
                    sender : rejectee,
                    reciever : rejecter,
                    status : 'pending'
                }, {
                    $set : {
                        status : "rejected"
                    }
                }, {new : true});
    
                if(!updateStatus){
                    return res.status(400).json({
                        msg : 'operation failed, please try again after some time',
                        success : false
                    })
                };
    
                return res.status(200).json({
                    msg : 'req rejected',
                    success : true
                })
            } catch (err) {
                console.log('error occured in req rejection function : ', err);
                return res.status(500).json({
                    msg : 'Internal Server Error' || err.message,
                    success  : false
                })
            }

     }
};

export default new FriendRequest();
