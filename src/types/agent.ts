export type AgentStatus = 'idle' | 'working' | 'completed' | 'error';

export interface AgentType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: AgentStatus;
  progress?: number;
  findings?: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentActivity?: AgentActivity[];
  findings?: ResearchFindings;
}

export interface AgentActivity {
  agentId: string;
  status: AgentStatus;
  message: string;
  timestamp: Date;
}

export interface ResearchFindings {
  summary: string;
  keyFindings: KeyFinding[];
  recommendations: string[];
  dataSources: DataSource[];
}

export interface KeyFinding {
  title: string;
  description: string;
  source: string;
  confidence: 'high' | 'medium' | 'low';
  category: string;
}

export interface DataSource {
  name: string;
  type: string;
  relevance: number;
}

export interface ResearchReport {
  id: string;
  title: string;
  query: string;
  executiveSummary: string;
  findings: ResearchFindings;
  generatedAt: Date;
}
