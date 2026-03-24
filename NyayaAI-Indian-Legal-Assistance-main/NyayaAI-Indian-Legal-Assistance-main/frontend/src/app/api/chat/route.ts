/**
 * Next.js App Router API Route: /api/chat
 *
 * Acts as a server-side proxy to the FastAPI backend.
 * Benefits:
 *  - Keeps backend URL hidden from the browser
 *  - Can add auth headers, rate limiting, logging here
 *  - Works in both dev (proxy) and production (direct)
 */

import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic server-side validation
    if (!body.query || typeof body.query !== "string") {
      return NextResponse.json(
        { detail: "Query is required and must be a string" },
        { status: 400 }
      );
    }

    if (body.query.trim().length === 0) {
      return NextResponse.json(
        { detail: "Query cannot be empty" },
        { status: 400 }
      );
    }

    if (body.query.length > 1000) {
      return NextResponse.json(
        { detail: "Query too long (max 1000 characters)" },
        { status: 400 }
      );
    }

    // Forward to FastAPI backend
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: body.query,
        eli5: body.eli5 ?? false,
        hindi: body.hindi ?? false,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: "Backend error",
      }));
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      {
        detail:
          "Failed to connect to NyayaAI backend. Is Ollama running?",
      },
      { status: 503 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "NyayaAI Chat API — use POST" },
    { status: 405 }
  );
}
