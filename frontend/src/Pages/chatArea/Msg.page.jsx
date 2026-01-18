import { FaPaperPlane } from "react-icons/fa";
import { useSelector }  from 'react-redux'
import { useLocation } from "react-router-dom";
import {  useState } from "react";
import { sendMsg } from "../../sokcet/socketEvents";
import './msg.style.scss'

const Message = () => {
  
    const location = useLocation();
    const {_id, name} = location.state.user // user id is passed through navigate and fetched from here to know which user msg has to display

    const {id} = useSelector(state => state.user)

  // dummy UI messages

  const [messages, setMessages] = useState([
    { id: 1, text: "Hey 👋", type: "received" },
    { id: 2, text: "Hi, how are you?", type: "sent" },
    { id: 3, text: "I'm good, working on the chat UI.", type: "received" },
    { id: 4, text: "Nice 😄 looks modern!", type: "sent" },
  ])

  const [text, setText] = useState('');

  function handleSubmit(){
    if(!text.trim()) return;
     setMessages(prev => (
           [
            ...prev,
            {
              id : Date.now(),
              text,
              type : 'sent'
            }
           ]
     ));
     sendMsg({text, reciever : _id, sender : id});
     setText('')
  }



  return (
    <div className="chat-wrapper">
      {/* Header */}
      <div className="chat-header">
        <div className="avatar">{name[0].toUpperCase() || "U"}</div>
        <div className="user-info">
          <h4>{name || "User"}</h4>
          <span>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-body">
        {messages.length === 0 ? (
          <div className="no-msg-box">
            <h2 className="no-msg-txt">no messages</h2>
          </div>
        ) : messages.map((msg) => (
          <div key={msg.id} className={`msg ${msg.type}`}>
            <p>{msg.text}</p>
            <span className="time">10:45 PM</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input 
        type="text"
        placeholder="Type a message..." 
        value={text}
        onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={!text.trim()}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Message;
