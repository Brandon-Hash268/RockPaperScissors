const { GameSession, User } = require("./models");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const UserController = require("./controller/userController");
const errorHandler = require("./middlewares/errorHandler");
const { Op } = require("sequelize");
const calculateResult = require("./helpers/calculateResult");
const gamesession = require("./models/gamesession");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/login", UserController.login);
app.get("/users/:id", UserController.getUser);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let gameSession = {};

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("joinGame", async (userId) => {
    gameSession = await GameSession.findOne({
      where: { PlayerId1: { [Op.ne]: null }, PlayerId2: null },
    });
    if (!gameSession) {
      gameSession = await GameSession.create({ PlayerId1: userId });
      socket.emit("player", "Player 1");
      io.emit("playerStatus", "Waiting for Other Player");
      await gameSession.save();
    } else {
      if (userId != gameSession.PlayerId1) {
        await gameSession.update({ PlayerId2: Number(userId) });
        io.emit("playerStatus", "Another Player has joined");
        socket.emit("player", "Player 2");
        await gameSession.save();
      } else {
        socket.emit("player", "Player 1");
        console.log("denieddddddddddddddd");
      }
    }
    console.log(gameSession);
  });

  socket.on("playerMove", async ({ move, userId }) => {
    // console.log(move, "MOVEEEEEEEEE");

    if (gameSession.PlayerId1 == userId) {
      await gameSession.update({ PlayerMove1: move });
      await gameSession.save();
    } else {
      await gameSession.update({ PlayerMove2: move });
      await gameSession.save();
    }

    // Check if both players have made their moves
    if (gameSession.PlayerMove1 && gameSession.PlayerMove2) {
      const result = calculateResult(
        gameSession.PlayerMove1,
        gameSession.PlayerMove2
      );
      await gameSession.update({ result: result });
      await gameSession.save();

      if (result == "Player 1 wins!") {
        console.log(gameSession.PlayerId1, "PLAYERRR ID");

        await User.increment("win", {
          by: 1,
          where: { id: gameSession.PlayerId1 },
        });
        await User.increment("lose", {
          by: 1,
          where: { id: gameSession.PlayerId2 },
        });
      } else if (result == "Player 2 wins!") {
        await User.increment("win", {
          by: 1,
          where: { id: gameSession.PlayerId2 },
        });
        await User.increment("lose", {
          by: 1,
          where: { id: gameSession.PlayerId1 },
        });
      }

      io.emit("resultGame", result); // Changed from socket.emit to io.emit for both players
      io.emit("moves", {
        move1: gameSession.PlayerMove1,
        move2: gameSession.PlayerMove2,
      });
      // console.log(gameSession.id, "SESIONNNNNNNNNN");
      // try {
      //   await GameSession.destroy({ where: { id: gameSession.id } });
      //   console.log("success!!!");
      // } catch (error) {
      //   console.log("🚀 ~ socket.on ~ error:", error);
      // }
      gameSession.PlayerId1 = null;
      gameSession = null;
    } else {
      socket.broadcast.emit("waiting", "Another Player has chosen their move");
    }
  });
  console.log(gameSession);
  socket.on("disconnect", async () => {
    if (gameSession) {
      gameSession.PlayerId1 = null;
    }
    //update player state on database
  });
});

app.use(errorHandler);

httpServer.listen(3000);
