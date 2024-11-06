import { useEffect, useState } from "react";
import { socket } from "../socket";
import rock from "../assets/rock.png";
import scissors from "../assets/scissors.png";
import paper from "../assets/paper.png";
import "./BattleArea.css";
import { useNavigate } from "react-router-dom";

export function BattleArea() {
  const [playerStatus, setPlayerStatus] = useState("");
  const [player, setPlayer] = useState("");
  const [move, setMove] = useState("");
  const [opponentMove, setOpponentMove] = useState("");
  const [result, setResult] = useState("");
  const [waitingMessage, setWaitingMessage] = useState(
    "Waiting for an opponent..."
  );
  const [bothMove, setBothMove] = useState("");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

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
    //   console.log(player);
      setPlayer(player);
    });

    socket.on("opponentMove", (move) => {
      setOpponentMove(move);
    });

    socket.on("resultGame", (result) => {
        setResult(result);
    });

    socket.on("waiting", (message) => {
      setWaitingMessage(message);
    });

    socket.on("moves", (moves) => {
      setBothMove(moves);
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

  const handleExit = () => {
    socket.emit("exitGame", userId); // Notify server to exit game room
    navigate("/"); // Redirect to home page
  };

  return (
    <div>
      {!result && (
        <h2 style={{ color: "white", textAlign: "center" }}>
          {waitingMessage}
        </h2>
      )}
      <h2 style={{ color: "white", textAlign: "center" }}>{player}</h2>

      {result ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <h1 style={{ color: "white", textAlign: "center" }}>
            Result: {result}
          </h1>
          <div className="d-flex gap-5">
            <div
              style={{ color: "white" }}
              className="d-flex flex-column align-items-center"
            >
              <h2>Player 1's Move</h2>
              <h2>{bothMove.move1}</h2>
            </div>
            <div
              style={{ color: "white" }}
              className="d-flex flex-column align-items-center"
            >
              <h2>Player 2's Move</h2>
              <h2>{bothMove.move2}</h2>
            </div>
          </div>
          {/* Exit buttons */}
          <button
            onClick={handleExit}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            Exit
          </button>
        </div>
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
              className={move === "rock" ? "selected-move" : ""}
            />
            <img
              style={{ width: "100px", cursor: "pointer" }}
              src={paper}
              alt="Paper"
              onClick={() => handleMove("paper")}
              className={move === "paper" ? "selected-move" : ""}
            />
            <img
              style={{ width: "100px", cursor: "pointer" }}
              src={scissors}
              alt="Scissors"
              onClick={() => handleMove("scissors")}
              className={move === "scissors" ? "selected-move" : ""}
            />
          </div>

          {/* Control Panel*/}
          <div className="d-flex align-items-center mb-4 gap-2">
            <h3 style={{ color: "white" }}>Your Move: {move}</h3>
          </div>

          {/* Right side: Opponent (Player 2) */}
          <div
            className="d-flex align-items-center"
            style={{
              height: "100vh",
              transform: "rotate(270deg)",
            }}
          >
            <img
              style={{ width: "100px" }}
              src={rock}
              alt="Rock"
              className={opponentMove === "rock" ? "selected-move" : ""}
            />
            <img
              style={{ width: "100px" }}
              src={paper}
              alt="Paper"
              className={opponentMove === "paper" ? "selected-move" : ""}
            />
            <img
              style={{ width: "100px" }}
              src={scissors}
              alt="Scissors"
              className={opponentMove === "scissors" ? "selected-move" : ""}
            />
          </div>
        </div>
      )}
    </div>
  );
}
