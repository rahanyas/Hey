
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getMessages } from "../features/messages/msgServices.js";

// const Friends = ({friends}) => {
    
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
    
//     const openChat = (user) => {
//         navigate('/chat', {
//             state : {
//                 user : user
//             }
//         });
        
//     }
//     return (
//     <>
//         {friends.map(user => (
//             <div 
//             className="friend-item" 
//             key={user._id}
//             onClick={() => {openChat(user), 
//         dispatch(getMessages(user._id))}}
//             >
//             <span className="avatar">
//                 <img src={user?.profilePic} alt='' />
//             </span>
//             <h3>{user.name}</h3>
//             </div>
//         ))}
//     </>
//     )
// };

// export default Friends

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMessages } from "../features/messages/msgServices.js";

const Friends = ({ friends }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openChat = (user) => {
        navigate('/chat', {
            state: { user }
        });
    };

    return (
        <div className="hm-friends-list">
            {friends.map(user => (
                <div
                    className="hm-friend-card"
                    key={user._id}
                    onClick={() => {
                        openChat(user);
                        dispatch(getMessages(user._id));
                    }}
                >
                    {/* Avatar */}
                    <div className="hm-friend-avatar">
                        {user?.profilePic
                            ? <img src={user.profilePic} alt={user.name} />
                            : <span className="hm-friend-avatar__fallback">
                                {user.name?.charAt(0).toUpperCase()}
                              </span>
                        }
                        <span className="hm-friend-status" />
                    </div>

                    {/* Info */}
                    <div className="hm-friend-info">
                        <h3 className="hm-friend-name">{user.name}</h3>
                        <p className="hm-friend-sub">Tap to open chat</p>
                    </div>

                    {/* Arrow */}
                    <span className="hm-friend-arrow">›</span>
                </div>
            ))}
        </div>
    );
};

export default Friends;