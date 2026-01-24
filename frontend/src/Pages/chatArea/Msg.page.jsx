import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { recieveMsg, sendMsg } from "../../sokcet/socketEvents";
import { addMessageToState } from "../../features/messages/msgServices";
import "./msg.style.scss";

const Message = () => {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  const location = useLocation();
  const { _id: otherUserId, name } = location.state.user;

  const { id: myUserId } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.msg);

  

  function handleSubmit() {
    if (!text.trim()) return;

    sendMsg({
      text,
      sender: myUserId,
      reciever: otherUserId,
    });


  recieveMsg({
    _id : Date.now(),
    text, 
    sender : myUserId, 
    reciever : otherUserId
  })

    setText("");
  }



  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-wrapper">
      {/* HEADER */}
      <div className="chat-header">
        <div className="avatar">{name?.[0]?.toUpperCase() || "U"}</div>
        <div className="user-info">
          <h4>{name || "User"}</h4>
          <span>Online</span>
        </div>
      </div>

      {/* BODY */}
      <div className="chat-body">
        {messages.length === 0 ? (
          <div className="no-msg-box">
            <h2 className="no-msg-txt">no messages</h2>
          </div>
        ) : (
          messages.map((msg) => {
            const isMine = msg.sender === myUserId;

            return (
              <div
                key={msg._id}
                className={`msg ${isMine ? "sent" : "received"}`}
              >
                <p>{msg.text}</p>
                <span className="time">
                  {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button onClick={handleSubmit} disabled={!text.trim()}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Message;
