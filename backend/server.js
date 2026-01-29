import { Server  } from "socket.io";
import { createServer } from 'http'
import app from "./app.js";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import { 
    addMsgToSchema,
    deleteMsg
} 
from "./service/messages.controller.js";

let uri = process.env.NODE_ENV === 'development' ? process.env.DEV_URI : process.env.PROD_URI;

const port = process.env.PORT ;

if(!port || port === undefined){ 
 console.log('port is undefined')
};

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors : {
        origin : [uri],
        credentials : true
    }
});

// created middleware to check authenitcated user
io.use((socket, next) => {
    try {
        // socket does not automatically parse cookies , we have we to do that
        cookieParser()(socket.request, {}, () => {
            const token = socket.request.cookies.token;
    
            if(!token){
                return next(new Error('No Token'));
            };
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            if(!decoded){
                return next(new Error('Decoding Failed'))
            };
    
            socket.user = {
                id : decoded.id,
            };
    
            next()
        });
    } catch (err) {
        console.log('error in socket middleware : ', err);
        next(new Error('Authentication Failed'));
    }
})



io.on('connection', (socket) => {
    const userId = socket.user?.id
    console.log('connected  user : ', userId);
    socket.join(userId);
    
    socket.on('send-msg', async (data) => {
        try {    
            const {reciever, text} = data;
            if(!reciever || !text.trim()) return;
            const message = await addMsgToSchema(userId, reciever, text);
            io.to(reciever).emit('recieve-msg', message);
            io.to(userId).emit('recieve-msg', message);
        } catch (err) {
            socket.emit('error-msg', err.message);
            console.log('error : ', err)
            return;
        }
    });

    socket.on('delete-msg', async (data) => {
        try {
            const {msgId, reciever} = data
            await deleteMsg(userId, msgId);
            io.to(reciever).emit('msg-deleted', msgId);
            io.to(userId).emit('msg-deleted', msgId)
        } catch (err) {
            console.log('error in delete-msg socket in server : ', err);
            socket.emit('error-msg', err.message)
        }
    })


    socket.on('disconnect', () => {
        console.log('a user disconnected : ', socket.user.id)
    });

});



httpServer.listen(port , (err) => {
   if(err) return console.log('error in listen func', err);
   else{
  console.log('app is running on port ', port);
}
})
