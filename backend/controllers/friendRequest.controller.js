
import friendRequestModal from "../models/friendRequest.modal.js";
import userModal from "../models/user.modal.js";

class FriendRequest{
    
     async searchFriends(req, res){
        // get his id from frontend 
        const {userToFind} = req.query;
        const whoIsSearching = req?.user?.id// it is the user id (who is me) go to db and find the user and if the search eqaul to his name dont send this user , when this happen instead of adding send req btn , add show profile in frontend 
        

        if(!userToFind){
            return res.status(400).json({msg : "usertofind is undefined", success : false})
        }

        try {
            // find he is in user collection
            const user = await userModal.find({ 
            name : {
                $regex : userToFind, 
                $options : 'i',
            },
            _id : {
                 $ne : whoIsSearching
            }
        }).select('name profilePic friends');
            
            // if not return no user found msg;
            if(user.length === 0){
                return res.status(200).json({success : true, msg : 'user not found'});
            };

            //check if anyone in the list is already a friend of his , if anyone is just add key in data like relation

           const requests = await friendRequestModal.find({
            $or : [
                {sender : whoIsSearching},
                {reciever : whoIsSearching}
            ]
           })

           //makig response with relation
           const formatedUsers = user.map(user => {
            let relation = 'none';

            const isFriend = user?.friends?.some(f => {
              return f?.toString() === whoIsSearching
            });

            if(isFriend){
                relation = 'friends'
            };

           const req = requests.find(r =>
                (r.sender.toString() === whoIsSearching &&
                r.reciever.toString() === user._id.toString()) ||
                (r.sender.toString() === user._id.toString() &&
                r.reciever.toString() === whoIsSearching)
            );

            if (req) {
                if (req.sender.toString() === whoIsSearching) {
                 relation = "request_sent";
                } else {
                 relation = "request_recieved";
                }
            };

            return {
                _id: user._id,
                name: user.name,
                profilePic: user.profilePic,
                relation
           };

           })


            // if he is in send the user to frontend so the user name can display as search result
            return res.status(200).json({success : true, data : formatedUsers || []});

        } catch (err) {
            console.log('error in searchFriends : ', err);
            return res.status(500).json({success : false, msg : 'Internel Server Error'});
        }
     }

     async sendRequest(req, res){
            const {recieverId} = req.query;
            const senderId = req.user?.id 
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
                    return res.status(200).json({
                        success : false, 
                        msg : 'already in friend list',
                        alreadyFriends : true
                    })
                };

                //check already has sended frend req //

                const isAlreadyRequested = await friendRequestModal.findOne({
                   $or : [
                    { sender : senderId, reciever : recieverId},
                    {sender : recieverId , reciever : senderId},
                   ],
                  
                });

                if(isAlreadyRequested){
                    return res.status(200).json({
                        msg : 'already has a sended req',
                        success : false,
                        alreadyRequested : true
                    })
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
        const  viewer  = req.user?.id;
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

        const reqSenderNames = reqSenders.map(user => 
             {
               return {
                name : user.sender?.name, 
                id : user?.sender?._id,
                profilePic : user?.profilePic || ''
               }
             })


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
        const accepter =  req.user?.id;
        
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
            if(changeStatus?.status !== 'accepted'){
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

     async showFreinds(req, res){
            const user = req.user?.id;
            if(!user){
                console.log('user id is undefined')
                return ;
            };

            try {
                const friends = await userModal.findOne({
                    _id : user
                }).select('friends').populate('friends', 'name , profilePic');
                if(!friends){
                    return res.status(200).json({
                        success : true,
                        haveFriends : false
                    })
                };

                return res.status(200).json({
                    success : true,
                    haveFriends : true,
                    data : friends || []
                })
            } catch (err) {
                console.log('error in ahowFriends func : ', err);
                return res.status(500).json({
                    success : false,
                    msg : 'Internal Server Error'
                })
            }
     }

     async rejectReq(req, res){
            const { rejectee }  = req.body;
            const rejecter = req.user?.id
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
