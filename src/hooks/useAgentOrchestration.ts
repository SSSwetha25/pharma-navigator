import { useState, useCallback } from "react";
import { AgentType, AgentStatus, Message, ResearchFindings, ResearchReport, AgentActivity } from "@/types/agent";

const initialAgents: AgentType[] = [
  {
    id: "market",
    name: "Market Trends",
    description: "Analyzes market dynamics, competitive landscape, and commercial opportunities",
    icon: "trending-up",
    color: "market",
    status: "idle",
  },
  {
    id: "clinical",
    name: "Clinical Trials",
    description: "Searches clinical trial databases for relevant studies and outcomes",
    icon: "flask",
    color: "clinical",
    status: "idle",
  },
  {
    id: "patent",
    name: "Patent Landscape",
    description: "Analyzes IP portfolios, patent filings, and freedom to operate",
    icon: "file-text",
    color: "patent",
    status: "idle",
  },
  {
    id: "supply",
    name: "Supply Chain",
    description: "Evaluates trade data, manufacturing, and supply chain risks",
    icon: "truck",
    color: "supply",
    status: "idle",
  },
  {
    id: "research",
    name: "Research Docs",
    description: "Searches internal research documents and knowledge bases",
    icon: "book",
    color: "research",
    status: "idle",
  },
  {
    id: "web",
    name: "Web Intelligence",
    description: "Gathers real-time scientific and regulatory intelligence",
    icon: "globe",
    color: "web",
    status: "idle",
  },
];

// Simulated findings for demo
const generateMockFindings = (query: string): ResearchFindings => ({
  summary: `Based on comprehensive multi-source analysis, we identified several promising opportunities related to "${query}". The analysis reveals significant whitespace in the therapeutic area with favorable market dynamics and manageable competitive pressures.`,
  keyFindings: [
    {
      title: "Emerging Market Opportunity",
      description: "Market analysis indicates a $2.4B addressable market with 12% CAGR through 2030, driven by aging demographics and increased disease awareness.",
      source: "Market Trends Agent",
      confidence: "high",
      category: "opportunity",
    },
    {
      title: "Clinical Validation Signals",
      description: "Three Phase II trials show promising efficacy signals with favorable safety profiles. Two additional trials expected to read out in Q2 2025.",
      source: "Clinical Trials Agent",
      confidence: "high",
      category: "validation",
    },
    {
      title: "Patent Whitespace Identified",
      description: "Analysis reveals potential freedom to operate with novel formulation approaches. Key competitor patents expire 2026-2028.",
      source: "Patent Landscape Agent",
      confidence: "medium",
      category: "opportunity",
    },
    {
      title: "Supply Chain Considerations",
      description: "API sourcing concentrated in two regions. Recommend supply chain diversification strategy to mitigate geopolitical risks.",
      source: "Supply Chain Agent",
      confidence: "medium",
      category: "risk",
    },
  ],
  recommendations: [
    "Initiate target validation studies to confirm mechanism of action in disease-relevant models",
    "Engage regulatory consultants to map optimal development pathway and potential accelerated approval routes",
    "Conduct detailed freedom-to-operate analysis focusing on novel formulation space",
    "Establish secondary API supplier relationships to de-risk supply chain dependencies",
  ],
  dataSources: [
    { name: "ClinicalTrials.gov", type: "Clinical", relevance: 95 },
    { name: "USPTO/EPO Patents", type: "IP", relevance: 88 },
    { name: "IQVIA Market Data", type: "Market", relevance: 92 },
    { name: "Trade Statistics", type: "Supply", relevance: 75 },
    { name: "PubMed/Scientific", type: "Research", relevance: 90 },
  ],
});

export function useAgentOrchestration() {
  const [agents, setAgents] = useState<AgentType[]>(initialAgents);
  const [messages, setMessages] = useState<Message[]>([]);
  const [masterStatus, setMasterStatus] = useState<'idle' | 'orchestrating' | 'synthesizing' | 'completed'>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [currentReport, setCurrentReport] = useState<ResearchReport | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const updateAgentStatus = useCallback((agentId: string, status: AgentStatus, progress?: number, findings?: string[]) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status, progress, findings }
        : agent
    ));
  }, []);

  const resetAgents = useCallback(() => {
    setAgents(initialAgents);
  }, []);

  const simulateAgentWork = useCallback(async () => {
    const agentSequence = ['market', 'clinical', 'patent', 'supply', 'research', 'web'];
    const activities: AgentActivity[] = [];

    for (const agentId of agentSequence) {
      const agent = initialAgents.find(a => a.id === agentId);
      if (!agent) continue;

      updateAgentStatus(agentId, 'working', 0);
      activities.push({
        agentId,
        status: 'working',
        message: `${agent.name} agent started analysis...`,
        timestamp: new Date(),
      });

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        updateAgentStatus(agentId, 'working', progress);
      }

      const mockFindings = [
        `Analyzed ${Math.floor(Math.random() * 500) + 100} data points`,
        `Identified ${Math.floor(Math.random() * 10) + 3} relevant patterns`,
      ];

      updateAgentStatus(agentId, 'completed', 100, mockFindings);
      activities.push({
        agentId,
        status: 'completed',
        message: `${agent.name} agent completed analysis`,
        timestamp: new Date(),
      });
    }

    return activities;
  }, [updateAgentStatus]);

  const processQuery = useCallback(async (query: string) => {
    setIsLoading(true);
    setMasterStatus('orchestrating');
    resetAgents();

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate agent work
    const activities = await simulateAgentWork();

    // Synthesizing phase
    setMasterStatus('synthesizing');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate findings
    const findings = generateMockFindings(query);

    // Add assistant message with findings
    const assistantMessage: Message = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: "I've completed my analysis across all data sources. Here's what I found:",
      timestamp: new Date(),
      agentActivity: activities,
      findings,
    };
    setMessages(prev => [...prev, assistantMessage]);

    // Generate report
    setIsGeneratingReport(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const report: ResearchReport = {
      id: `report-${Date.now()}`,
      title: `Research Analysis: ${query.slice(0, 50)}...`,
      query,
      executiveSummary: findings.summary,
      findings,
      generatedAt: new Date(),
    };
    setCurrentReport(report);
    setIsGeneratingReport(false);

    setMasterStatus('completed');
    setIsLoading(false);
  }, [resetAgents, simulateAgentWork]);

  return {
    agents,
    messages,
    masterStatus,
    isLoading,
    currentReport,
    isGeneratingReport,
    processQuery,
  };
}
