import { Game, State, Player, Winner } from './Game';

export class TicTacToeGame extends Game {
    static label = "Tic Tac Toe"

    initial_state: TicTacToeState

    constructor(grid_size = 3) {
        super()

        let board = Array.from(new Array(grid_size), _ => Array(grid_size).fill(0));
        let scores = Array(2 * grid_size + 2).fill(0);

        let initial_state = new TicTacToeState(
            board,
            scores,
            1,
            grid_size
        )

        this.initial_state = initial_state
    }

    result(state: TicTacToeState, action: TicTacToeAction): TicTacToeState {
        const s = state.copy()

        s.board[action.row][action.col] = s.player

        s.scores[action.row] += s.player;

        s.scores[s.grid_size + action.col] += s.player;

        if (action.row === action.col) s.scores[2 * s.grid_size] += s.player;

        if (s.grid_size - 1 - action.col === action.row) s.scores[2 * s.grid_size + 1] += s.player;

        s.player *= -1

        return s
    }

}

export class TicTacToeState extends State {
    board: number[][]
    scores: number[]
    grid_size: number
    player: Player;

    constructor(board: number[][], scores: number[], player: Player, grid_size: number = 3) {
        super()
        this.board = board
        this.scores = scores
        this.player = player
        this.grid_size = grid_size
    }

    applicable_actions(): any[] {
        let moves: TicTacToeAction[] = [];
        for (let i = 0; i < this.grid_size; i++) {
            for (let j = 0; j < this.grid_size; j++) {
                if (this.board[i][j] === 0) {
                    moves = moves.concat({ row: i, col: j } as TicTacToeAction)
                }

            }
        }

        return moves
    }

    winner(): Winner {
        let winner: Winner = 0
        this.scores.forEach((score) => {
            if (score === this.grid_size) {
                winner = 1
            }
            if (score === -this.grid_size) {
                winner = -1
            }
        })

        return winner
    }

    copy(): TicTacToeState {
        return super.copy() as TicTacToeState
    }

}

export interface TicTacToeAction {
    row: number
    col: number
}

