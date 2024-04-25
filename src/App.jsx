import { useState } from "react"
import "./App.css"
import { Square } from "./Square"

const initialBoard = Array(9).fill(null)
const turnObj = {
  x: "✖",
  o: "🔘",
}
const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const App = () => {
  const [squares, setSquares] = useState(initialBoard)
  const [turn, setTurn] = useState(turnObj.x)
  const [endGame, setEndGame] = useState(false)
  const [winner, setWinner] = useState("")

  const reset = () => {
    setSquares(initialBoard)
    setTurn(turnObj.x)
    setEndGame(false)
    setWinner("")
  }

  const checkEndGame = (newSquaresArr) => {
    const matchingCombo = winnerCombos.some((combo) => {
      return (
        newSquaresArr[combo[0]] &&
        newSquaresArr[combo[1]] &&
        newSquaresArr[combo[2]] &&
        newSquaresArr[combo[0]] === newSquaresArr[combo[1]] &&
        newSquaresArr[combo[1]] === newSquaresArr[combo[2]]
      )
    })
    console.log(matchingCombo)

    if (matchingCombo) {
      setWinner(turn)
      setEndGame(true)
      // console.log(turn, " winner")
    } else if (newSquaresArr.every((square) => Boolean(square) === true)) {
      setWinner("Tie")
      setEndGame(true)
    }
  }

  const changeTurn = (index) => {
    const squareIsEmpty = !squares[index]

    if (squareIsEmpty && !endGame) {
      setSquares((prevSquares) => {
        const newSquares = prevSquares.map((square, arrIndex) =>
          arrIndex === index ? turn : square
        )

        checkEndGame(newSquares)

        return newSquares
      })

      setTurn((prevTurn) => (prevTurn === turnObj.x ? turnObj.o : turnObj.x))
    }
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>

      <div className="board">
        {squares.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              turn={turn}
              content={square}
              changeTurn={changeTurn}
            />
          )
        })}
      </div>

      <div className="turn-display">
        {winner === "" && (
          <span className={turn === turnObj.x ? "turn-selected" : ""}>
            {turnObj.x}
          </span>
        )}
        {winner === "" && (
          <span className={turn === turnObj.o ? "turn-selected" : ""}>
            {turnObj.o}
          </span>
        )}
        {winner !== "" && (
          <span>{winner === "Tie" ? "Tie" : `Winner: ${winner}`}</span>
        )}
      </div>

      <button onClick={reset}>Reset</button>
    </>
  )
}
