"use client";

import { useEffect, useState, useCallback } from "react";
import { todayStats, agentUsage, recentCalls } from "@/lib/api-data";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Wallet,
  Zap,
  Hash,
  DollarSign,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface BalanceData {
  available_balance: number;
  voucher_balance: number;
  cash_balance: number;
}

function BalanceCard() {
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/balance");
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to fetch balance");
        return;
      }

      if (json.data) {
        setBalance(json.data);
      } else {
        setError("Unexpected response format");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const balancePercent = balance
    ? Math.min(100, Math.max(0, (balance.available_balance / 50) * 100))
    : 0;

  const isLow = balance ? balance.available_balance < 10 : false;

  return (
    <div className="col-span-2 rounded-xl border border-dashed border-stone-300 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-emerald-500 dark:bg-zinc-700">
            <Wallet className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400 dark:text-zinc-500">
              Moonshot Balance
            </p>
            <p className="text-xs text-stone-500 dark:text-zinc-400">
              Kimi K2.5
            </p>
          </div>
        </div>
        <button
          onClick={fetchBalance}
          disabled={loading}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-stone-500 transition-colors hover:bg-stone-100 disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-700"
        >
          <RefreshCw
            className={`h-3 w-3 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {error ? (
        <div className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600 dark:bg-rose-900/20 dark:text-rose-400">
          {error}
          {error.includes("not configured") && (
            <p className="mt-1 text-[10px] opacity-70">
              Add MOONSHOT_API_KEY to your .env.local file
            </p>
          )}
        </div>
      ) : loading && !balance ? (
        <div className="mt-4 space-y-2">
          <div className="h-8 w-32 animate-pulse rounded bg-stone-100 dark:bg-zinc-700" />
          <div className="h-2 w-full animate-pulse rounded-full bg-stone-100 dark:bg-zinc-700" />
        </div>
      ) : balance ? (
        <>
          <div className="mt-4 flex items-baseline gap-1">
            <span
              className={`text-3xl font-bold ${isLow ? "text-rose-500" : "text-stone-800 dark:text-zinc-100"}`}
            >
              ${balance.available_balance.toFixed(2)}
            </span>
            <span className="text-sm text-stone-400 dark:text-zinc-500">
              USD
            </span>
            {isLow && (
              <Badge className="ml-2 bg-rose-100 text-[10px] text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                Low Balance
              </Badge>
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-zinc-700">
            <div
              className={`h-full rounded-full transition-all ${
                isLow ? "bg-rose-500" : "bg-emerald-500"
              }`}
              style={{ width: `${balancePercent}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-[11px]">
            <div>
              <span className="text-stone-400 dark:text-zinc-500">
                Voucher:{" "}
              </span>
              <span className="font-medium text-stone-600 dark:text-zinc-300">
                ${balance.voucher_balance.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-stone-400 dark:text-zinc-500">Cash: </span>
              <span className="font-medium text-stone-600 dark:text-zinc-300">
                ${balance.cash_balance.toFixed(2)}
              </span>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default function ApiUsagePage() {
  const statCards = [
    {
      label: "Calls Today",
      value: todayStats.totalCalls.toLocaleString(),
      icon: Zap,
      color: "text-blue-500",
    },
    {
      label: "Tokens Used",
      value:
        todayStats.tokensUsed >= 1_000_000
          ? `${(todayStats.tokensUsed / 1_000_000).toFixed(1)}M`
          : `${(todayStats.tokensUsed / 1_000).toFixed(0)}K`,
      icon: Hash,
      color: "text-amber-500",
    },
    {
      label: "Est. Daily Cost",
      value: `$${todayStats.estimatedCost.toFixed(2)}`,
      icon: DollarSign,
      color: "text-violet-500",
    },
  ];

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-lg font-bold text-stone-800 dark:text-zinc-100">
          API Usage
        </h1>
        <p className="text-sm text-stone-500 dark:text-zinc-400">
          Monitor balance and API consumption across Clawd agents
        </p>
      </div>

      {/* Top Row: Balance Card + Stats */}
      <div className="grid grid-cols-5 gap-4">
        <BalanceCard />
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-dashed border-stone-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 dark:bg-zinc-700 ${stat.color}`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <p className="mt-3 text-2xl font-bold text-stone-800 dark:text-zinc-100">
                {stat.value}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400 dark:text-zinc-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Usage by Agent */}
      <div className="rounded-xl border border-dashed border-stone-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <h2 className="text-sm font-bold text-stone-800 dark:text-zinc-100">
          Usage by Agent
        </h2>
        <p className="text-xs text-stone-400 dark:text-zinc-500">
          Today&apos;s API consumption per agent
        </p>
        <div className="mt-4 grid grid-cols-7 gap-3">
          {agentUsage.map((agent) => (
            <div key={agent.agentId} className="text-center">
              <div
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: agent.color }}
              >
                {agent.agentName.slice(0, 2).toUpperCase()}
              </div>
              <p className="mt-1.5 text-xs font-medium text-stone-700 dark:text-zinc-300">
                {agent.agentName}
              </p>
              <p className="font-mono text-[11px] font-bold text-stone-800 dark:text-zinc-100">
                {agent.totalCalls}
              </p>
              <p className="text-[10px] text-stone-400 dark:text-zinc-500">
                ${agent.totalCost.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Call Log */}
      <div className="flex-1 overflow-hidden rounded-xl border border-dashed border-stone-300 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <div className="border-b border-dashed border-stone-200 px-4 py-3 dark:border-zinc-700">
          <h2 className="text-sm font-bold text-stone-800 dark:text-zinc-100">
            Recent API Calls
          </h2>
          <p className="text-xs text-stone-400 dark:text-zinc-500">
            Last {recentCalls.length} calls across all agents
          </p>
        </div>
        <ScrollArea className="h-[calc(100%-60px)]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dashed border-stone-200 text-left dark:border-zinc-700">
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-zinc-500">
                  Time
                </th>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-zinc-500">
                  Agent
                </th>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-zinc-500">
                  Model
                </th>
                <th className="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-zinc-500">
                  Tokens In
                </th>
                <th className="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-zinc-500">
                  Tokens Out
                </th>
                <th className="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-zinc-500">
                  Cost
                </th>
                <th className="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-zinc-500">
                  Latency
                </th>
                <th className="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-zinc-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call) => (
                <tr
                  key={call.id}
                  className="border-b border-dashed border-stone-100 transition-colors hover:bg-stone-50 dark:border-zinc-700/50 dark:hover:bg-zinc-700/30"
                >
                  <td className="px-4 py-3 text-xs text-stone-400 dark:text-zinc-500">
                    {call.timestamp}
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-stone-700 dark:text-zinc-300">
                    {call.agentName}
                  </td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-600 dark:bg-zinc-700 dark:text-zinc-400">
                      {call.model}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-stone-600 dark:text-zinc-400">
                    {call.tokensIn.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-stone-600 dark:text-zinc-400">
                    {call.tokensOut.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs font-medium text-stone-800 dark:text-zinc-200">
                    ${call.cost.toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-stone-500 dark:text-zinc-400">
                    {call.latency}ms
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
      </div>
    </div>
  );
}
