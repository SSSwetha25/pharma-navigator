import { motion } from "framer-motion";
import { Brain, Activity, Beaker } from "lucide-react";

export function Header() {
  return (
    <header className="glass-card border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-agent-master/20 border border-primary/30">
                <Beaker className="h-6 w-6 text-primary" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-lg font-bold">
                <span className="gradient-text">PharmAI</span>
                <span className="text-foreground"> Research</span>
              </h1>
              <p className="text-xs text-muted-foreground">
                Agentic Intelligence for Pharma Innovation
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
              <Activity className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">System Online</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
              <Brain className="h-4 w-4 text-agent-master" />
              <span className="text-xs text-muted-foreground">6 Agents Ready</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
