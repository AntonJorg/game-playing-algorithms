import { Game, State, Winner, Player } from "./Game";

export class ConnectFourGame extends Game {

    initial_state: ConnectFourState

    constructor(width = 8, height = 6) {
        super()

        let board = Array.from(new Array(width), _ => Array(height).fill(0));

        this.initial_state = new ConnectFourState(board, 1)
    }

    result(state: ConnectFourState, action: number): ConnectFourState {
        let s = state.copy() as ConnectFourState

        if (s.applicable_actions().filter((i) => (i === action)).length !== 1) {
            console.log("Bruh")
        }

        for (let i = 0; i < state.height; i++) {
            if (s.board[action][i] === 0) {
                s.board[action][i] = state.player
                break
            }
        }

        s.player *= -1
        return s
    }
}

export class ConnectFourState extends State {
    height: number
    width: number

    constructor(public board: number[][], public player: Player) {
        super()

        this.width = board.length
        this.height = board[0].length
    }

    applicable_actions(): any[] {
        // A column is valid iff the top element is empty
        return this.board.map((column, index) => {
            if (column[this.height - 1] === 0) {
                return index
            }
        }).filter((val) => val !== undefined)
    }

    winner(): Winner {
        if (this.areFourConnected(1)) {
            return 1
        } else if (this.areFourConnected(-1)) {
            return -1
        }
        return 0
    }


    private areFourConnected(player: Player) {
        // horizontalCheck 
        for (let j = 0; j < this.height - 3; j++) {
            for (let i = 0; i < this.width; i++) {
                if (this.board[i][j] == player && this.board[i][j + 1] == player && this.board[i][j + 2] == player && this.board[i][j + 3] == player) {
                    return true;
                }
            }
        }
        // verticalCheck
        for (let i = 0; i < this.width - 3; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.board[i][j] == player && this.board[i + 1][j] == player && this.board[i + 2][j] == player && this.board[i + 3][j] == player) {
                    return true;
                }
            }
        }
        // ascendingDiagonalCheck 
        for (let i = 3; i < this.width; i++) {
            for (let j = 0; j < this.height - 3; j++) {
                if (this.board[i][j] == player && this.board[i - 1][j + 1] == player && this.board[i - 2][j + 2] == player && this.board[i - 3][j + 3] == player)
                    return true;
            }
        }
        // descendingDiagonalCheck
        for (let i = 3; i < this.width; i++) {
            for (let j = 3; j < this.height; j++) {
                if (this.board[i][j] == player && this.board[i - 1][j - 1] == player && this.board[i - 2][j - 2] == player && this.board[i - 3][j - 3] == player)
                    return true;
            }
        }
        return false;
    }
}

