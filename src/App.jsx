import { useState } from "react"
import React from "react"
import confetti from 'canvas-confetti'

const TURNS = {
  x: 'x',
  o: 'o'
}

const Cell = ({children, index, isSelected, updateBoard}) => {
  const className = `cell ${isSelected ? 'is-selected' : ''}`

  const handlerClick = () => {
    return updateBoard(index)
  }
  
  return (
    <div className={className} onClick={handlerClick}>
      <span className="cell-content">
        {children}
      </span>
    </div>
  )
}

const combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export function App(){
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.x)
  const [winner, setWinner] = useState(null)

  const checkWinner = (board) => {
    for(const combo of combos){
      const [a, b, c] = combo
      if(board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) return board[a]
    }
    return null
  }

  const lastCheck = (board) => {
    return board.every(cell => cell !== null)
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return
    //update turn
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
    //actaulizar board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //check winner
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      confetti()
    }else if (lastCheck(newBoard)){
      setWinner(false)
    }
  }

  return(
    <React.Fragment>
      <div className="game-container">
        <section className="game">
          <button className="reset" onClick={resetGame}>Restart</button>
          <h1>TIC-TAC-TOE</h1>
          <div className="cells">
            {
              board.map((_, index) => {
                return(
                  <Cell
                    key={index}
                    index={index}
                    updateBoard={updateBoard}
                  >
                    {board[index]}
                  </Cell>
                )
              })
            }
          </div>
        </section>
        <section className="turn">
          <Cell isSelected={turn === TURNS.x}>
            {TURNS.x}
          </Cell>
          <Cell isSelected={turn === TURNS.o}>
            {TURNS.o}
          </Cell>
        </section>
        <section className="results">
          {
            winner !== null && (
              <div className="modal">
                <section className="resultados">
                <span>
                  {
                    winner === false
                    ? 'EMPATE'
                    : 'GANADOR: '
                  }
                </span>
                <header>
                  {winner && <div className="cell">
                    <span>
                      {winner === TURNS.x || winner === TURNS.o
                        ? winner
                        : '-'
                      }
                    </span>
                  </div>
                  }
                </header>
                <button className="reset" onClick={resetGame}>Restart</button>
              </section>
              </div>
            )
          }
        </section>
      </div>
    </React.Fragment>
  )
}