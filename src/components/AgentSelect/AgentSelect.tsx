import React, { FC } from 'react';
import styles from './AgentSelect.module.scss';
import Select from 'react-select'
import { Agent } from '../../game-playing/agents/Agents';

interface AgentSelectProps { agents: (typeof Agent)[], onChange: CallableFunction }

const AgentSelect: FC<AgentSelectProps> = ({ agents, onChange }) => (
  <div className={styles.AgentSelect}>
    <label>Agent type</label>
    <Select
      options={agents.map((agent) => ({ value: agent, label: agent.name }))}
      onChange={(value) => onChange(value)}
    />
  </div>
);

export default AgentSelect;
