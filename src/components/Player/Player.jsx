import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState(initialName);

    function handleEdit() {
        setIsEditing(prev => !prev);
        if (isEditing) {
            onChangeName(symbol, updatedName);
        }
    }

    function handleChange(event) {
        setUpdatedName(event.target.value);
    }

    let playerName = <span className="player-name">{updatedName}</span>;
    let buttonCaption = "Edit";

    if (isEditing) {
        playerName = <input type="text" required value={updatedName} onChange={handleChange}/>;
        buttonCaption = "Save";
    }
    return (
        <li className={isActive? "active" : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{buttonCaption}</button>
          </li>
    )
}
