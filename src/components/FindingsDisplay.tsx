import { motion } from "framer-motion";
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { ResearchFindings, KeyFinding } from "@/types/agent";
import { cn } from "@/lib/utils";

interface FindingsDisplayProps {
  findings: ResearchFindings;
}

const confidenceColors = {
  high: "text-success bg-success/10 border-success/30",
  medium: "text-warning bg-warning/10 border-warning/30",
  low: "text-muted-foreground bg-muted border-border",
};

const categoryIcons: Record<string, React.ElementType> = {
  opportunity: Lightbulb,
  trend: TrendingUp,
  risk: AlertTriangle,
  validation: CheckCircle,
};

export function FindingsDisplay({ findings }: FindingsDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4"
      >
        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          Executive Summary
        </h4>
        <p className="text-sm text-muted-foreground">{findings.summary}</p>
      </motion.div>

      {/* Key Findings */}
      <div className="space-y-2">
        <h4 className="text-xs uppercase tracking-wider text-muted-foreground">
          Key Findings
        </h4>
        <div className="grid gap-2">
          {findings.keyFindings.map((finding, i) => (
            <KeyFindingCard key={i} finding={finding} index={i} />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {findings.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4"
        >
          <h4 className="text-sm font-semibold mb-3">Strategic Recommendations</h4>
          <ul className="space-y-2">
            {findings.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Data Sources */}
      {findings.dataSources.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {findings.dataSources.map((source, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
            >
              <ExternalLink className="h-3 w-3" />
              {source.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function KeyFindingCard({ finding, index }: { finding: KeyFinding; index: number }) {
  const CategoryIcon = categoryIcons[finding.category] || Lightbulb;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-md bg-primary/10">
            <CategoryIcon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h5 className="text-sm font-medium">{finding.title}</h5>
            <p className="text-xs text-muted-foreground mt-1">
              {finding.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">
                Source: {finding.source}
              </span>
            </div>
          </div>
        </div>
        <span className={cn(
          "text-xs px-2 py-1 rounded-md border",
          confidenceColors[finding.confidence]
        )}>
          {finding.confidence}
        </span>
      </div>
    </motion.div>
  );
}
