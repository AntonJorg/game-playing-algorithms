import React, { FC, useState, useEffect, useMemo, useTransition } from 'react';
import { AgentType } from '../../../game-playing/agents/Agents';
import { Game } from '../../../game-playing/games/Game';
import styles from './GameBoard.module.scss';

interface BoardProps { boardData: any, handleClick: CallableFunction }

interface GameBoardProps { game: Game, agents: AgentType[], Board: FC<BoardProps>, generateClickHandler: CallableFunction }

const GameBoard: FC<GameBoardProps> = ({ game, agents, Board, generateClickHandler }) => {

  // const [isPending, startTransition] = useTransition()

  const [state, setState] = useState(game.initial_state)

  const agentInstances = useMemo(() => [new agents[0](game), new agents[1](game)], [game, agents])

  const playerIndex = (player: number) => (player === 1) ? 0 : 1


  useEffect(() => {
    let idx = playerIndex(state.player)

    if ((agentInstances[idx].name === "Player Agent") || (state.is_terminal())) {
      return
    }

    const timer = setTimeout(() => {
      let action = agentInstances[idx].takeAction(state)

      console.log("Taking action:", action)

      if (action !== null) {
        setState(game.result(state, action))
      }
    }, 10)

    // Clean up on unmount
    return () => clearTimeout(timer);

  })

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

  const idx = state.winner() + 1

  const handleClick = generateClickHandler(game, state, setState)

  return (
    <div className={styles.GameBoard}>
      <div className={`${styles.statusDisplay} ${state.is_terminal() ? statusClass[idx] : ""}`}>
        {state.is_terminal() ? winnerLabels[idx] : "Game in progress"}
      </div>
      <div className={styles.div}>
        <Board boardData={state.board} handleClick={handleClick} />
      </div>
      <button className={styles.button} onClick={() => setState(game.initial_state)}>Reset</button>
    </div>
  )
};

export default GameBoard;
