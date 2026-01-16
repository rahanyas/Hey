import {io} from 'socket.io-client';
import { uri } from '../utils/axiosInstance.utils';

export let socket ;

export const connectSocket = () => {
        if(!socket){
            socket = io(uri, {
               withCredentials : true
            });
        };
};


export const disconnectSocket = () => {
    if(socket){
        socket.disconnect();
    }
    socket = null;
    console.log('socket disconnected');
}

