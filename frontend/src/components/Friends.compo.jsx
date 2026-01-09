
import { useNavigate } from "react-router-dom";
const Friends = ({friends}) => {

    const navigate = useNavigate();
    
    const openChat = (userId) => {
        if(!userId) return;
        navigate('/chat', {
            state : {userId}
        })
    }

    return (
    <>
        {friends.map(user => (
            <div 
            className="friend-item" 
            key={user._id}
            onClick={() => openChat(user?._id)}
            >
            <span className="avatar">
                <img src={user.profilePic} alt='' />
            </span>
            <h3>{user.name}</h3>
            </div>
        ))}
    </>
    )
};

export default Friends