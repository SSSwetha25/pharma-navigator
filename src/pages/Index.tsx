import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { AgentOrchestrator } from "@/components/AgentOrchestrator";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ReportGenerator } from "@/components/ReportGenerator";
import { useAgentOrchestration } from "@/hooks/useAgentOrchestration";

const Index = () => {
  const {
    agents,
    messages,
    masterStatus,
    isLoading,
    currentReport,
    isGeneratingReport,
    processQuery,
  } = useAgentOrchestration();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6 h-[calc(100vh-140px)]">
          {/* Chat Area */}
          <div className="flex flex-col glass-card overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-agent-master/20 flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <svg
                          className="w-10 h-10 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
                        </svg>
                      </motion.div>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                      animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    Pharma Research Assistant
                  </h2>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Ask strategic research questions about molecules, markets, 
                    clinical trials, or innovation opportunities. Our multi-agent 
                    system will analyze multiple data sources in parallel.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs">
                    {['Market Analysis', 'Clinical Trials', 'Patent Search', 'Supply Chain', 'Scientific Literature'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <ChatInput
                onSend={processQuery}
                isLoading={isLoading}
                placeholder="e.g., Identify molecule repurposing opportunities for rare neurological diseases..."
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 overflow-y-auto">
            <AgentOrchestrator
              agents={agents}
              masterStatus={masterStatus}
            />
            <ReportGenerator
              report={currentReport}
              isGenerating={isGeneratingReport}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
