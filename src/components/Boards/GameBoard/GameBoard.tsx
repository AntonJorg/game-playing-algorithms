import React, { FC, useState, useEffect, useMemo } from 'react';
import { Agent } from '../../../game-playing/agents/Agents';
import { Game } from '../../../game-playing/games/Game';
import styles from './GameBoard.module.scss';

interface BoardProps { boardData: any, handleClick: CallableFunction }

interface GameBoardProps { game: Game, agent: Agent, Board: FC<BoardProps>, generateHandleClick: CallableFunction }

const GameBoard: FC<GameBoardProps> = ({ game, agent, Board, generateHandleClick }) => {

  const [state, setState] = useState(game.initial_state)
  const [winner, setWinner] = useState(0)

  useEffect(() => {

    // If opponents turn, make their move
    if ((state.player === -1) && (!state.is_terminal())) {

      const timer = setTimeout(() => {
        let action = agent.takeAction(state)

        console.log("Taking action:", action)

        if (action !== null) {
          setState(game.result(state, action))
        }
      }, 50)

      // Clean up on unmount
      return () => clearTimeout(timer);
    }
  })

  const winnerLabels = [
    "Winner: Player 2",
    "Draw",
    "Winner: Player 1"
  ]

  const handleClick = generateHandleClick(game, state, setState)

  return (
    <div className={styles.GameBoard}>
      <div className={styles.div}>{state.is_terminal() ? winnerLabels[state.winner() + 1] : "Game in progress"}</div>
      <div className={styles.div}>
        <Board boardData={state.board} handleClick={handleClick} />
      </div>
      <button className={styles.button} onClick={() => setState(game.initial_state)}>Reset</button>
    </div>
  )
};

export default GameBoard;
