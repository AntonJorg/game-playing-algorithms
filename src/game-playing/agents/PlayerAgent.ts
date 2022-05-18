import { Agent } from "./Agents";

export class PlayerAgent extends Agent {
    static label = "Player Agent"

    takeAction(state: any): any {
        console.log("takeAction should not be called on the player agent!")
    }
}