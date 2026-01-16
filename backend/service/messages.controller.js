import conversationModal from "../models/conversation.modal.js";

export const addUserToParticipants = async (user_1_id, user_2_id) => {
   
    if(!user_1_id || !user_2_id){
        throw new Error('missing user IDs');
    }
           
    const isExisting = await conversationModal.findOne(
        {
            participants : {
                $all : [user_1_id, user_2_id]
            }
        }
    );

    if(isExisting) return  isExisting;

    const newParticipants = new conversationModal({
        participants : [user_1_id, user_2_id]
    });

    await newParticipants.save()

    // console.log('new participants : ', newParticipants);

    if(!newParticipants){
        throw new Error('')
    }
    
    return newParticipants
}