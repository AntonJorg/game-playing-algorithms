import { MCTSAgent } from "./MCTSAgent"
import { PlayerAgent } from "./PlayerAgent"
import { RandomAgent } from "./RandomAgent"

export type AgentType = typeof PlayerAgent | typeof RandomAgent | typeof MCTSAgent

export { Agent } from "./Agent"
export { PlayerAgent } from "./PlayerAgent"
export { RandomAgent } from "./RandomAgent"
export { MCTSAgent } from "./MCTSAgent"
