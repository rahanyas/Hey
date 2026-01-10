import { FaPaperPlane } from "react-icons/fa";
import { useSelector }  from 'react-redux'
import './msg.style.scss'

const Message = () => {
  
    const {id} = useSelector((state) => state.user)

  // dummy UI messages
  const messages = [
    { id: 1, text: "Hey 👋", type: "received" },
    { id: 2, text: "Hi, how are you?", type: "sent" },
    { id: 3, text: "I'm good, working on the chat UI.", type: "received" },
    { id: 4, text: "Nice 😄 looks modern!", type: "sent" },
  ];

  return (
    <div className="chat-wrapper">
      {/* Header */}
      <div className="chat-header">
        <div className="avatar">{id?.[0]?.toUpperCase() || "U"}</div>
        <div className="user-info">
          <h4>{id || "User"}</h4>
          <span>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`msg ${msg.type}`}>
            <p>{msg.text}</p>
            <span className="time">10:45 PM</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input type="text" placeholder="Type a message..." />
        <button>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Message;
