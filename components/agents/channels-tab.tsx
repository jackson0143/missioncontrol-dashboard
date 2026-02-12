"use client";

import { useState, useEffect } from "react";
import { channelStatuses, type ChannelStatus } from "@/lib/agent-profile-data";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/shared/panel";
import { RefreshCw } from "lucide-react";

function ChannelCard({ channel }: { channel: ChannelStatus }) {
  const allConnected = channel.connected === channel.total;

  return (
    <Panel className="bg-stone-50 dark:bg-zinc-800/80">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-bold text-foreground">{channel.name}</h4>
          <p className="text-xs text-muted-foreground">{channel.type}</p>
        </div>
        <div className="space-y-0.5 text-right">
          <p className="text-xs text-subtle">
            <span className={`font-bold ${allConnected ? "text-emerald-500" : "text-amber-500"}`}>
              {channel.connected}/{channel.total}
            </span>{" "}
            connected
          </p>
          <p className="text-xs text-dim">{channel.configured} configured</p>
          <p className="text-xs text-dim">{channel.enabled} enabled</p>
          <p className="text-xs text-dim">groupPolicy: {channel.groupPolicy}</p>
          <p className="text-xs text-dim">streamMode: {channel.streamMode}</p>
          <p className="text-xs text-dim">dmPolicy: {channel.dmPolicy}</p>
        </div>
      </div>
    </Panel>
  );
}

export function ChannelsTab() {
  const [lastRefresh, setLastRefresh] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setLastRefresh(0);
    setTimeout(() => setRefreshing(false), 600);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <Panel padding="lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">Channels</h3>
            <p className="text-xs text-muted-foreground">
              Gateway-wide channel status snapshot.
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Last refresh: {lastRefresh}s ago
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          {channelStatuses.map((channel) => (
            <ChannelCard key={channel.name} channel={channel} />
          ))}
        </div>
      </Panel>
    </div>
  );
}
