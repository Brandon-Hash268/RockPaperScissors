import { useEffect, useState } from "react";
import { socket } from "../socket";
import rock from "../assets/rock.png";
import scissors from "../assets/scissors.png";
import paper from "../assets/paper.png";

export function BattleArea() {
  const [playerStatus, setPlayerStatus] = useState("");
  const [player, setPlayer] = useState("");
  const [move, setMove] = useState("");
  const [opponentMove, setOpponentMove] = useState("");
  const [result, setResult] = useState("");
  const [waitingMessage, setWaitingMessage] = useState(
    "Waiting for an opponent..."
  );
  const userId = localStorage.getItem("id");

  useEffect(() => {
    // Join the game and listen to various events
    socket.emit("joinGame", userId);

    socket.on("playerStatus", (message) => {
      setPlayerStatus(message);
      if (message === "Another Player has joined") {
        setWaitingMessage("");
      }
    });

    socket.on("player", (player) => {
      setPlayer(player);
    });

    socket.on("opponentMove", (move) => {
      setOpponentMove(move);
    });

    socket.on("resultGame", (result) => {
      setResult(result);
      setWaitingMessage("");
    });

    socket.on("waiting", (message) => {
      setWaitingMessage(message);
    });

    return () => {
      socket.off("playerStatus");
      socket.off("player");
      socket.off("opponentMove");
      socket.off("resultGame");
      socket.off("waiting");
    };
  }, []);

  const handleMove = (move) => {
    setMove(move);
    socket.emit("playerMove", { move, userId });
  };

  return (
    <div>
      <h2 style={{ color: "white" }}>{waitingMessage}</h2>

      {result ? (
        <h1 style={{ color: "white" }}>Result: {result}</h1>
      ) : (
        <div
          className="d-flex justify-content-between"
          style={{ overflow: "hidden" }}
        >
          {/* Left side: Current player (Player 1 if userId is player1) */}
          <div
            className="d-flex align-items-center"
            style={{
              height: "100vh",
              transform: "rotate(90deg)",
            }}
          >
            <img
              style={{ width: "100px", cursor: "pointer" }}
              src={rock}
              alt="Rock"
              onClick={() => handleMove("rock")}
            />
            <img
              style={{ width: "100px", cursor: "pointer" }}
              src={paper}
              alt="Paper"
              onClick={() => handleMove("paper")}
            />
            <img
              style={{ width: "100px", cursor: "pointer" }}
              src={scissors}
              alt="Scissors"
              onClick={() => handleMove("scissors")}
            />
          </div>

          {/* Control Panel: Show both moves when ready */}
          <div className="d-flex align-items-center mb-4 gap-2">
            <h3 style={{ color: "white" }}>Your Move: {move}</h3>
            <h3 style={{ color: "white" }}>
              Opponent's Move: {opponentMove || "Waiting..."}
            </h3>
          </div>

          {/* Right side: Opponent (Player 2) */}
          <div
            className="d-flex align-items-center"
            style={{
              height: "100vh",
              transform: "rotate(270deg)",
            }}
          >
            <img style={{ width: "100px" }} src={rock} alt="Rock" />
            <img style={{ width: "100px" }} src={paper} alt="Paper" />
            <img style={{ width: "100px" }} src={scissors} alt="Scissors" />
          </div>
        </div>
      )}
    </div>
  );
}
