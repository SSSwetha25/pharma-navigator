import { motion, AnimatePresence } from "framer-motion";
import { Brain } from "lucide-react";
import { AgentType } from "@/types/agent";
import { AgentCard } from "./AgentCard";
import { cn } from "@/lib/utils";

interface AgentOrchestratorProps {
  agents: AgentType[];
  masterStatus: 'idle' | 'orchestrating' | 'synthesizing' | 'completed';
}

export function AgentOrchestrator({ agents, masterStatus }: AgentOrchestratorProps) {
  const activeAgents = agents.filter(a => a.status !== 'idle');
  const isActive = masterStatus !== 'idle';

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={cn(
          "relative p-3 rounded-xl bg-agent-master/10 border border-agent-master/30",
          isActive && "glow-effect"
        )}>
          <Brain className="h-6 w-6 text-agent-master" />
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-agent-master"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-lg">Master Agent</h2>
          <p className="text-sm text-muted-foreground">
            {masterStatus === 'idle' && "Ready to orchestrate research"}
            {masterStatus === 'orchestrating' && "Coordinating worker agents..."}
            {masterStatus === 'synthesizing' && "Synthesizing findings..."}
            {masterStatus === 'completed' && "Analysis complete"}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Worker Agents
          </span>
          <span className="text-xs text-muted-foreground">
            {activeAgents.length} / {agents.length} active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <AgentCard agent={agent} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-border"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
            <span>Processing research query...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
