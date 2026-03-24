"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";

import ChatSidebar from "./ChatSidebar";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import WelcomeScreen from "./WelcomeScreen";

import { sendChatQuery } from "@/lib/api";
import { ChatMessage, ChatOptions, LegalResponse } from "@/lib/types";

export default function ChatInterface() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<ChatOptions>({ eli5: false, hindi: false });
  const [ollamaStatus, setOllamaStatus] = useState<"unknown" | "ok" | "error">("unknown");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle pre-filled query from landing page
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && messages.length === 0) {
      handleSend(q);
    }
  }, []);

  // Check Ollama status
  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setOllamaStatus(d.ollama === "connected" ? "ok" : "error"))
      .catch(() => setOllamaStatus("error"));
  }, []);

  const handleSend = useCallback(
    async (query: string) => {
      if (!query.trim() || isLoading) return;

      // Add user message
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: query,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const response: LegalResponse = await sendChatQuery(query, options);

        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.answer,
          timestamp: new Date(),
          response,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err: unknown) {
        const errorMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            err instanceof Error
              ? `Error: ${err.message}`
              : "Something went wrong. Please ensure Ollama is running with Mistral.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, options]
  );

  const handleClear = () => setMessages([]);

  return (
    <div
      className="relative z-10 flex h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Sidebar */}
      <ChatSidebar
        options={options}
        setOptions={setOptions}
        onClear={handleClear}
        messageCount={messages.length}
        ollamaStatus={ollamaStatus}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div
          className="shrink-0 flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg transition-colors hover:bg-white/5"
              style={{ color: "var(--text-secondary)" }}
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #ff8c1a, #f07000)" }}
              >
                <Scale className="w-3.5 h-3.5 text-white" />
              </div>
              <span
                className="font-semibold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                NyayaAI
              </span>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background:
                  ollamaStatus === "ok"
                    ? "var(--accent-jade)"
                    : ollamaStatus === "error"
                    ? "#f87171"
                    : "var(--text-muted)",
              }}
            />
            {ollamaStatus === "ok"
              ? "Ollama connected"
              : ollamaStatus === "error"
              ? "Ollama offline"
              : "Checking..."}
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.length === 0 ? (
            <WelcomeScreen onQueryClick={handleSend} />
          ) : (
            <>
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </AnimatePresence>

              {isLoading && <TypingIndicator />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <ChatInput
          onSend={handleSend}
          isLoading={isLoading}
          options={options}
          setOptions={setOptions}
        />
      </div>
    </div>
  );
}
