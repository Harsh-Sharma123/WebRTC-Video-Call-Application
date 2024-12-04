const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

const io = new Server({
    cors: true
});
const app = express();

app.use(bodyParser.json());

const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

io.on("connection", (socket) => {
    socket.on("join-room", data => {
        const { roomId, emailId } = data;
        emailToSocketMapping.set(emailId, socket.id);
        socketToEmailMapping.set(socket.id, emailId);
        socket.join(roomId);
        console.log(socket.id);
        socket.emit("joined-room", { roomId })
        socket.broadcast.to(roomId).emit("user-joined", { emailId });
    })

    socket.on("call-user", data => {
        const { emailId, offer } = data;
        console.log(socket.id);
        console.log("Calling User : ", emailId);
        const fromEmail = socketToEmailMapping.get(socket.id);
        console.log("From Email : ", fromEmail)
        const socketId = emailToSocketMapping.get(emailId);
        socket.to(socketId).emit('incoming-call', { fromEmail: fromEmail, offer: offer })
    })

    socket.on("call-accepted", data => {
        const { from, ans } = data;
        const socketId = emailToSocketMapping.get(from);
        socket.to(socketId).emit("call-accepted", { ans })
    })
})

app.listen(8000, () => console.log("HTTP server is running on PORT 8000!"))
io.listen(8001);



