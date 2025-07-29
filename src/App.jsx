import { useState } from "react";

import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = { X: "Player 1", O: "Player 2" };

// The initial empty tic-tac-toe board (3x3 grid)
const INITIAL_GAME_BOARD = [
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

// Helper function to derive the game board from the list of turns
function deriveGameBoard(gameTurns) {
  // Start with a fresh board for each render
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  // Fill in the board based on the list of turns (moves)
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    // Place the player's symbol (X or O) in the correct spot
    gameBoard[row][col] = player;
  }
  return gameBoard; // Return the filled board
}

// Helper function to determine if there's a winner based on the current game board
function deriveWinner(gameBoard, players) {
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
      winner = players[firstSquareSymbol]; // If all three squares in the combination match, we have a winner
    }
  }

  return winner;
}

// Main App component that brings everything together
function App() {
  // State for tracking player names and symbols
  const [players, setPlayers] = useState(PLAYERS);

  // State for tracking all moves made in the game (each move is an object with row, col, and player)
  const [gameTurns, setGameTurns] = useState([]);

  // Figure out which player is currently active using the helper function
  const activePlayer = deriveActivePlayer(gameTurns);
  // Derive the game board from the list of turns and check for a winner
  const gameBoard = deriveGameBoard(gameTurns);
  // Check if there's a winner based on the current game board and players
  const winner = deriveWinner(gameBoard, players);

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

  function handleRematch() {
    setGameTurns([]); // Reset the game by clearing all turns
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  // Render the main game UI
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
