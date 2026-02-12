"use client";

import { agents, tasks } from "@/lib/data";
import { agentProfiles } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/shared/panel";
import { StatCard } from "@/components/shared/stat-card";
import { CheckCircle, XCircle, Zap } from "lucide-react";

export function OverviewTab({ agentId }: { agentId: string }) {
  const agent = agents.find((a) => a.id === agentId);
  const profile = agentProfiles[agentId];
  const agentTasks = tasks.filter((t) => t.assignee === agentId);
  const completedTasks = agentTasks.filter((t) => t.status === "done");
  const activeTasks = agentTasks.filter(
    (t) => t.status === "in_progress" || t.status === "assigned"
  );

  if (!agent || !profile) return null;

  const stats = [
    { label: "Tasks Completed", value: profile.tasksCompleted.toString(), icon: CheckCircle, color: "text-emerald-500" },
    { label: "Tasks Failed", value: profile.tasksFailed.toString(), icon: XCircle, color: "text-rose-500" },
    {
      label: "Tokens Today",
      value: profile.tokensUsedToday >= 1_000_000
        ? `${(profile.tokensUsedToday / 1_000_000).toFixed(1)}M`
        : `${(profile.tokensUsedToday / 1_000).toFixed(0)}K`,
      icon: Zap,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={<span className="text-lg">{stat.value}</span>}
            color={stat.color}
          />
        ))}
      </div>

      {/* Description */}
      <Panel>
        <h3 className="text-sm font-bold text-foreground">About</h3>
        <p className="mt-2 text-sm leading-relaxed text-dim">
          {profile.description}
        </p>
      </Panel>

      {/* Active Tasks */}
      <Panel>
        <h3 className="text-sm font-bold text-foreground">Current Tasks</h3>
        <p className="text-xs text-muted-foreground">
          {activeTasks.length} active, {completedTasks.length} completed
        </p>
        {activeTasks.length > 0 ? (
          <div className="mt-3 space-y-2">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 rounded-lg border border-dashed px-3 py-2.5"
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    task.status === "in_progress"
                      ? "animate-pulse bg-blue-500"
                      : "bg-stone-400 dark:bg-zinc-600"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-subtle">
                    {task.title}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {task.status.replace("_", " ")}
                  </p>
                </div>
                <div className="flex gap-1">
                  {task.tags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="px-1.5 py-0 text-[9px] text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-xs italic text-muted-foreground">
            No active tasks
          </p>
        )}
      </Panel>
    </div>
  );
}
