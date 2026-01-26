import { socket } from "./connectSocket";
import { addErrorMsg } from "../features/user/userSlice.js";
import { store } from "../app/store.js";
import { addMessageToState } from "../features/messages/msgServices.js";

// cant use usedispatch hooks here cause its not react compo
// but how to add anything to store => import the store , import the function , call it like given in below

export const sendMsg = (data) => {
    if(!socket) return ;
    socket.emit('send-msg', data)
};

export const registerSocketListeners = () => {
    if(!socket) return;

    socket.off('recieve-msg');
    socket.off('error-msg');

    socket.on('recieve-msg', (msg) => {
        store.dispatch(addMessageToState(msg))
    });

    socket.on('error-msg', (err) => {
        store.dispatch(addErrorMsg(err))
    })
}