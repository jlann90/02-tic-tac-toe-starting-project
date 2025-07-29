import { useState } from "react";

// Importing child components for the game UI
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";

function App() {
  // State for tracking which player's turn it is ("X" or "O")
  const [activePlayer, setActivePlayer] = useState("X");
  // State for tracking all moves made in the game
  const [gameTurns, setGameTurns] = useState([]);

  // Handles when a square is selected on the board
  function handleSelectSquare(rowIndex, colIndex) {
    // Switch to the next player after a move
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    // Add the new move to the list of turns
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";

      // Determine which player should be assigned to this move
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      // Create a new array of turns with the latest move at the front
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];

      return updatedTurns;
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

        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
