import { FC, useContext } from 'react';
import styles from './ConnectFourBoard.module.scss';
import { AppStateContext } from '../../../AppStateContext';

interface ConnectFourBoardProps { }

const ConnectFourBoard: FC<ConnectFourBoardProps> = () => {

  const { appState: { game, state }, dispatch } = useContext(AppStateContext)

  const handleClick = (action: number) => {
    // If game is over, return
    if (state.is_terminal()) return

    // Only allow player to act if their turn
    if (state.player !== 1) return

    // horrible way to check membership, find way to use set.has()
    let valid = state.applicable_actions().some((validAction: number) => (
      (action === validAction)
    ))

    if (valid) {
      dispatch({
        type: "set-state",
        payload: {
          state: game.result(state, action)
        }
      })
    }
  }

  let rows: any[] = []
  for (let i = state.board[0].length - 1; i >= 0; i--) {
    let row: any[] = [];
    for (let j = 0; j < state.board.length; j++) {
      let cn = "piece"
      if (state.board[j][i] === 1) {
        cn += " P1"
      } else if (state.board[j][i] === -1) {
        cn += " P2"
      }

      row = row.concat(<div className="element" key={j}>
        <div
          className="inner"
          onClick={() => handleClick(j)}>
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

export default ConnectFourBoard;
