import { FC, useEffect, useContext } from 'react';
import { AppStateContext } from '../../../AppStateContext';
import { AgentType } from '../../../game-playing/agents/Agents';
import { Game } from '../../../game-playing/games/Game';
import styles from './GameBoard.module.scss';


const winnerLabels = [
  "Winner: Player 2",
  "Draw",
  "Winner: Player 1"
]

const statusClass = [
  styles.P2,
  styles.D,
  styles.P1
]


interface GameBoardProps { }

const GameBoard: FC<GameBoardProps> = () => {

  const playerIndex = (player: number) => (player === 1) ? 0 : 1

  const { appState: { state, game, agents, Board }, setAppState } = useContext(AppStateContext)

  useEffect(() => {
    let idx = playerIndex(state.player)

    if ((agents[idx].getName() === "Player Agent") || (state.is_terminal())) {
      return
    }

    const timer = setTimeout(() => {
      let action = agents[idx].takeAction(state)

      console.log("Taking action:", action)

      if (action !== null) {
        setAppState({
          game,
          agents,
          Board,
          state: game.result(state, action)
        })
      }
    }, 10)

    // Clean up on unmount
    return () => clearTimeout(timer);

  })

  const idx = state.winner() + 1

  return (
    <div className={styles.GameBoard}>
      <div className={`${styles.statusDisplay} ${state.is_terminal() ? statusClass[idx] : ""}`}>
        {state.is_terminal() ? winnerLabels[idx] : "Game in progress"}
      </div>
      <div className={styles.div}>
        <Board />
      </div>
      <button className={styles.button} onClick={() => setAppState({ game, agents, Board, state: game.initial_state })}>Reset</button>
    </div>
  )
};

export default GameBoard;
