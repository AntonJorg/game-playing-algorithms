import { Agent } from "./Agents";

export class RandomAgent extends Agent {
    name = "Random Agent";

    constructor(game: any) {
        super(game)
    }

    takeAction(state: any) {
        let actions = state.applicable_actions()
        let action = actions[Math.floor(Math.random() * actions.length)]

        return action
    }
}
