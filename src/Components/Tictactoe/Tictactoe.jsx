import Board from "../Board/Board";
import "../../App.css";
import { useContext, useEffect, useState } from "react";
import { WinnerContext } from "../../Contexts/Winner/WinnerContext";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
const Player_x = "x";
const Player_o = "o";
const winningConditions = [
  // rows
  { combo: [0, 1, 2], strike: "strike-row-1" },
  { combo: [3, 4, 5], strike: "strike-row-2" },
  { combo: [6, 7, 8], strike: "strike-row-3" },

  // columns
  { combo: [0, 3, 6], strike: "strike-column-1" },
  { combo: [1, 4, 7], strike: "strike-column-2" },
  { combo: [2, 5, 8], strike: "strike-column-3" },

  // diagonals
  { combo: [0, 4, 8], strike: "strike-diagonal-1" },
  { combo: [2, 4, 6], strike: "strike-diagonal-2" },
];

const GameState = {
  playerXWins: 0,
  playerOWins: 1,
  draw: 2,
  inProgress: 3,
};

const checkWinner = (tile, setStrikeClass, setGameState) => {
  for (const { combo, strike } of winningConditions) {
    const tileValue1 = tile[combo[0]];
    const tileValue2 = tile[combo[1]];
    const tileValue3 = tile[combo[2]];

    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strike + " active");
      setGameState(
        tileValue1 === Player_x ? GameState.playerXWins : GameState.playerOWins
      );
      return;
    }
  }

  if (tile.every((t) => t !== null)) {
    setGameState(GameState.draw);
  }
};
const Tictactoe = () => {
  const [tile, setTile] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(Player_x);
  var { winnerPlayer, looserPlayer, message, setMessage } =
    useContext(WinnerContext);
  const [userTurn, setUserTurn] = useState(winnerPlayer);
  const [strikeClass, setStrikeClass] = useState("");
  const [gameState, setGameState] = useState(GameState.inProgress);
  const clapAudio = new Audio("/sound.mp3");
  const navigate = useNavigate();
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    switch (gameState) {
      case GameState.playerXWins:
        setMessage(winnerPlayer + " wins");
        setTimeout(() => {
          triggerConfetti();
          clapAudio.play();
        }, 500);
        break;
      case GameState.playerOWins:
        setMessage(looserPlayer + " wins");
        setTimeout(() => {
          triggerConfetti();
          clapAudio.play();
        }, 500);
        break;

      case GameState.draw:
        setMessage("It's a Draw");
        break;
      default:
        setMessage(`${userTurn}'s turn`);
    }
  }, [gameState, setMessage, userTurn]);

  const handleTileClick = (index) => {
    if (tile[index] !== null || gameState !== GameState.inProgress) {
      return;
    }

    const newTiles = [...tile];
    newTiles[index] = userTurn;
    if (userTurn === winnerPlayer) {
      setUserTurn(looserPlayer);
      setMessage(`${looserPlayer + "'s"} turn`);
    } else {
      setUserTurn(winnerPlayer);
      setMessage(`${winnerPlayer + "'s"} turn`);
    }
    newTiles[index] = playerTurn;
    setTile(newTiles);
    if (playerTurn === Player_x) {
      setPlayerTurn(Player_o);
    } else {
      setPlayerTurn(Player_x);
    }
  };

  useEffect(() => {
    checkWinner(tile, setStrikeClass, setGameState);
    // console.log(strikeClass);
  }, [tile]);

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTile(Array(9).fill(null));
    setPlayerTurn(Player_x);
    setUserTurn(winnerPlayer);
    setStrikeClass(null);
  };

  return (
    <div className="tic">
      {winnerPlayer && (
        <h1 style={{ color: "black", textTransform: "capitalize" }}>
          {winnerPlayer} <span>starts first</span>
        </h1>
      )}
      <Board
        strikeClass={strikeClass}
        playerTurn={playerTurn}
        onTileClick={handleTileClick}
        tile={tile}
      />

      {userTurn && <h1 style={{ color: "black" }}>{message} </h1>}
      <div></div>
      {gameState !== GameState.inProgress && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <button onClick={handleReset}>Play Again</button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Tictactoe;
