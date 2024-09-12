import { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import "../../App.css";
import { WinnerContext } from "../../Contexts/Winner/WinnerContext";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  //   const [num, setNum] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [landedNumber, setLandedNumber] = useState(null);
  // const [bet, setBet] = useState("even");

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Bet, setPlayer1Bet] = useState("");
  const [player2Bet, setPlayer2Bet] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [winningMessage, setWinningMessage] = useState("");
  const spinnerRef = useRef(null);
  const spinning = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(true);

  const { setWinnerPlayer, setLooserPlayer } = useContext(WinnerContext);

  const navigate = useNavigate();
  const spinningAudio = new Audio("/roulette.mp3");
  const handleOk = () => {
    if (player1 && player2) {
      setIsModalOpen(true);
      setIsPlayerModalOpen(false);
      setCurrentPlayer(player1);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsPlayerModalOpen(false);
  };

  const spin = () => {
    if (spinning.current) return;
    spinning.current = true;
    if (spinning.current === true) {
      spinningAudio.play();
    } else {
      spinningAudio.pause();
    }
    setLandedNumber(null);
    const newRotation = rotation + Math.floor(Math.random() * 360) + 720; // At least 2 full rotations
    setRotation(newRotation);

    setTimeout(() => {
      const landedDegree = newRotation % 360;

      const sectionSize = 360 / 6;
      const corrcetOffset = sectionSize / 2;

      const landedIndex = Math.floor(
        ((360 - (landedDegree + corrcetOffset)) % 360) / sectionSize
      );

      var number = (landedIndex + 1) % 6 || 6;

      if (number === 6) {
        number -= 5;
      } else if (number < 6) {
        number += 1;
      } else {
        number -= 1;
      }

      setLandedNumber(number);
      spinning.current = false;

      checkWinner(number);
    }, 5000);
    setTimeout(() => {
      navigate("/game");
    }, 6500);
  };

  // const spin = () => {
  //   if (spinning.current) return;
  //   spinning.current = true;
  //   setLandedNumber(null);

  //   const newRotation = rotation + Math.floor(Math.random() * 360) + 720; // At least 2 full rotations
  //   setRotation(newRotation);

  //   setTimeout(() => {
  //     console.log("rotation", newRotation);
  //     const landedDegree = newRotation % 360;
  //     console.log("landedDegree", landedDegree);
  //     const sectionSize = 360 / 6;
  //     const correctOffset = sectionSize / 2;
  //     console.log("Sectionsize", sectionSize);

  //     // Calculate landed index and corresponding number
  //     const landedIndex = Math.floor(((360 - (landedDegree + correctOffset)) % 360) / sectionSize);
  //     console.log("landedIndex", landedIndex);

  //     // Number is simply landedIndex + 1
  //     const number = (landedIndex + 1) % 6 || 6;
  //     console.log("number", number);

  //     // Update state
  //     setLandedNumber(number);
  //     spinning.current = false;

  //     // Check winner
  //     checkWinner();
  //   }, 5000);
  // };

  useEffect(() => {
    if (spinnerRef.current) {
      spinnerRef.current.style.transform = `rotate(${rotation}deg)`;
    }
    console.log(rotation);
  }, [rotation]);
  const handleBet = (chosenBet) => {
    setPlayer1Bet(chosenBet);
    setPlayer2Bet(chosenBet === "even" ? "odd" : "even");
    // setBet(chosenBet);
    setIsModalOpen(false);
  };
  const checkWinner = (number) => {
    if (number) {
      const winner = number % 2 === 0 ? "even" : "odd";

      console.log("Landed Number:", number);
      console.log("Winner (even/odd):", winner);
      console.log("Player 1 Bet:", player1Bet);
      console.log("Player 2 Bet:", player2Bet);

      if (player1Bet === winner) {
        console.log(`${player1} wins!`);
        setWinningMessage(`${player1} wins!`);
        setWinnerPlayer(player1);
        setLooserPlayer(player2);
      } else if (player2Bet === winner) {
        console.log(`${player2} wins!`);
        setWinningMessage(`${player2} wins!`);
        setWinnerPlayer(player2);
        setLooserPlayer(player1);
      }
    }
  };
  return (
    <div className="spinner-cont">
      {winningMessage && (
        <h1 style={{ color: "black" }}>
          winning number is {landedNumber}, {winningMessage}
        </h1>
      )}
      <div
        ref={spinnerRef}
        style={{ top: !winningMessage ? "5vw" : "unset" }}
        className="spinner"
      >
        {[1, 2, 3, 4, 5, 6].map((n, i) => (
          <div key={i} className="section">
            <span>{n}</span>
          </div>
        ))}
      </div>
      <button onClick={spin} className="spin-btn">
        Spin
      </button>
      <div>
        <Modal
          title="Place Your Bets"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="modal-bod">
            <h1>{currentPlayer},Choose Even or Odd</h1>
            <div className="btn-grp">
              <button onClick={() => handleBet("even")}>Even</button>
              <button onClick={() => handleBet("odd")}>Odd</button>
            </div>
          </div>
        </Modal>
        {/* <button onClick={showModal}>Open</button> */}
      </div>
      <div>
        <Modal
          title="Enter Player Names"
          open={isPlayerModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="modal-bod">
            <input
              placeholder="Player 1"
              value={player1}
              style={{
                padding: "20px",
                border: "1px solid black",
                margin: "10px 0",
                borderRadius: "20px",
                color: "black",
                background: "white",
              }}
              onChange={(e) => setPlayer1(e.target.value)}
              type="text"
            />
            <input
              placeholder="Player 2"
              value={player2}
              style={{
                padding: "20px",
                border: "1px solid black",
                margin: "10px 0",
                borderRadius: "20px",
                color: "black",
                background: "white",
              }}
              onChange={(e) => setPlayer2(e.target.value)}
              type="text"
            />
          </div>
          <div className="modal-btn">
            <button onClick={handleOk}>Ok</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Spinner;
