import { useState } from "react";

import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

// The initial empty tic-tac-toe board (3x3 grid)
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Helper function to figure out whose turn it is based on the moves so far
function deriveActivePlayer(gameTurnsArg) {
  let currentPlayer = "X"; // Start with player X

  // If there are moves and the last move was by X, it's O's turn
  if (gameTurnsArg.length > 0 && gameTurnsArg[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer; // Return the player whose turn it is
}

function App() {
  // State for tracking all moves made in the game (each move is an object with row, col, and player)
  const [gameTurns, setGameTurns] = useState([]);

  // Figure out which player is currently active using the helper function
  const activePlayer = deriveActivePlayer(gameTurns);

  // Start with a fresh board for each render
  let gameBoard = initialGameBoard;

  // Fill in the board based on the list of turns (moves)
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    // Place the player's symbol (X or O) in the correct spot
    gameBoard[row][col] = player;
  }

  let winner = null;

  // Check for a winning combination
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol; // If all three squares in the combination match, we have a winner
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  // Function that runs when a square is clicked on the board
  function handleSelectSquare(rowIndex, colIndex) {
    // Add the new move to the list of turns
    setGameTurns((prevTurns) => {
      // Figure out which player should make this move
      const currentPlayer = deriveActivePlayer(prevTurns);

      // Create a new array of turns with the latest move at the front
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns; // Update the state with the new move
    });
  }

  // Render the main game UI
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
