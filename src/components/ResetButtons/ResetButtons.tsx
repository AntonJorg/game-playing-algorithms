import React, { FC, useContext } from 'react';
import { AppStateContext } from '../../AppStateContext';
import styles from './ResetButtons.module.scss';

interface ResetButtonsProps { }

const ResetButtons: FC<ResetButtonsProps> = () => {

  const { appState: { autoReset }, dispatch } = useContext(AppStateContext)

  return <div className={styles.ResetButtons}>
    <button onClick={() => dispatch({ type: "reset-state", payload: null })}>Reset</button>
    <button onClick={() => dispatch({ type: "toggle-auto-reset", payload: null })}>Auto-Reset: {autoReset ? "On" : "Off"}</button>
  </div>
};

export default ResetButtons;
