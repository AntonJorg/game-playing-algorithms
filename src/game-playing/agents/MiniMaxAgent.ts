import { Game, State } from "../games/Game";
import { Agent } from "./Agents";
import { hashCode } from "../../utils";


export class MiniMaxAgent extends Agent {
    static label = "MiniMax Agent"

    rootPlayer: number = 0

    timeLimit: number = 10000

    transpositionTable: Map<string, [number, any]> = new Map()

    // Statistics
    searched: number = 0
    transpositions: number = 0

    constructor(game: Game) {
        super(game)

        this.game = game
    }

    takeAction(state: State): any {
        if (state.applicable_actions().length === 0) {
            return null
        }

        this.rootPlayer = state.player

        let startTime = new Date().getTime()
        let t = 0
        let depth = 1
        let pastSearched = 0

        while (t = new Date().getTime(), (t - startTime) < this.timeLimit * 1000) {
            this.searched = 0
            this.transpositions = 0
            this.transpositionTable = new Map()

            var [v, action] = this.maxValue(state, -Infinity, Infinity, depth)

            console.log({ depth: depth, searched: this.searched, transpositions: this.transpositions })

            if (this.searched == pastSearched) {
                break
            }
            pastSearched = this.searched

            depth++
        }

        return action
    }

    private maxValue(state: State, alpha: number, beta: number, depth: number): [number, any] {
        this.searched++
        // Exit on terminal states, no action
        if (state.is_terminal()) {
            return [state.utility() * this.rootPlayer, undefined]
        }

        const stateHash = state.board.toString() + state.player.toString()

        // Check for transpositions
        const transposition = this.transpositionTable.get(stateHash)
        if (transposition !== undefined) {
            this.transpositions++
            return transposition
        }

        var v = -Infinity
        var action = undefined

        for (let a of state.applicable_actions()) {
            var w = this.minValue(this.game.result(state, a), alpha, beta, depth - 1)

            if (w > v) {
                v = w
                action = a
            }
            if (v >= beta) {
                this.transpositionTable.set(stateHash, [v, action])
                return [v, action]
            }
            alpha = Math.max(alpha, v)
        }

        this.transpositionTable.set(stateHash, [v, action])
        return [v, action]
    }

    private minValue(state: State, alpha: number, beta: number, depth: number): number {
        this.searched++
        // Exit on terminal states
        if (state.is_terminal() || (depth === 0)) {
            return state.utility() * this.rootPlayer
        }

        // Generate hash of current state
        const stateHash = state.board.toString() + state.player.toString()

        // Check for transpositions
        const transposition = this.transpositionTable.get(stateHash)
        if (transposition !== undefined) {
            this.transpositions++
            return transposition[0]
        }

        var v = Infinity

        for (let a of state.applicable_actions()) {

            v = Math.min(v, this.maxValue(this.game.result(state, a), alpha, beta, depth)[0])
            if (v <= alpha) {

                this.transpositionTable.set(stateHash, [v, null])
                return v
            }
            beta = Math.min(beta, v)
        }

        this.transpositionTable.set(stateHash, [v, null])
        return v
    }

}
