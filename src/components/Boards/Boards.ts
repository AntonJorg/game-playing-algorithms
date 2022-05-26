import TicTacToeBoard from "./TicTacToeBoard/TicTacToeBoard"
import ConnectFourBoard from "./ConnectFourBoard/ConnectFourBoard"

const boards = [
    TicTacToeBoard,
    ConnectFourBoard
]

export default boards

export { default as GameBoard } from "./GameBoard/GameBoard"
export { default as TicTacToeBoard } from "./TicTacToeBoard/TicTacToeBoard"
export { default as ConnectFourBoard } from "./ConnectFourBoard/ConnectFourBoard"

