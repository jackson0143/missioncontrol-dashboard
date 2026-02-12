import { agents, getAgentColor } from "@/lib/data";
import { dayLabels, getTasksForDay, type CalendarTask } from "@/lib/schedules-data";
import { Panel } from "@/components/shared/panel";

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

function TaskBlock({ task }: { task: CalendarTask }) {
  const color = getAgentColor(task.agentId);

  return (
    <div
      className="rounded-lg px-2.5 py-1.5"
      style={{ backgroundColor: color + "CC" }}
    >
      <p className="truncate text-[11px] font-medium text-white">
        {task.name}
      </p>
      <div className="mt-0.5 flex items-center gap-1.5">
        <AgentDot agentId={task.agentId} />
        <span className="truncate text-[9px] text-white/60">
          {task.agentName}
        </span>
        <span className="ml-auto text-[9px] text-white/70">{task.time}</span>
      </div>
    </div>
  );
}

export function WeeklyCalendar() {
  const today = new Date().getDay();

  return (
    <div className="mx-6 grid grid-cols-7 gap-2">
      {dayLabels.map((label, dayIndex) => {
        const tasks = getTasksForDay(dayIndex);
        const isToday = dayIndex === today;

        return (
          <Panel
            key={label}
            padding="none"
            className={`flex min-h-[220px] flex-col overflow-hidden ${
              isToday ? "ring-1 ring-amber-500/50" : ""
            }`}
          >
            <div className="border-b border-dashed px-3 py-2">
              <span
                className={`text-xs font-bold ${
                  isToday ? "text-amber-500" : "text-foreground"
                }`}
              >
                {label}
              </span>
              {isToday && (
                <span className="ml-1.5 text-[9px] font-medium text-amber-500/70">
                  TODAY
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-2">
              {tasks.map((task) => (
                <TaskBlock key={task.id} task={task} />
              ))}
            </div>
          </Panel>
        );
      })}
    </div>
  );
}
