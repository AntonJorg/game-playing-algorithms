
export abstract class Game {
    static label: string

    abstract initial_state: State

    abstract result(state: State, action: any): State
}

export abstract class State {
    abstract player: Player

    abstract board: any

    abstract applicable_actions(): any[]

    abstract utility(): number

    is_terminal(): boolean {
        return (this.utility() !== 0) || (this.applicable_actions().length === 0)
    }

    copy(): State {
        return Object.assign(
            Object.create(
                // Set the prototype of the new object to the prototype of the instance.
                // Used to allow new object behave like class instance.
                Object.getPrototypeOf(this),
            ),
            // Prevent shallow copies of nested structures like arrays, etc
            JSON.parse(JSON.stringify(this)),
        );
    }
}

export type Player = -1 | 1
export type Winner = -1 | 0 | 1