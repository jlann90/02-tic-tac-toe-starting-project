const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   // Handles the selection of a square on the game board, updates the gameBoard state with the selected square's index and sets it to "X", the event is created by the onClick event listener
  //   // The function creates a copy of the current gameBoard state, updates the selected square with "X", and then sets the gameBoard state to the updated board.
  //   // The useState hook is used to manage the gameBoard state, and the setGameBoard function is used to update the state.
  //   // The function takes the rowIndex and colIndex of the selected square as arguments, and
  //   // updates the gameBoard state with the selected square's index and sets it to "X".
  //   // The function uses the spread operator to create a copy of the current gameBoard state,
  //   // and then updates the selected square with "X". Finally, it sets the gameBoard state to the updated board.
  //   // This allows the game board to be updated dynamically as the player selects squares.
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

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
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
