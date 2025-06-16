import Gameboard from "./components/Gameboard/Gameboard";
import Player from "./components/Player/Player";
import Log from "./components/Log/Log";
import GameOver from "./components/GameOver/GameOver.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  })
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameboard = deriveGameBoard(gameTurns);
  const winner = deriverWinner(gameboard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    const currentPlayer = deriveActivePlayer(gameTurns);

    setGameTurns((prevTurns) => {
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleRestart () {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }
  function deriverWinner (gameboard, players) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = gameboard[combination[0].row][combination[0].column]; 
      const secondSqaureSymbol = gameboard[combination[1].row][combination[1].column]; 
      const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column]; 
  
      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSqaureSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        winner = players[firstSquareSymbol];
      }
    }

    return winner;
  }
  function deriveGameBoard(gameTurns) {
    let gameboard = [...initialGameboard].map((row) => [...row]);

    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
  
      gameboard[row][col] = player;
    }

    return gameboard;
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        <Gameboard onSelectSquare={handleSelectSquare} gameboard={gameboard} />
        {(winner || hasDraw) && <GameOver onRestart={handleRestart} winner={winner}/>}
      </div>
      <Log turns={gameTurns} />
      
    </main>
  );
}

export default App;
