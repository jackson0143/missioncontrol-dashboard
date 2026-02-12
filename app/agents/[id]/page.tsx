"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { agents } from "@/lib/data";
import { agentProfiles } from "@/lib/agent-profile-data";
import { AgentsPanel } from "@/components/shared/agents-panel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusDot } from "@/components/shared/status-dot";
import { RoleBadge } from "@/components/shared/role-badge";
import { CodeBadge } from "@/components/shared/code-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { OverviewTab } from "@/components/agents/overview-tab";
import { FilesTab } from "@/components/agents/files-tab";
import { ChannelsTab } from "@/components/agents/channels-tab";
import { Cpu, Clock, FileText, Radio, ArrowLeft } from "lucide-react";

export default function AgentProfilePage() {
  const params = useParams();
  const agentId = params.id as string;

  const agent = agents.find((a) => a.id === agentId);
  const profile = agentProfiles[agentId];

  if (!agent || !profile) {
    return (
      <div className="flex h-full overflow-hidden">
        <AgentsPanel />
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <EmptyState message="Agent not found" />
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium text-dim hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      <AgentsPanel />

      <div className="flex flex-1 flex-col overflow-hidden">
        <ScrollArea className="flex-1">
          <div className="p-6">
            {/* Back link */}
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-subtle"
            >
              <ArrowLeft className="h-3 w-3" />
              Dashboard
            </Link>

            {/* Agent Header */}
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback
                  style={{ backgroundColor: agent.color, color: "white" }}
                  className="text-lg font-bold"
                >
                  {agent.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-foreground">
                    {agent.name}
                  </h1>
                  <RoleBadge role={agent.role} className="px-2 py-0.5" />
                  <StatusDot status={agent.status} label />
                </div>
                <p className="mt-0.5 text-sm text-dim">{agent.title}</p>
                <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Cpu className="h-3 w-3" />
                    <CodeBadge>{profile.model}</CodeBadge>
                  </span>
                  <span>&middot;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Uptime {profile.uptime}
                  </span>
                  <span>&middot;</span>
                  <span>Last active {profile.lastActive}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="mt-6">
              <TabsList variant="line">
                <TabsTrigger value="overview" className="gap-1.5">
                  <Radio className="h-3.5 w-3.5" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="files" className="gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Files
                </TabsTrigger>
                <TabsTrigger value="channels" className="gap-1.5">
                  <Radio className="h-3.5 w-3.5" />
                  Channels
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <OverviewTab agentId={agentId} />
              </TabsContent>
              <TabsContent value="files" className="mt-4">
                <FilesTab agentId={agentId} />
              </TabsContent>
              <TabsContent value="channels" className="mt-4">
                <ChannelsTab />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
