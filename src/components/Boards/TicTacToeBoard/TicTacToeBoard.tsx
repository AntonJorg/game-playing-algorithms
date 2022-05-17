import React, { FC } from 'react';
import { Game, State } from '../../../game-playing/games/Game';
import { TicTacToeAction } from '../../../game-playing/games/TicTacToe';
import styles from './TicTacToeBoard.module.scss';

interface TicTacToeBoardProps { boardData: number[][], handleClick: CallableFunction }

const TicTacToeBoard: FC<TicTacToeBoardProps> = (props: TicTacToeBoardProps) => {

  return (
    <div className={styles.TicTacToeBoard}>
      {props.boardData.map((row: number[], i: number) => {
        return <div className='row' key={i}>
          {row.map((element: number, j: number) => {
            let cno = "element"
            let cni = ""
            if (element === 1) {
              cni = "X"
            } else if (element === -1) {
              cni = "O"
            }
            return <div
              className={cno}
              key={j}
              onClick={() => props.handleClick({ row: i, col: j })}>
              <div className={cni}></div>
            </div>
          })}
        </div>
      })}
    </div>
  )
};

export function generateTicTacToeClickHandler(game: Game, state: State, stateSetter: CallableFunction) {
  return (action: TicTacToeAction) => {
    // If game is over, return
    if (state.is_terminal()) return

    // Only allow player to act if their turn
    if (state.player !== 1) return

    // horrible way to check membership, find way to use set.has()
    let valid = state.applicable_actions().some((validAction: TicTacToeAction) => (
      (action.row === validAction.row) && (action.col === validAction.col)
    ))

    if (valid) {
      let newState = game.result(state, action)

      stateSetter(newState)

    }
  }
}

export default TicTacToeBoard;
