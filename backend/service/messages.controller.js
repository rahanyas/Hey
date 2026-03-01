import conversationModal from "../models/conversation.modal.js";
import msgModal from "../models/Message.modal.js";

 const addUserToParticipants = async (sender, reciever) => {
   
    if(!sender || !reciever){
        throw new Error('missing user IDs');
    }
           
    let conversation = await conversationModal.findOne(
        {
            participants : {
                $all : [sender, reciever]
            }
        }
    );

    if(!conversation){
        conversation = new conversationModal({
            participants : [sender, reciever]
        });

        await conversation.save()
    }

    // const createNewMsgForNewParticipants = 
    return conversation
};

export const addMsgToSchema = async (sender, reciever, text) => {
    const conversation = await addUserToParticipants(sender, reciever);
    
    const message = await  msgModal.create({
        conversationId : conversation._id,
        sender: sender,
        text : text,
    })
    return message;
};
 
export const fetchMessages = async (req, res) => {

    const whoWantToSee = req.user?.id;
    const {otherUserId} = req.params;
    

    if(!whoWantToSee){
        return res.status(401).json({
            success : false,
            msg : 'Not Authorized'
        })
    };

    try {
        const isParticipants = await addUserToParticipants( whoWantToSee ,otherUserId);
        
        const messages = await msgModal.find({
            conversationId : isParticipants._id
        }).select('text sender isDeleted');

        if(!isParticipants || !messages){
            return res.status(200).json({
                success : true,
                msg : 'start Messaging'
            })
        }
     
        return res.status(200).json({
            success : true,
            data : messages
        })
       
    } catch (error) {
        console.log('error in fetch user message function : ', error);
        return res.status(500).json({
            success : false,
            msg : 'Internal Server Error'
        })
    }
};

export const deleteMsg = async (userId, msgId) => {
     const message = await msgModal.findById(msgId);

     if(!message){
        throw new Error('message not found')
     };

     if(message.sender.toString() !== userId){
        throw new Error('not Allowed to delete this Message')
     }

     message.isDeleted = true;
     await message.save();
}