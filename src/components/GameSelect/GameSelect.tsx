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

  const { appState, dispatch } = useContext(AppStateContext);

  return <div className={styles.GameSelect}>
    <Select
      defaultValue={options[0]}
      options={options}
      onChange={(value) => {
        if (!value) return
        const game = new value.value.game()
        dispatch({
          type: "set-game",
          payload: {
            game: game,
            Board: value.value.Board
          }
        })
      }} />
  </div>

};

export default GameSelect;
