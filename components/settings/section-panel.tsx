import type { LucideIcon } from "lucide-react";
import { Panel } from "@/components/shared/panel";
import { Separator } from "@/components/ui/separator";

export function SectionPanel({
  id,
  title,
  description,
  icon: Icon,
  children,
  className,
}: {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div id={id}>
      <Panel className={className}>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent">
            <Icon className="h-3.5 w-3.5 text-dim" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">{title}</h2>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="divide-y divide-dashed">{children}</div>
      </Panel>
    </div>
  );
}
