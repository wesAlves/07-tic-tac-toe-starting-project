export default function Log({turns}) {

    return <ol id="log">
        {turns.map(({square:{row, col},player}) => {
            return(
                <li>Player: {player}, Square: {row}, {col}</li>
            )
        })}
    </ol>
}