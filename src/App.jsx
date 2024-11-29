import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";

function App() {

    const [gameTurns, setGameTurns] = useState([])
    const [activePlayer, setActivePlayer] = useState("X");

    function handleSelectSquare(rowIndex, colIndex) {
        setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X");

        setGameTurns((prevTruns) => {
            let currentPlayer = "X";

            if (prevTruns.length > 0 && prevTruns[0].player === "X") {
                currentPlayer = "O";
            }

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
