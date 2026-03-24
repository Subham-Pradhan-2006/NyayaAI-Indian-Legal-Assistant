import { LegalResponse, ChatOptions } from "./types";

// Uses Next.js API routes (/app/api/*) which proxy to FastAPI backend
// This keeps the backend URL server-side and handles CORS cleanly
const API_BASE = "/api";

export async function sendChatQuery(
  query: string,
  options: ChatOptions
): Promise<LegalResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      eli5: options.eli5,
      hindi: options.hindi,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `Request failed: ${response.status}`);
  }

  return response.json();
}

export async function checkHealth(): Promise<{
  status: string;
  ollama: string;
}> {
  const response = await fetch(`${API_BASE}/health`, { cache: "no-store" });
  if (!response.ok) return { status: "error", ollama: "unreachable" };
  return response.json();
}
