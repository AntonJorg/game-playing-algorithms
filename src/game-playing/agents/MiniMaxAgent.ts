import { Game, State } from "../games/Game";
import { Agent } from "./Agents";

export class MiniMaxAgent extends Agent {
    static label = "MiniMax Agent"

    root: MiniMaxNode = undefined as unknown as MiniMaxNode

    constructor(game: Game) {
        super(game)

        this.game = game
    }

    takeAction(state: State): any {
        this.root = this.initializeNode(state)

    }

    private initializeNode(state: State, parent: MiniMaxNode | null = null, action: any | null = null): MiniMaxNode {
        let newNode: MiniMaxNode = {
            state: state,
            parent: parent,
            children: [],
            unexpandedActions: state.applicable_actions(),
        }

        if (parent) {
            let parentChildConnection: MiniMaxNodeChild = {
                action: action,
                node: newNode
            }

            parent.children = parent.children.concat(parentChildConnection)
        }

        return newNode
    }

}

interface MiniMaxNode {
    state: State
    parent: MiniMaxNode | null,
    children: MiniMaxNodeChild[],
    unexpandedActions: any[]
}

interface MiniMaxNodeChild {
    action: any,
    node: MiniMaxNode
}