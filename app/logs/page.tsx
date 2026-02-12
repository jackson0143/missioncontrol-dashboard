"use client";

import { useState, useMemo } from "react";
import { logEntries, type LogEntry } from "@/lib/logs-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterBar, type LogFilters } from "@/components/logs/filter-bar";
import { LogRow } from "@/components/logs/log-row";
import { DetailPanel } from "@/components/logs/detail-panel";
import { StatsBar } from "@/components/logs/stats-bar";
import { Terminal } from "lucide-react";

export default function LogsPage() {
  const [filters, setFilters] = useState<LogFilters>({
    agentId: null,
    level: null,
    action: null,
    search: "",
  });
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  const filteredLogs = useMemo(() => {
    return logEntries.filter((log) => {
      if (filters.agentId && log.agentId !== filters.agentId) return false;
      if (filters.level && log.level !== filters.level) return false;
      if (filters.action && log.action !== filters.action) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !log.summary.toLowerCase().includes(q) &&
          !log.agentName.toLowerCase().includes(q) &&
          !log.detail.toLowerCase().includes(q) &&
          !(log.model ?? "").toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-dashed px-6 py-3">
        <PageHeader
          icon={Terminal}
          title="Logs"
          description="Real-time activity stream across all Clawd agents"
        />
      </div>

      <StatsBar logs={filteredLogs} />
      <FilterBar filters={filters} onChange={setFilters} resultCount={filteredLogs.length} />

      <div className="flex flex-1 overflow-hidden">
        <ScrollArea className="flex-1">
          <div>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <LogRow
                  key={log.id}
                  log={log}
                  isSelected={selectedLog?.id === log.id}
                  onClick={() =>
                    setSelectedLog(selectedLog?.id === log.id ? null : log)
                  }
                />
              ))
            ) : (
              <EmptyState
                icon={Terminal}
                message="No logs match your filters"
                hint="Try adjusting or clearing filters"
              />
            )}
          </div>
        </ScrollArea>

        {selectedLog && (
          <DetailPanel log={selectedLog} onClose={() => setSelectedLog(null)} />
        )}
      </div>
    </div>
  );
}
