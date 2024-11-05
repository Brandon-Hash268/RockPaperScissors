const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const UserController = require("./controller/userController");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/login", UserController.login);
// app.post("/createOrJoinGame", GameController.createOrJoinGame);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // add
});

app.use(errorHandler)

httpServer.listen(3000);
