"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));
//run client connection
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log("joinRoom:", room);
  });
  socket.on("username", (username) => {
    console.log("username:", username);
    io.emit("username", username);
  });

  socket.on("chat message", (msg) => {
    console.log("message: ", msg);
    io.emit("chat message", msg);
  });
});

http.listen("10.114.32.7", () => {
  console.log("listening on port 3000");
});
