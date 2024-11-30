const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

const io = new Server();
const app = express();

app.use(bodyParser.json());

io.on("connection", (socket) => {

})

app.listen(8000, () => console.log("HTTP server is running on PORT 8000!"))