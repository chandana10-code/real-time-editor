const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/realtime_editor")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Document = require("./models/Document");

io.on("connection", socket => {
  console.log("User connected");

  socket.on("join-document", docId => {
    socket.join(docId);

    socket.on("send-changes", data => {
      socket.to(docId).emit("receive-changes", data);
    });

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(docId, { content: data });
    });
  });
});

app.use("/documents", require("./routes/document"));

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
