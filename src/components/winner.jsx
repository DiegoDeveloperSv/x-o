import { TURNS } from "../consts/consts.js"

export function ValidateWinner ({winner, resetGame}){
  if (winner === null) return
  return (
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