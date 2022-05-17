import React, { FC } from 'react';
import styles from './GameSelect.module.scss';

interface GameSelectProps {}

const GameSelect: FC<GameSelectProps> = () => (
  <div className={styles.GameSelect}>
    GameSelect Component
  </div>
);

export default GameSelect;
