import './App.scss';
import { useState, useEffect } from 'react';
import AgentsSelect from './components/AgentSelect/AgentsSelect';

import { Agent, PlayerAgent, RandomAgent, MCTSAgent, AgentType } from './game-playing/agents/Agents';
import GameBoard from './components/Boards/GameBoard/GameBoard';

import games from './game-playing/games/Games';

import { AppStateContext, useAppState } from './AppStateContext';
import GameSelect from './components/GameSelect/GameSelect';
import ResultsStats from './components/ResultsStats/ResultsStats';
import AgentStats from './components/AgentStats/AgentStats';
import ResetButtons from './components/ResetButtons/ResetButtons';

function App() {

  const { appState, dispatch } = useAppState()

  return (
    <div className="App">
      <AppStateContext.Provider value={{ appState, dispatch }}>

        <div>
          <h1>Game Playing Algorithms</h1>
          <GameSelect />
          <AgentsSelect />
          <GameBoard />
          <ResetButtons />
        </div>
        <div>
          <ResultsStats />
          <AgentStats index={0} />
          <AgentStats index={1} />
        </div>

      </AppStateContext.Provider>
    </div>
  );
}

export default App;
