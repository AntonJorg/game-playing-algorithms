import './App.scss';
import { useState, useEffect } from 'react';
import AgentSelect from './components/AgentSelect/AgentSelect';

import { Agent, PlayerAgent, RandomAgent, MCTSAgent, AgentType } from './game-playing/agents/Agents';
import GameBoard from './components/Boards/GameBoard/GameBoard';

import games from './game-playing/games/Games';

function App() {

  const [agents, setAgents] = useState<AgentType[]>([PlayerAgent, PlayerAgent])

  const game = new games[1].game()

  const agent = new MCTSAgent(game)

  const generateClickHandler = games[1].generateClickHandler

  return (
    <div className="App">
      <h1>Game Playing Algorithms</h1>
      <AgentSelect onChange={setAgents} />
      <GameBoard game={game} agents={agents} Board={games[1].Board} generateClickHandler={generateClickHandler} />
    </div>
  );
}

export default App;
