import { Game, State } from "../games/Game"

export abstract class Agent {
    abstract name: string

    constructor(public game: Game) { }

    // Takes a state, returns an action (type depends on game)
    abstract takeAction(state: State): any
}
