import React, { createContext, FC, useState } from "react";
import { TicTacToeBoard } from "./components/Boards/Boards";
import { Agent } from "./game-playing/agents/Agent";
import { PlayerAgent } from "./game-playing/agents/PlayerAgent";
import { RandomAgent } from "./game-playing/agents/RandomAgent";
import { Game, State } from "./game-playing/games/Game";
import { TicTacToeGame } from "./game-playing/games/TicTacToe";


interface AppState {
    game: Game,
    state: State,
    agents: Agent[]
    Board: FC<any>
}

interface Context {
    appState: AppState,
    setAppState: any
}

const game = new TicTacToeGame()
const state = game.initial_state
const agents = [new PlayerAgent(game), new RandomAgent(game)]
const Board = TicTacToeBoard

const initialValue: AppState = { game, state, agents, Board }


export function useAppState() {
    const [appState, setAppState] = useState(initialValue)

    return { appState, setAppState }
}

const intialContext: Context = { appState: initialValue, setAppState: null }

export const AppStateContext = createContext(intialContext)
