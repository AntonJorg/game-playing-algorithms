import { FC, useContext } from 'react';
import { AppStateContext } from '../../AppStateContext';
import styles from './ResultsStats.module.scss';

interface ResultsStatsProps { }

const ResultsStats: FC<ResultsStatsProps> = () => {

  const { appState: { score: { agent1, agent2 } }, dispatch } = useContext(AppStateContext)

  const total = agent1 + agent2

  return <div className={styles.ResultsStats}>
    <h1>{agent1} / {agent2}</h1>
    <h3>{Math.round(total === 0 ? 0 : agent1 / total * 100)}% / {Math.round(total === 0 ? 0 : agent2 / total * 100)}%</h3>
  </div>
};

export default ResultsStats;
