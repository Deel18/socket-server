const express = require('express');
const app = express();
const cors = require('cors');

const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.origins(['https://deel-ramverk.me:443']);

io.on('connection', socket => {
    console.info("User connected");
    console.info(socket.id)
    let username = "Anonymous" + Math.floor((Math.random() * 100) + 1);
    let user = {
        time: new Date().toLocaleTimeString(),
        username: username,
        msg: username + " has joined the chat!"
    }

    io.emit("recChatMsg", user);

    io.on("disconnect", socket => {
        console.info("Disconnected");
    })

    socket.on("sendMsg", (msg) => {
        io.emit("recChatMsg", msg)
        console.info(msg)
    })

});

server.listen(9002);
