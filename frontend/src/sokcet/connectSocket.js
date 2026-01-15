import {io} from 'socket.io-client';
import { uri } from '../utils/axiosInstance.utils';

let socket = null;

export const connectSocket = (res) => {
    if(res.status === 200){
        if(!socket){
            socket = io(uri, {
               withCredentials : true
            });
            console.log('connected socket : ', socket.id);
        };
    }
};


export const disconnectSocket = () => {
    if(socket){
        socket.disconnect();
    }
    socket = null;
    console.log('socket disconnected');
}