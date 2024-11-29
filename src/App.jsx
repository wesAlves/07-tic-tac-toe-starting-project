import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";


function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }

    return currentPlayer;

}

function App() {

    const [gameTurns, setGameTurns] = useState([])

    const activePlayer = deriveActivePlayer(gameTurns);

    function handleSelectSquare(rowIndex, colIndex) {
        // setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X");

        setGameTurns((prevTruns) => {
            const currentPlayer = deriveActivePlayer(prevTruns)

            const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTruns];

            return updatedTurns;
        });
    }

    return (<main>
        <div id="game-container">
            <ol id="players" className={"highlight-player"}>
                <Player name="Player 1" symbol="X" isActive={activePlayer === "X"}/>
                <Player name="Player 2" symbol="O" isActive={activePlayer === "O"}/>
            </ol>
            <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} turns={gameTurns}/>
        </div>
        <Log turns={gameTurns}/>
    </main>)
}

export default App
