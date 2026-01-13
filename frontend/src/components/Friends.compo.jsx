
import { useNavigate } from "react-router-dom";

const Friends = ({friends}) => {
    const navigate = useNavigate();
    
    const openChat = (user) => {
        navigate('/chat', {
            state : {
                user : user
            }
        })
    }

    return (
    <>
        {friends.map(user => (
            <div 
            className="friend-item" 
            key={user._id}
            onClick={() => openChat(user)}
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