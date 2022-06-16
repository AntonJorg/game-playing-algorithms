import React, { createContext, FC, useReducer, useState } from "react";
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
    score: {
        agent1: number,
        agent2: number
    },
    autoReset: boolean
}

interface Context {
    appState: AppState,
    dispatch: React.Dispatch<ReducerAction>
}

type ReducerAction = { type: "set-game", payload: { game: Game, Board: FC<any> } }
    | { type: "set-state", payload: { state: State } }
    | { type: "set-agent", payload: { agent: Agent, index: 0 | 1 } }
    | { type: "agent1-win", payload: null }
    | { type: "agent2-win", payload: null }
    | { type: "reset-state", payload: null }
    | { type: "toggle-auto-reset", payload: null }


const game = new TicTacToeGame()
const state = game.initial_state
const agents = [new PlayerAgent(game), new RandomAgent(game)]
const Board = TicTacToeBoard
const score = {
    agent1: 0,
    agent2: 0
}
const autoReset = false

const initialState: AppState = { game, state, agents, Board, score, autoReset }


function reducer(appState: AppState, { type, payload }: ReducerAction) {
    switch (type) {
        case "set-game":
            return {
                ...appState,
                game: payload.game,
                state: payload.game.initial_state,
                Board: payload.Board,
                agents: appState.agents.map((agent) => new (Object.getPrototypeOf(agent).constructor)(game))
            }
        case "set-state":
            return {
                ...appState,
                state: payload.state
            }
        case "set-agent":
            let agents = appState.agents
            agents[payload.index] = payload.agent
            return {
                ...appState,
                agents
            }
        case "agent1-win":
            return {
                ...appState,
                score: {
                    agent1: appState.score.agent1 + 1,
                    agent2: appState.score.agent2
                }
            }
        case "agent2-win":
            return {
                ...appState,
                score: {
                    agent1: appState.score.agent1,
                    agent2: appState.score.agent2 + 1
                }
            }
        case "reset-state":
            return {
                ...appState,
                state: appState.game.initial_state
            }
        case "toggle-auto-reset":
            return {
                ...appState,
                autoReset: !appState.autoReset
            }
        default:
            return appState
    }
}

export function useAppState() {
    const [appState, dispatch] = useReducer(reducer, initialState)

    return { appState, dispatch }
}

const intialContext: Context = { appState: initialState, dispatch: undefined as unknown as React.Dispatch<ReducerAction> }

export const AppStateContext = createContext(intialContext)
