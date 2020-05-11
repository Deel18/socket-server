const express = require('express');
const app = express();
const cors = require('cors');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Chat db
const chatDb = require("./data/db.js");
const url = 'mongodb://localhost:27017/chat';
const port = 9002;


io.origins(['https://deel-ramverk.me:443', 'localhost:3000']);

io.on('connection', socket => {
    console.info("User connected");

    chatDb.getColl(url, 'messages')
    .then(res => io.emit('allMsgs', res))
    .catch(err => console.log(err))

    //io.emit("recChatMsg", user);

    socket.on("userJoined", (msg) => {
        chatDb.insertMsg(url, "messages", msg)
        io.emit("recChatMsg", msg)
        console.log(msg)
    })

    io.on("disconnect", socket => {
        console.info("Disconnected");
    })

    socket.on("sendMsg", (msg) => {
        chatDb.insertMsg(url, "messages", msg)
        io.emit("recChatMsg", msg)
        console.info(msg)
    })

});

server.listen(port);
console.log("Server is listening on port: " + port)
