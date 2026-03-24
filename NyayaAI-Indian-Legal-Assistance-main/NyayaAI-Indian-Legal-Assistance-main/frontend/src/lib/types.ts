export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  response?: LegalResponse;
}

export interface LegalResponse {
  answer: string;
  legal_basis: string[];
  simple_explanation: string;
  confidence: "High" | "Medium" | "Low";
  sources: Source[];
  query_type: string;
  eli5_explanation?: string;
  hindi_translation?: string;
}

export interface Source {
  source: string;
  title: string;
  page?: number;
  score?: number;
}

export interface ChatOptions {
  eli5: boolean;
  hindi: boolean;
}
