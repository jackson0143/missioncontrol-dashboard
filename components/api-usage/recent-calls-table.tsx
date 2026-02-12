import { recentCalls } from "@/lib/api-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Panel } from "@/components/shared/panel";
import { CodeBadge } from "@/components/shared/code-badge";
import { CheckCircle, XCircle } from "lucide-react";

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground ${className ?? ""}`}>
      {children}
    </th>
  );
}

export function RecentCallsTable() {
  return (
    <Panel padding="none" className="flex-1 overflow-hidden">
      <div className="border-b border-dashed px-4 py-3">
        <h2 className="text-sm font-bold text-foreground">Recent API Calls</h2>
        <p className="text-xs text-muted-foreground">
          Last {recentCalls.length} calls across all agents
        </p>
      </div>
      <ScrollArea className="h-[calc(100%-60px)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dashed text-left">
              <Th>Time</Th>
              <Th>Agent</Th>
              <Th>Model</Th>
              <Th className="text-right">Tokens In</Th>
              <Th className="text-right">Tokens Out</Th>
              <Th className="text-right">Cost</Th>
              <Th className="text-center">Status</Th>
            </tr>
          </thead>
          <tbody>
            {recentCalls.map((call) => (
              <tr
                key={call.id}
                className="border-b border-dashed border-stone-100 transition-colors hover:bg-stone-50 dark:border-zinc-700/50 dark:hover:bg-zinc-700/30"
              >
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {call.timestamp}
                </td>
                <td className="px-4 py-3 text-xs font-medium text-subtle">
                  {call.agentName}
                </td>
                <td className="px-4 py-3">
                  <CodeBadge>{call.model}</CodeBadge>
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs text-dim">
                  {call.tokensIn.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs text-dim">
                  {call.tokensOut.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs font-medium text-stone-800 dark:text-zinc-200">
                  ${call.cost.toFixed(3)}
                </td>
                <td className="px-4 py-3 text-center">
                  {call.status === "success" ? (
                    <CheckCircle className="mx-auto h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="mx-auto h-4 w-4 text-rose-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </Panel>
  );
}
