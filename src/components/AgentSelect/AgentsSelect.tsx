import { FC, useEffect, useContext } from 'react';
import styles from './AgentSelect.module.scss';
import Select from 'react-select'
import { PlayerAgent, RandomAgent, MCTSAgent } from '../../game-playing/agents/Agents';
import { AppStateContext } from '../../AppStateContext';

const agents: (typeof PlayerAgent | typeof RandomAgent | typeof MCTSAgent)[] = [
  PlayerAgent,
  RandomAgent,
  MCTSAgent
]

const options = agents.map((agent) => ({ value: agent, label: agent.label }))


interface AgentsSelectProps { }

const AgentsSelect: FC<AgentsSelectProps> = () => {

  return (
    <div className={styles.AgentSelect}>
      <div>
        <label>Agent 1 type</label>
        <AgentSelect index={0} />
      </div>
      <div>
        <label>Agent 2 type</label>
        <AgentSelect index={1} />
      </div>
    </div>
  )
};

interface AgentSelectProps { index: 0 | 1 }

const AgentSelect: FC<AgentSelectProps> = ({ index }) => {

  const { appState, dispatch } = useContext(AppStateContext)

  return <Select
    defaultValue={options[index]}
    options={options}
    onChange={(value) => {
      if (!value) return
      dispatch({
        type: "set-agent",
        payload: {
          agent: new value.value(appState.game),
          index: index
        }
      })
    }
    }
  />

}

export default AgentsSelect;
