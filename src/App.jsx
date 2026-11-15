import React, { useState } from "react";
import "./App.css";

function App() {

  // Store 9 empty boxes
  const [board, setBoard] = useState(Array(9).fill(""));

  // Track current player
  const [currentPlayer, setCurrentPlayer] = useState("X");

  // Store winner
  const [winner, setWinner] = useState(null);

  // Draw status
  const [isDraw, setIsDraw] = useState(false);

  // Winning combinations
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Check winner
  const checkWinner = (newBoard) => {

    for (let pattern of winningPatterns) {

      const [a, b, c] = pattern;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }

    return null;
  };

  // Handle box click
  const handleClick = (index) => {

    // Prevent invalid clicks
    if (board[index] !== "" || winner || isDraw) {
      return;
    }

    const newBoard = [...board];

    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    // Check winner
    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
    }

    // Check draw
    else if (newBoard.every((box) => box !== "")) {
      setIsDraw(true);
    }

    // Switch player
    else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // Restart game
  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div className="game-container">

      <h1>XO GAME</h1>

      <p className="subtitle">Tic Tac Toe Challenge</p>

      <div className="game-status">

        {winner ? (
          <h2>🎉 Player {winner} Wins!</h2>
        ) : isDraw ? (
          <h2>🤝 Match Draw!</h2>
        ) : (
          <h2>Player {currentPlayer}'s Turn</h2>
        )}

      </div>

      <div className="game-board">

        {board.map((value, index) => (

          <button
            key={index}
            className={`cell ${value}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>

        ))}

      </div>

      <button className="restart-btn" onClick={restartGame}>
        Restart Game
      </button>

    </div>
  );
}

export default App;