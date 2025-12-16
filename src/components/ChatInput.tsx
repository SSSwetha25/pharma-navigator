import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

const suggestedQueries = [
  "What are the top molecule repurposing opportunities for rare diseases?",
  "Identify unmet medical needs in oncology with high market potential",
  "Analyze GLP-1 patent landscape and whitespace opportunities",
];

export function ChatInput({ onSend, isLoading, placeholder }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (query: string) => {
    setInput(query);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-3">
      {showSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          {suggestedQueries.map((query, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(query)}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors text-left"
            >
              <Sparkles className="h-3 w-3 text-primary flex-shrink-0" />
              <span className="line-clamp-1">{query}</span>
            </button>
          ))}
        </motion.div>
      )}

      <div className="glass-card p-2">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(false)}
              placeholder={placeholder || "Enter your research question..."}
              className={cn(
                "w-full bg-transparent resize-none text-sm px-3 py-2 rounded-lg",
                "placeholder:text-muted-foreground focus:outline-none",
                "min-h-[44px] max-h-[200px]"
              )}
              rows={1}
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            variant="glow"
            size="icon"
            className="flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
