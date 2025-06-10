import { useState } from "react"
import React from "react"
import confetti from 'canvas-confetti'
import { Cell } from "./components/cells.jsx"
import { TURNS } from "./consts/consts.js"
import { checkWinner } from "./consts/consts.js"
import { lastCheck } from "./consts/consts.js"
import { ValidateWinner } from "./components/winner.jsx"

export function App(){
  const [board, setBoard] = useState(()=>{
    const localBoard = JSON.parse(window.localStorage.getItem('board'))
    if(localBoard) return localBoard
    else{ return Array(9).fill(null) }
  })
  const [turn, setTurn] = useState(()=>{
    const localTurn = window.localStorage.getItem('turn')
    if(localTurn) return localTurn
    else{ return TURNS.x }
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return
    //update turn
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
    window.localStorage.setItem('turn', newTurn)
    //actaulizar board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
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
            <ValidateWinner winner={winner} resetGame={resetGame}></ValidateWinner>
          }
        </section>
      </div>
    </React.Fragment>
  )
}