import React, { FC, useContext } from 'react';
import { AppStateContext } from '../../../AppStateContext';
import { Game, State } from '../../../game-playing/games/Game';
import { TicTacToeAction } from '../../../game-playing/games/TicTacToe';
import styles from './TicTacToeBoard.module.scss';

interface TicTacToeBoardProps { }

const TicTacToeBoard: FC<TicTacToeBoardProps> = () => {

  const { appState, setAppState } = useContext(AppStateContext)

  const handleClick = (action: TicTacToeAction) => {
    // If game is over, return
    if (appState.state.is_terminal()) return

    // Only allow player to act if their turn
    if (appState.state.player !== 1) return

    // horrible way to check membership, find way to use set.has()
    let valid = appState.state.applicable_actions().some((validAction: TicTacToeAction) => (
      (action.row === validAction.row) && (action.col === validAction.col)
    ))

    if (valid) {
      setAppState({
        ...appState,
        state: appState.game.result(appState.state, action)
      })
    }
  }

  return (
    <div className={styles.TicTacToeBoard}>
      {appState.state.board.map((row: number[], i: number) => (
        <div className='row' key={i}>
          {row.map((player: number, j: number) => (
            <Square
              player={player}
              key={j}
              onClick={() => handleClick({ row: i, col: j })} />
          ))}
        </div>
      )
      )}
    </div>
  )
};

interface SquareProps { player: number, onClick: CallableFunction };

const Square: FC<SquareProps> = ({ player, onClick }) => {
  return <div className={styles.Square} onClick={() => onClick()}>
    <div className={(player === 0) ? "" : ((player === 1) ? "X" : "O")}></div>
  </div>
}

export default TicTacToeBoard;
