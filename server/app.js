const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors")
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  // add
});

httpServer.listen(3000);
