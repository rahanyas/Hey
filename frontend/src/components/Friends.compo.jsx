
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMessages } from "../features/messages/msgServices.js";

const Friends = ({friends}) => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const openChat = (user) => {
        navigate('/chat', {
            state : {
                user : user
            }
        });
        
    }
    return (
    <>
        {friends.map(user => (
            <div 
            className="friend-item" 
            key={user._id}
            onClick={() => {openChat(user), 
        dispatch(getMessages(user._id))}}
            >
            <span className="avatar">
                <img src={user?.profilePic} alt='' />
            </span>
            <h3>{user.name}</h3>
            </div>
        ))}
    </>
    )
};

export default Friends