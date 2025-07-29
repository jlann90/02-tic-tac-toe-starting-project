import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // Toggles editing state, "editing" is a prop passed into the setIsEditing state function housed within the handleEditClick function
  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName); // Call the parent function to update the player name
    }
  }

  // Handles the change in the input field, updates the playerName state with the value from the input field, the event is created by the onChange event listener and creates an object that contains the value of the input field
  function handleChange(event) {
    console.log(event);
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  // let btnCaption = "Edit";

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    // btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
