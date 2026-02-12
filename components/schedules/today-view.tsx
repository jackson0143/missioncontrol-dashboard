import { agents } from "@/lib/data";
import { dayLabels, getTasksForDay, type CalendarTask } from "@/lib/schedules-data";
import { Panel } from "@/components/shared/panel";
import { Calendar } from "lucide-react";

function TodayCard({ task }: { task: CalendarTask }) {
  const agent = agents.find((a) => a.id === task.agentId);
  const color = agent?.color ?? "#71717A";

  return (
    <div
      className="flex items-center gap-4 rounded-xl px-4 py-3"
      style={{ backgroundColor: color + "CC" }}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {agent?.avatar ?? "?"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{task.name}</p>
        <p className="text-xs text-white/70">{task.agentName}</p>
      </div>
      <span className="shrink-0 text-sm font-bold text-white/90">{task.time}</span>
    </div>
  );
}

export function TodayView() {
  const today = new Date().getDay();
  const tasks = getTasksForDay(today);

  return (
    <div className="mx-6 space-y-4">
      <Panel>
        <div className="mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-amber-500" />
          <h2 className="text-sm font-bold text-foreground">
            {dayLabels[today]}&apos;s Schedule
          </h2>
          <span className="text-xs text-muted-foreground">
            {tasks.length} tasks
          </span>
        </div>

        {tasks.length > 0 ? (
          <div className="space-y-2">
            {tasks.map((task) => (
              <TodayCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No scheduled tasks for today
          </p>
        )}
      </Panel>
    </div>
  );
}
