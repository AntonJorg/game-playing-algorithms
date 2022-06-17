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

  const { appState: { state, game, agents, Board, autoReset }, dispatch } = useContext(AppStateContext)

  useEffect(() => {
    let idx = playerIndex(state.player)

    if (autoReset && state.is_terminal()) {
      let timer = setTimeout(() => dispatch({
        type: "reset-state",
        payload: null
      }), 1000)

      return () => clearTimeout(timer)
    }

    if ((agents[idx].getName() === "Player Agent") || (state.is_terminal())) {
      return
    }

    const timer = setTimeout(() => {
      let action = agents[idx].takeAction(state)

      console.log("Taking action:", action)

      if (action !== null) {

        let newState = game.result(state, action)

        if (newState.is_terminal()) {
          if (newState.utility() === 1) {
            dispatch({ type: "agent1-win", payload: null })
          } else if (newState.utility() === -1) {
            dispatch({ type: "agent2-win", payload: null })
          }
        }

        dispatch({
          type: "set-state",
          payload: {
            state: newState
          }
        })
      }
    }, 10)

    // Clean up on unmount
    return () => clearTimeout(timer);

  })

  //useEffect(() => console.log("unconditional"))
  //useEffect(() => console.log("conditional on state"), [state])

  const idx = state.utility() + 1

  return (
    <div className={styles.GameBoard}>
      <div className={`${styles.statusDisplay} ${state.is_terminal() ? statusClass[idx] : ""}`}>
        {state.is_terminal() ? winnerLabels[idx] : "Game in progress"}
      </div>
      <div className={styles.div}>
        <Board />
      </div>
    </div>
  )
};

export default GameBoard;
