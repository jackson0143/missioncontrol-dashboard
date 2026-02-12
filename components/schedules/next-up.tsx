import { agents, getAgentColor } from "@/lib/data";
import { nextUp } from "@/lib/schedules-data";
import { Panel } from "@/components/shared/panel";
import { Calendar } from "lucide-react";

function AgentDot({ agentId }: { agentId: string }) {
  const agent = agents.find((a) => a.id === agentId);
  if (!agent) return null;
  return (
    <span
      className="inline-block h-3 w-3 shrink-0 rounded-full text-[6px] font-bold leading-3 text-center text-white"
      style={{ backgroundColor: agent.color }}
      title={agent.name}
    >
      {agent.avatar}
    </span>
  );
}

export function NextUpSection() {
  return (
    <Panel className="mx-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-dim" />
        <h2 className="text-sm font-bold text-foreground">Next Up</h2>
      </div>
      <div className="mt-3 divide-y divide-dashed">
        {nextUp.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between py-2.5"
          >
            <div className="flex items-center gap-2">
              <AgentDot agentId={entry.agentId} />
              <span
                className="text-sm font-medium"
                style={{ color: getAgentColor(entry.agentId) }}
              >
                {entry.name}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{entry.eta}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
