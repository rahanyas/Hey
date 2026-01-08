import { useCallback, useState } from "react";
import server from "../utils/axiosInstance.utils";

const SearchResutls = ({result}) => {

    const [requestState, setRequestState] = useState({});

    const sendReq = useCallback(async (userId) => {
        try {

            setRequestState((prev) => ({
               ...prev,
               [userId] : 'sending'
             }));

           const res = await server.post(`feature/sendReq?recieverId=${userId}`);
           console.log('res from send req : ', res)

            if(res?.data?.alreadyRequested === true){
                setRequestState(prev => ({
                    ...prev, 
                    [userId] : 'already requested'
                }))
            }
             
           if(res?.data?.success){
            setRequestState(prev => ({
                ...prev,
                [userId] : 'sent'
            }))
           };

        //    problem to solve ?
        //    when user search a user and sented a req to him , what if he is already in friend list or he is already requested him backend is done , now do the ui part

        } catch (err) {
           console.log('error in send req function : ', err);
           setRequestState(prev => ({
            ...prev,
            [userId] : 'idle'
           }))
        }
    },[]);

    const getButtonConfig = (user, tempState) => {
        if(tempState === 'sending'){
            return {text : 'sending...', disabled : true}
        };
        if(tempState === 'already requested'){
            return {text : 'already requested', disabled : true}
        };

        if(tempState === 'sent'){
            return {text : 'req sended', disabled : true}
        }

        switch(user.relation){
            case "friends" : 
              return {
                text : 'freinds', 
                disabled : true
            };
            
            case 'already requested':
                return {
                    text : 'requested', 
                    disabled : true
                };
        
            case 'accept request': 
                return {
                    text : 'accept request', 
                    disabled: true
                };
            
            default:
                return {
                    text : 'send request', 
                    disabled : false
                }
        }
    }

    return(
        <div className='search-results'>
            {
                result.map((user) => {
                const tempState = requestState[user._id] || 'idle';
                const btn = getButtonConfig(user, tempState)
        return(
            <div key={user?._id}>
                {/* for displaying user profile and name */}
               <figure>
                <img src={user?.profilePic || '#'} alt="user-img" />
                <h3>{user?.name}</h3>
               </figure>
               {/* btn for sending req */}
                <button
                disabled = {btn.disabled}
                onClick={() => sendReq(user?._id)}>
                    {user?.relation ? user?.relation : btn.text }
                </button>
            </div>
                )
             })}
        </div>            
    )
};

export default SearchResutls;