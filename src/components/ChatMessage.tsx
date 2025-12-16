import { motion } from "framer-motion";
import { User, Bot, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Message } from "@/types/agent";
import { cn } from "@/lib/utils";
import { FindingsDisplay } from "./FindingsDisplay";
import { AgentCard } from "./AgentCard";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-agent-master/20 text-agent-master"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div className={cn(
        "flex-1 max-w-[80%]",
        isUser && "text-right"
      )}>
        <div className={cn(
          "inline-block rounded-xl px-4 py-3",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "glass-card"
        )}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>

        {message.agentActivity && message.agentActivity.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {message.agentActivity.length} agent activities
            </button>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 space-y-2"
              >
                {message.agentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{activity.message}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {message.findings && (
          <div className="mt-4">
            <FindingsDisplay findings={message.findings} />
          </div>
        )}

        <div className="mt-1">
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
