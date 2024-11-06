const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const UserController = require("./controller/userController")
const errorHandler = require("./middlewares/errorHandler")
const app = express()

// Deklarasi games sebagai objek kosong
const games = {}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.post("/login", UserController.login)
app.post("/createOrJoinGame", GameController.createOrJoinGame)

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  // add
  socket.on("createOrJoinGame", ({ gameId, username }) => {
    if (!games[gameId]) {
      // Bikin room baru
      games[gameId] = {
        players: [{ id: socket.id, username, choice: null }],
        status: "waiting",
      }
      socket.join(gameId)
      socket.emit("gameCreated", { gameId, status: "waiting" })
    } else if (games[gameId].players.length === 1) {
      // Gabung ke room yang udah ada
      games[gameId].players.push({ id: socket.id, username, choice: null })
      games[gameId].status = "ready"
      socket.join(gameId)
      io.to(gameId).emit("gameReady", games[gameId])
    } else {
      socket.emit("gameFull", "Game ini sudah penuh")
    }
  })

  // Handler buat milih "batu", "gunting", atau "kertas"
  socket.on("makeChoice", ({ gameId, choice }) => {
    const game = games[gameId]
    if (game && game.status === "ready") {
      const player = game.players.find((p) => p.id === socket.id)
      if (player) player.choice = choice

      // memeriksa player apakah sudah memilih
      const allChosen = game.players.every((p) => p.choice !== null)
      if (allChosen) {
        const [p1, p2] = game.players
        const result = determineWinner(p1.choice, p2.choice)

        io.to(gameId).emit("gameResult", { players: game.players, result }) // memberitahukan hasil kepada semua player di room
        game.players.forEach((p) => (p.choice = null)) // Reset pilihan untuk game selanjutnya tanpa perlu membuat room lagi
      }
    }
  })

  // misal player terputus dari game
  socket.on("disconnect", () => {
    for (const gameId in games) {
      const game = games[gameId]
      if (game) {
        game.players = game.players.filter((p) => p.id !== socket.id)
        if (game.players.length === 0) delete games[gameId] // jika tidak ada player di room sama sekali, maka room akan dihapus
        else io.to(gameId).emit("playerLeft", { gameId, players: game.players }) // memberitahukan kepada player yang tersisa di room
      }
    }
  })
})

// logic untuk menang, seri, atau kalah. hasil dari sini dikirim ke emit gameresult
function determineWinner(choice1, choice2) {
  if (choice1 === choice2) return "draw"
  if (
    (choice1 === "batu" && choice2 === "gunting") ||
    (choice1 === "gunting" && choice2 === "kertas") ||
    (choice1 === "kertas" && choice2 === "batu")
  ) return "player1"
  return "player2"
}

app.use(errorHandler)

httpServer.listen(3000)
