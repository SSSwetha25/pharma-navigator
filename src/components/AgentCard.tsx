import { motion } from "framer-motion";
import { 
  TrendingUp, 
  FlaskConical, 
  FileText, 
  Truck, 
  BookOpen, 
  Globe,
  Brain,
  FileOutput,
  CheckCircle2,
  Loader2,
  AlertCircle
} from "lucide-react";
import { AgentType, AgentStatus } from "@/types/agent";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  "trending-up": TrendingUp,
  "flask": FlaskConical,
  "file-text": FileText,
  "truck": Truck,
  "book": BookOpen,
  "globe": Globe,
  "brain": Brain,
  "file-output": FileOutput,
};

const colorClasses: Record<string, string> = {
  market: "text-agent-market bg-agent-market/10 border-agent-market/30",
  clinical: "text-agent-clinical bg-agent-clinical/10 border-agent-clinical/30",
  patent: "text-agent-patent bg-agent-patent/10 border-agent-patent/30",
  supply: "text-agent-supply bg-agent-supply/10 border-agent-supply/30",
  research: "text-agent-research bg-agent-research/10 border-agent-research/30",
  web: "text-agent-web bg-agent-web/10 border-agent-web/30",
  master: "text-agent-master bg-agent-master/10 border-agent-master/30",
  report: "text-agent-report bg-agent-report/10 border-agent-report/30",
};

interface AgentCardProps {
  agent: AgentType;
  isCompact?: boolean;
}

export function AgentCard({ agent, isCompact = false }: AgentCardProps) {
  const Icon = iconMap[agent.icon] || Brain;
  const colorClass = colorClasses[agent.color] || colorClasses.master;

  const StatusIcon = () => {
    switch (agent.status) {
      case 'working':
        return <Loader2 className="h-3 w-3 animate-spin text-primary" />;
      case 'completed':
        return <CheckCircle2 className="h-3 w-3 text-success" />;
      case 'error':
        return <AlertCircle className="h-3 w-3 text-destructive" />;
      default:
        return null;
    }
  };

  if (isCompact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300",
          colorClass,
          agent.status === 'working' && "agent-pulse"
        )}
      >
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium">{agent.name}</span>
        <StatusIcon />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-card p-4 border transition-all duration-300",
        colorClass,
        agent.status === 'working' && "glow-effect"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded-lg", colorClass)}>
          <Icon className="h-5 w-5" />
        </div>
        <StatusIcon />
      </div>

      <h3 className="font-semibold text-sm mb-1">{agent.name}</h3>
      <p className="text-xs text-muted-foreground mb-3">{agent.description}</p>

      {agent.status === 'working' && agent.progress !== undefined && (
        <div className="relative h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${agent.progress}%` }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 scan-line" />
        </div>
      )}

      {agent.findings && agent.findings.length > 0 && (
        <div className="mt-3 space-y-1">
          {agent.findings.slice(0, 2).map((finding, i) => (
            <p key={i} className="text-xs text-muted-foreground truncate">
              • {finding}
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
}
