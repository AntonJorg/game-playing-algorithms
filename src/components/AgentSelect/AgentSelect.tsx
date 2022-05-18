import React, { FC, useState, useEffect } from 'react';
import styles from './AgentSelect.module.scss';
import Select from 'react-select'
import { Agent, PlayerAgent, RandomAgent, MCTSAgent } from '../../game-playing/agents/Agents';

interface AgentSelectProps { onChange: CallableFunction }

const AgentSelect: FC<AgentSelectProps> = ({ onChange }) => {

  const agents: (typeof Agent)[] = [
    PlayerAgent,
    RandomAgent,
    MCTSAgent
  ]

  const [agentSelection, setAgentSelection] = useState([agents[0], agents[1]])

  useEffect(() => onChange(agentSelection))

  function handleChange(idx: number, value: { value: (typeof Agent), label: string } | null) {
    if (value === null) return
    let newAgentSelection = [...agentSelection]
    newAgentSelection[idx] = value.value
    setAgentSelection(newAgentSelection)
  }

  const options = agents.map((agent) => ({ value: agent, label: agent.label }))

  console.log("options", options)

  return (
    <div className={styles.AgentSelect}>
      <div>
        <label>Agent 1 type</label>
        <Select
          defaultValue={options[0]}
          options={options}
          onChange={(value) => handleChange(0, value)}
        />
      </div>
      <div>
        <label>Agent 2 type</label>
        <Select
          defaultValue={options[1]}
          options={options}
          onChange={(value) => handleChange(1, value)}
        />
      </div>


    </div>
  )
};

export default AgentSelect;
