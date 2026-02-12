import { alwaysRunning } from "@/lib/schedules-data";
import { getAgentColor, hexToRgb } from "@/lib/data";
import { Panel } from "@/components/shared/panel";
import { Zap } from "lucide-react";

function agentPillStyle(agentId: string) {
  const hex = getAgentColor(agentId);
  const { r, g, b } = hexToRgb(hex);
  return {
    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.15)`,
    borderColor: `rgba(${r}, ${g}, ${b}, 0.35)`,
    color: hex,
  };
}

export function AlwaysRunningSection() {
  return (
    <Panel className="mx-6">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-amber-500" />
        <h2 className="text-sm font-bold text-foreground">Always Running</h2>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {alwaysRunning.map((task) => (
          <span
            key={task.id}
            className="rounded-full border px-3 py-1 text-xs font-medium"
            style={agentPillStyle(task.agentId)}
          >
            {task.name} &bull; {task.interval}
          </span>
        ))}
      </div>
    </Panel>
  );
}
