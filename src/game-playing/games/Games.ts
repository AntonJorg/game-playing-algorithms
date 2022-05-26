import { TicTacToeGame } from "./TicTacToe"
import { ConnectFourGame } from "./ConnectFour"

const games = [
    TicTacToeGame,
    ConnectFourGame
]

export default games

// Also allow games to be exported manually
export { TicTacToeGame } from "./TicTacToe"
export { ConnectFourGame } from "./ConnectFour"

