import { Agent } from "./Agents";

export class PlayerAgent extends Agent {
    name = "Player Agent"

    takeAction(state: any): any {
        console.log("takeAction should not be called on the player agent!")
    }
}