import React, { FC } from 'react';
import styles from './ConnectFourBoard.module.scss';
import { ConnectFourGame, ConnectFourState } from '../../../game-playing/games/ConnectFour';

interface ConnectFourBoardProps { boardData: number[][], handleClick: CallableFunction }

const ConnectFourBoard: FC<ConnectFourBoardProps> = (props: ConnectFourBoardProps) => {

  let rows: any[] = []
  for (let i = props.boardData[0].length - 1; i >= 0; i--) {
    let row: any[] = [];
    for (let j = 0; j < props.boardData.length; j++) {
      let cn = "piece"
      if (props.boardData[j][i] === 1) {
        cn += " P1"
      } else if (props.boardData[j][i] === -1) {
        cn += " P2"
      }

      row = row.concat(<div className="element" key={j}>
        <div
          className="inner"
          onClick={() => props.handleClick(j)}>
          <div className={cn} />
        </div>
      </div>)
    }
    rows = rows.concat(<div className='row' key={i}>
      {row}
    </div>)
  }

  return (
    <div className={styles.ConnectFourBoard}>
      {rows}
    </div>
  )
};

export function generateConnectFourClickHandler(game: ConnectFourGame, state: ConnectFourState, stateSetter: CallableFunction) {
  return (action: number) => {
    // If game is over, return
    if (state.is_terminal()) return

    // Only allow player to act if their turn
    if (state.player !== 1) return

    // horrible way to check membership, find way to use set.has()
    let valid = state.applicable_actions().some((validAction: number) => (
      (action === validAction)
    ))

    if (valid) {
      let newState = game.result(state, action)

      stateSetter(newState)

    }
  }
}

export default ConnectFourBoard;
