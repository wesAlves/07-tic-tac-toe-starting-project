import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [[null, null, null], [null, null, null], [null, null, null]]

function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }

    return currentPlayer;

}

function App() {
    const [players, setPlayers] = useState({
        "X": "Player 1",
        "O": "Player 2",
    })
    const [gameTurns, setGameTurns] = useState([]) // this is the single source of true

    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard.map(array => [...array])]; // we need this to avoid edit in memory and make a brand-new array that will always be a deep copy of the old array

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;

    }

    let winner = null;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol]
        }

    }

    function handleRestart(){
        setGameTurns([])
    }

    function handlePlayerNameChange(symbol, newName){
        setPlayers(prevPlayers =>{
            return{
                ...prevPlayers,
                [symbol]:newName
            }
        });
    }

    const hasDraw = gameTurns.length === 9 && !winner

    function handleSelectSquare(rowIndex, colIndex) {

        setGameTurns((prevTruns) => {
            const currentPlayer = deriveActivePlayer(prevTruns)

            return [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTruns];
        });
    }

    return (<main>
        <div id="game-container">
            <ol id="players" className={"highlight-player"}>
                <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}/>
                <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
            </ol>
            {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
            <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard}/>
        </div>
        <Log turns={gameTurns}/>
    </main>)
}

export default App
