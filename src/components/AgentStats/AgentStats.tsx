import { FC, useContext } from 'react';
import { AppStateContext } from '../../AppStateContext';
import { MCTSAgent } from '../../game-playing/agents/MCTSAgent';
import styles from './AgentStats.module.scss';


interface MCTSActionProps { action: any, node: any, totalPlayouts: number }

const MCTSAction: FC<MCTSActionProps> = ({ action, node, totalPlayouts }) => (
  <div className={styles.MCTSAction}>
    <p><b>Action: {JSON.stringify(action)}</b></p>
    <p>Plays: {Math.round(node.playouts / totalPlayouts * 1000) / 10}%  Winrate: {Math.round(node.utility / node.playouts * 1000) / 10}%</p>
  </div>
)

interface MCTSAgentStatsProps { agent: MCTSAgent }

const MCTSAgentStats: FC<MCTSAgentStatsProps> = ({ agent: { root } }) => {
  if (root) {
    var content = <div className={styles.MCTSAgentStats}><p><b>Rollouts:</b> {root.playouts.toLocaleString("en")} <b>Winrate:</b> {Math.round(root.utility / root.playouts * 1000) / 10}%</p>
      <div style={{ overflowY: "scroll" }}>
        {
          root.children.sort((c1, c2) => c2.node.playouts - c1.node.playouts).map((child, i) =>
            <MCTSAction key={i} totalPlayouts={root.playouts} {...child} />)
        }
      </div>
    </div>
  } else {
    var content = <div>
      No moves made.
    </div>
  }

  return content
}


interface AgentStatsProps { index: number }

const AgentStats: FC<AgentStatsProps> = ({ index }) => {

  const { appState: { agents }, dispatch } = useContext(AppStateContext)

  const agent = agents[index]

  const agentName = agent.getName()

  switch (agentName) {
    case "Player Agent":
      var content = <div>Fun fact: You're the only agent type that can read this message.</div>
      break
    case "Random Agent":
      var content = <div>This agent has no idea what it's doing.</div>
      break
    case "Monte Carlo Tree Search Agent":
      var mcts = agent as MCTSAgent
      var content = <MCTSAgentStats agent={mcts} />
      break
    default:
      var content = <div> Unknown agent type </div>
      break
  }

  return <div className={styles.AgentStats}>
    {content}
  </div>
};

export default AgentStats;
