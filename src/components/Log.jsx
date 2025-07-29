// The Log component displays a list of all moves made in the game
export default function Log({ turns }) {
  return (
    // Ordered list to show the move history
    <ol id="log">
      {/* Loop through each turn and display which player selected which square */}
      {turns.map((turn) => (
        // Use row and column as a unique key for each move
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
