import { Server  } from "socket.io";
import { createServer } from 'http'
import app from "./app.js";
import { addUserToParticipants } from "./service/messages.controller.js";


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

io.on('connection', (socket) => {
    console.log('a user connected  : ', socket.id );

    socket.on('send-msg', async (data) => {
        try {    
            const {howIsSending, foWhomToSending, text} = data
            const participants = await addUserToParticipants(howIsSending, foWhomToSending);
            // console.log(participants)
        } catch (err) {
            socket.emit('error-msg', err.message);
            return;
        }
    })


    socket.on('disconnect', () => {
        console.log('a user disconnected : ', socket.id)
    });

});

httpServer.listen(port , (err) => {
   if(err) return console.log('error in listen func', err);
   else{
  console.log('app is running on port ', port);
}
})
