const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

const io = new Server({
    cors: true
});
const app = express();

app.use(bodyParser.json());

const emailToSocketMapping = new Map();

io.on("connection", (socket) => {
    socket.on("join-room", data => {
        const { roomId, emailId } = data;
        emailToSocketMapping.set(emailId, socket.id);
        socket.join(roomId);
        socket.emit("joined-room", { roomId })
        socket.broadcast.to(roomId).emit("user-joined", { emailId });
        console.log("Emitting Broadcast!!")
    })

    socket.on("call-user", data => {
        const { emailId, offer } = data;
        const socketId = emailToSocketMapping.get(emailId);
    })
})

app.listen(8000, () => console.log("HTTP server is running on PORT 8000!"))
io.listen(8001);



