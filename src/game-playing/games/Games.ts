import { TicTacToeBoard, generateTicTacToeClickHandler } from "../../components/Boards/Boards"
import { TicTacToeGame } from "./TicTacToe"

import { ConnectFourBoard, generateConnectFourClickHandler } from "../../components/Boards/Boards"
import { ConnectFourGame } from "./ConnectFour"

const games = [
    { game: TicTacToeGame, Board: TicTacToeBoard, generateClickHandler: generateTicTacToeClickHandler },
    { game: ConnectFourGame, Board: ConnectFourBoard, generateClickHandler: generateConnectFourClickHandler }
]

export default games

// Also allow games to be exported manually
export { TicTacToeGame } from "./TicTacToe"
export { ConnectFourGame } from "./ConnectFour"

