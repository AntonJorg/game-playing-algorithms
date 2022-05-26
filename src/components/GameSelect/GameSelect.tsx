import { FC, useContext } from 'react';
import styles from './GameSelect.module.scss';
import Select from 'react-select'
import { AppStateContext } from '../../AppStateContext';
import { zip } from '../../utils';

import games from '../../game-playing/games/Games';
import boards from '../Boards/Boards';

const availableGames = Array.from(zip(games, boards)).map(([game, Board]) => ({ game, Board }))

const options = availableGames.map((game) => ({ value: game, label: game.game.label }))

interface GameSelectProps { }

const GameSelect: FC<GameSelectProps> = () => {

  const { appState, setAppState } = useContext(AppStateContext);

  return <div className={styles.GameSelect}>
    <Select
      defaultValue={options[0]}
      options={options}
      onChange={(value) => {
        if (!value) return
        const game = new value.value.game()
        setAppState({
          game: game,
          Board: value.value.Board,
          state: game.initial_state,
          // reconstruct all agents with the new game
          agents: appState.agents.map((agent) => new (Object.getPrototypeOf(agent).constructor)(game))
        })
      }} />
  </div>

};

export default GameSelect;
