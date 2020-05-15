const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router')
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;


io.on('connect',(socket)=>{
    console.log("We have a new connection!")

    socket.on('disconnect',()=>{
        socket.disconnect();
        console.log("User left");

    })

    socket.on('input',function(msg,callback){
        if(msg !== ''){
            io.emit('output',msg);
        }

        callback();
    })
});

app.use(cors());
app.use(router);

server.listen(PORT,()=>{
    console.log("Server started at "+PORT);
})

