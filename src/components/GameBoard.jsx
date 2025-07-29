// The initial empty tic-tac-toe board (3x3 grid)
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  // Start with a fresh board for each render
  let gameBoard = initialGameBoard;

  // Fill in the board based on the list of turns (moves)
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    // Place the player's symbol (X or O) in the correct spot
    gameBoard[row][col] = player;
  }

  // (Commented out) Example of using local state for the board instead of deriving it from turns
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   // Example handler for updating the board state directly (not used in this version)
  //   function handleSelectSquare(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedBoard;
  //     });

  //     onSelectSquare();
  //   }

  // Render the game board as a list of rows and columns
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* Render a button for each square; show X, O, or nothing */}
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
