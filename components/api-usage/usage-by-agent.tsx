import { agentUsage } from "@/lib/api-data";
import { getAgentColor } from "@/lib/data";
import { Panel } from "@/components/shared/panel";

export function UsageByAgent() {
  return (
    <Panel>
      <h2 className="text-sm font-bold text-foreground">Usage by Agent</h2>
      <p className="text-xs text-muted-foreground">
        Today&apos;s API consumption per agent
      </p>
      <div className="mt-4 grid grid-cols-7 gap-3">
        {agentUsage.map((agent) => (
          <div key={agent.agentId} className="text-center">
            <div
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: getAgentColor(agent.agentId) }}
            >
              {agent.agentName.slice(0, 2).toUpperCase()}
            </div>
            <p className="mt-1.5 text-xs font-medium text-subtle">
              {agent.agentName}
            </p>
            <p className="font-mono text-[11px] font-bold text-foreground">
              {agent.totalCalls}
            </p>
            <p className="text-[10px] text-muted-foreground">
              ${agent.totalCost.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
