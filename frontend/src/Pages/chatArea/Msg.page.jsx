import { useLocation } from "react-router-dom";

const Message = () => {
    const {state} = useLocation();
    const userId = state?.userId
    return (
        <h1>lets chat {userId}</h1>
    )
};

export default Message;

