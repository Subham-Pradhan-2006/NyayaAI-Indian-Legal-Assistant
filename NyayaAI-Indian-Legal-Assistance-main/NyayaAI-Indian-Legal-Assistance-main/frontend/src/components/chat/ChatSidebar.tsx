"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Scale,
  Baby,
  Languages,
  Trash2,
  Info,
  ChevronRight,
} from "lucide-react";
import { ChatOptions } from "@/lib/types";

interface Props {
  options: ChatOptions;
  setOptions: (opts: ChatOptions) => void;
  onClear: () => void;
  messageCount: number;
  ollamaStatus: "unknown" | "ok" | "error";
}

export default function ChatSidebar({
  options,
  setOptions,
  onClear,
  messageCount,
  ollamaStatus,
}: Props) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden lg:flex w-64 shrink-0 flex-col border-r"
      style={{
        background: "rgba(6,11,23,0.9)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Logo */}
      <div className="p-5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #ff8c1a, #f07000)" }}
          >
            <Scale className="w-4 h-4 text-white" />
          </div>
          <div>
            <div
              className="text-base font-bold leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient-saffron">Nyaya</span>
              <span className="text-white">AI</span>
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
              Indian Legal Assistant
            </div>
          </div>
        </Link>
      </div>

      {/* Session info */}
      <div className="p-4">
        <div
          className="p-3 rounded-xl text-xs"
          style={{
            background: "var(--bg-glass)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span>Session</span>
            <span style={{ color: "var(--text-secondary)" }}>
              {messageCount} message{messageCount !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
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
            <span>
              Ollama{" "}
              {ollamaStatus === "ok"
                ? "connected"
                : ollamaStatus === "error"
                ? "offline"
                : "checking..."}
            </span>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="px-4 flex-1">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          Response Mode
        </p>

        <div className="space-y-2">
          {/* ELI5 toggle */}
          <button
            onClick={() => setOptions({ ...options, eli5: !options.eli5 })}
            className="w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left"
            style={{
              background: options.eli5
                ? "rgba(251,191,36,0.1)"
                : "var(--bg-glass)",
              border: `1px solid ${
                options.eli5 ? "rgba(251,191,36,0.25)" : "var(--border-subtle)"
              }`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <Baby
                className="w-4 h-4"
                style={{ color: options.eli5 ? "#fbbf24" : "var(--text-muted)" }}
              />
              <div>
                <p
                  className="text-xs font-medium"
                  style={{
                    color: options.eli5 ? "#fbbf24" : "var(--text-secondary)",
                  }}
                >
                  ELI5 Mode
                </p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                  Explain like I'm 10
                </p>
              </div>
            </div>
            <div
              className="w-8 h-4 rounded-full relative transition-all duration-200"
              style={{
                background: options.eli5
                  ? "rgba(251,191,36,0.4)"
                  : "rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="absolute top-0.5 w-3 h-3 rounded-full transition-all duration-200"
                style={{
                  background: options.eli5 ? "#fbbf24" : "var(--text-muted)",
                  left: options.eli5 ? "calc(100% - 14px)" : "2px",
                }}
              />
            </div>
          </button>

          {/* Hindi toggle */}
          <button
            onClick={() => setOptions({ ...options, hindi: !options.hindi })}
            className="w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left"
            style={{
              background: options.hindi
                ? "rgba(77,122,255,0.1)"
                : "var(--bg-glass)",
              border: `1px solid ${
                options.hindi
                  ? "rgba(77,122,255,0.25)"
                  : "var(--border-subtle)"
              }`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <Languages
                className="w-4 h-4"
                style={{
                  color: options.hindi
                    ? "var(--accent-blue)"
                    : "var(--text-muted)",
                }}
              />
              <div>
                <p
                  className="text-xs font-medium"
                  style={{
                    color: options.hindi
                      ? "var(--accent-blue)"
                      : "var(--text-secondary)",
                  }}
                >
                  Hindi Translation
                </p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                  हिंदी में उत्तर
                </p>
              </div>
            </div>
            <div
              className="w-8 h-4 rounded-full relative transition-all duration-200"
              style={{
                background: options.hindi
                  ? "rgba(77,122,255,0.4)"
                  : "rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="absolute top-0.5 w-3 h-3 rounded-full transition-all duration-200"
                style={{
                  background: options.hindi
                    ? "var(--accent-blue)"
                    : "var(--text-muted)",
                  left: options.hindi ? "calc(100% - 14px)" : "2px",
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="p-4 border-t space-y-2" style={{ borderColor: "var(--border-subtle)" }}>
        {messageCount > 0 && (
          <button
            onClick={onClear}
            className="w-full flex items-center gap-2 p-2.5 rounded-xl text-xs transition-all duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#f87171";
              e.currentTarget.style.background = "rgba(248,113,113,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear conversation
          </button>
        )}

        {/* Disclaimer */}
        <div
          className="p-3 rounded-xl text-xs leading-relaxed"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          <div className="flex items-start gap-1.5">
            <Info className="w-3 h-3 shrink-0 mt-0.5" />
            <span>
              For informational purposes only. Consult a lawyer for legal advice.
            </span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
