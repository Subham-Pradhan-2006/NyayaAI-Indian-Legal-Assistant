/**
 * Next.js App Router API Route: /api/health
 * Proxies health check to FastAPI backend.
 */

import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: "error", ollama: "unreachable" },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { status: "error", ollama: "unreachable", detail: "Backend offline" },
      { status: 503 }
    );
  }
}
