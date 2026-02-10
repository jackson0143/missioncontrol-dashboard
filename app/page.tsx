import { AgentsPanel } from "@/components/dashboard/AgentsPanel";
import { MissionQueue } from "@/components/dashboard/MissionQueue";
import { LiveFeed } from "@/components/dashboard/LiveFeed";

export default function Home() {
  return (
    <div className="flex h-full overflow-hidden">
      <AgentsPanel />
      <MissionQueue />
      <LiveFeed />
    </div>
  );
}
