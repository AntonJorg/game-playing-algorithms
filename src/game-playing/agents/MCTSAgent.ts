import { Game, State } from "../games/Game";
import { Agent } from "./Agents";

export class MCTSAgent extends Agent {
    static label = "Monte Carlo Tree Search Agent"

    timeLimit = 2

    explorationWeight = 2 //Math.sqrt(2)

    root: MCTSNode | null = null

    constructor(game: Game) {
        super(game)

        // Why is this necesary?? Typescript explain
        this.game = game
    }

    takeAction(state: any) {
        if (state.applicable_actions().length === 0) {
            return null
        }

        let startTime = new Date().getTime()
        let t = 0
        let counter = 0

        this.root = this.initializeNode(state.copy())

        while (t = new Date().getTime(), (t - startTime) < this.timeLimit * 1000) {
            // Select leaf by UCT
            let leaf = this.select(this.root)

            // Expand child node of leaf
            let child = this.expand(leaf)

            // Simulate playout
            let result = this.simulate(child)

            // Backpropagate
            this.backPropagate(child, result)

            counter += 1
        }

        console.log("Rollouts:", this.root.playouts)

        // Robust child selection policy
        let playouts = this.root.children.map((child) => child.node.playouts)
        let robustIndex = argMax(playouts)

        return this.root.children[robustIndex].action
    }

    private select(node: MCTSNode): MCTSNode {

        if ((node.unexpandedActions.length !== 0) || (node.state.is_terminal())) return node

        let UCBS = node.children.map((child) => (this.UCB1(child.node)))

        let index = argMax(UCBS)

        return this.select(node.children[index].node)
    }

    private expand(leaf: MCTSNode): MCTSNode {
        if (leaf.state.is_terminal()) return leaf

        let action = leaf.unexpandedActions.pop()
        let state = this.game.result(leaf.state, action)
        let child = this.initializeNode(state, leaf, action)
        return child
    }

    private simulate(child: MCTSNode): number {
        let state = child.state.copy()

        while (!state.is_terminal()) {
            let actions = state.applicable_actions()

            // TODO: Better playout policy
            let action = actions[Math.floor(Math.random() * actions.length)]

            state = this.game.result(state, action)
        }

        return state.winner()
    }

    private backPropagate(node: MCTSNode, result: number) {
        // Backpropagate score
        node.playouts += 1
        if (result === -node.state.player) {
            node.utility += 1
        } else if (result === 0) {
            node.utility += .5
        }
        // Backpropagate expansion status
        if (node.parent) this.backPropagate(node.parent, result)
    }

    private UCB1(node: MCTSNode): number {
        let parent = node.parent as MCTSNode
        return node.utility / node.playouts + this.explorationWeight * Math.sqrt(Math.log(parent.playouts) / node.playouts)
    }

    private initializeNode(state: any, parent: MCTSNode | null = null, action: any | null = null): MCTSNode {
        let newNode: MCTSNode = {
            state: state,
            parent: parent,
            children: [],
            unexpandedActions: state.applicable_actions(),
            utility: 0,
            playouts: 0
        }

        if (parent) {
            let parentChildConnection: MCTSNodeChild = {
                action: action,
                node: newNode
            }

            parent.children = parent.children.concat(parentChildConnection)
        }

        return newNode
    }
}


interface MCTSNode {
    state: State
    parent: MCTSNode | null,
    children: MCTSNodeChild[],
    unexpandedActions: any[],
    utility: number,
    playouts: number
}

interface MCTSNodeChild {
    action: any,
    node: MCTSNode
}

// REWORK
function argMax(arr: number[]) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        };
    };

    return maxIndex;
};