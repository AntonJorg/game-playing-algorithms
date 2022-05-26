import './App.scss';
import { useState, useEffect } from 'react';
import AgentsSelect from './components/AgentSelect/AgentsSelect';

import { Agent, PlayerAgent, RandomAgent, MCTSAgent, AgentType } from './game-playing/agents/Agents';
import GameBoard from './components/Boards/GameBoard/GameBoard';

import games from './game-playing/games/Games';

import { AppStateContext, useAppState } from './AppStateContext';
import GameSelect from './components/GameSelect/GameSelect';

function App() {

  const { appState, setAppState } = useAppState()

  // useEffect(() => console.log(appState))

  return (
    <div className="App">
      <h1>Game Playing Algorithms</h1>
      <AppStateContext.Provider value={{ appState, setAppState }}>
        <GameSelect />
        <AgentsSelect />
        <GameBoard />
      </AppStateContext.Provider>
    </div>
  );
}

export default App;
