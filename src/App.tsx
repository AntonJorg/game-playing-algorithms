import './App.scss';
import { useState, useEffect } from 'react';
import AgentSelect from './components/AgentSelect/AgentSelect';


import TicTacToeBoard from './components/Boards/TicTacToeBoard/TicTacToeBoard';

import { TicTacToeGame, ConnectFourGame } from './game-playing/games/Games';
import { Agent, PlayerAgent, RandomAgent, MCTSAgent } from './game-playing/agents/Agents';
import GameBoard from './components/Boards/GameBoard/GameBoard';
import ConnectFourBoard, { generateConnectFourHandler } from './components/Boards/ConnectFourBoard/ConnectFourBoard';

function App() {

  // The games list holds the game logic and the component displaying the board
  const games = [
    { game: TicTacToeGame, Board: TicTacToeBoard }
  ]

  const agents: (typeof Agent)[] = [
    PlayerAgent,
    RandomAgent,
    MCTSAgent
  ]

  const [gameIndex, setGameIndex] = useState(0)
  const [agentIndex, setAgentIndex] = useState(0)

  const game = new ConnectFourGame(8, 6)

  const agent = new MCTSAgent(game)

  const generateHandleClick = generateConnectFourHandler

  return (
    <div className="App">
      <h1>Intelligent Search</h1>
      <AgentSelect agents={agents} onChange={() => console.log("Changed")} />
      <GameBoard game={game} agent={agent} Board={ConnectFourBoard} generateHandleClick={generateHandleClick} />
    </div>
  );
}

export default App;
