import type { LogEntry } from "@/lib/logs-data";

export function StatsBar({ logs }: { logs: LogEntry[] }) {
  const errorCount = logs.filter((l) => l.level === "error").length;
  const warnCount = logs.filter((l) => l.level === "warn").length;
  const successCount = logs.filter((l) => l.level === "success").length;
  const totalTokens = logs.reduce((sum, l) => sum + (l.tokens ?? 0), 0);

  return (
    <div className="flex items-center gap-6 border-b border-dashed px-4 py-2">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Live
        </span>
      </div>
      <div className="flex items-center gap-4 text-[11px]">
        <span className="text-dim">
          <span className="font-bold text-stone-700 dark:text-zinc-200">{logs.length}</span> entries
        </span>
        <span className="text-dim">
          <span className="font-bold text-emerald-600 dark:text-emerald-400">{successCount}</span> success
        </span>
        <span className="text-dim">
          <span className="font-bold text-stone-700 dark:text-zinc-200">
            {totalTokens >= 1_000_000
              ? `${(totalTokens / 1_000_000).toFixed(1)}M`
              : `${(totalTokens / 1_000).toFixed(1)}K`}
          </span>{" "}
          tokens
        </span>
        {errorCount > 0 && (
          <span className="text-rose-500">
            <span className="font-bold">{errorCount}</span> errors
          </span>
        )}
        {warnCount > 0 && (
          <span className="text-amber-500">
            <span className="font-bold">{warnCount}</span> warnings
          </span>
        )}
      </div>
    </div>
  );
}
