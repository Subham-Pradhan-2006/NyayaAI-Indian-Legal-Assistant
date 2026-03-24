"use client";

import { motion } from "framer-motion";
import { Scale, User, BookOpen, Gavel, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ChatMessage } from "@/lib/types";

interface Props {
  message: ChatMessage;
}

const sourceIcons: Record<string, React.ElementType> = {
  constitution: BookOpen,
  kanoon: Gavel,
  prs: FileText,
};

const sourceLabels: Record<string, string> = {
  constitution: "Constitution",
  kanoon: "Case Law",
  prs: "Legislation",
};

function highlightLegalTerms(text: string): string {
  const terms = [
    "Article", "Section", "Act", "Constitution", "Supreme Court",
    "High Court", "Fundamental Rights", "Parliament", "Lok Sabha",
    "Rajya Sabha", "Amendment", "Directive Principles", "Writ", "FIR",
    "Bail", "Petition", "Appeal", "Conviction", "Acquittal",
  ];
  let result = text;
  for (const term of terms) {
    result = result.replace(
      new RegExp(`\\b(${term}\\s*\\d*[A-Z]?)\\b`, "g"),
      `<mark class="legal-term">$1</mark>`
    );
  }
  return result;
}

export default function MessageBubble({ message }: Props) {
  const [showSources, setShowSources] = useState(false);
  const isUser = message.role === "user";
  const resp = message.response;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`chat-message flex gap-3 max-w-4xl ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
    >
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1"
        style={{
          background: isUser
            ? "rgba(77,122,255,0.2)"
            : "linear-gradient(135deg, #ff8c1a, #f07000)",
        }}
      >
        {isUser ? (
          <User className="w-4 h-4 text-blue-400" />
        ) : (
          <Scale className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Bubble */}
      <div className="flex-1 min-w-0">
        {isUser ? (
          <div
            className="px-4 py-3 rounded-2xl rounded-tr-sm text-sm"
            style={{
              background: "rgba(77,122,255,0.15)",
              border: "1px solid rgba(77,122,255,0.2)",
              color: "var(--text-primary)",
            }}
          >
            {message.content}
          </div>
        ) : (
          <div
            className="rounded-2xl rounded-tl-sm overflow-hidden"
            style={{
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Answer section */}
            {resp ? (
              <>
                {/* Main answer */}
                <div className="px-5 pt-5 pb-4">
                  <p
                    className="text-sm leading-relaxed text-white"
                    dangerouslySetInnerHTML={{
                      __html: highlightLegalTerms(resp.answer),
                    }}
                  />
                </div>

                {/* Legal basis */}
                {resp.legal_basis.length > 0 && (
                  <div
                    className="px-5 py-4 border-t"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Legal Basis
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {resp.legal_basis.map((basis, i) => (
                        <span
                          key={i}
                          className="badge-constitution"
                        >
                          {basis}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Simple explanation */}
                {resp.simple_explanation && (
                  <div
                    className="px-5 py-4 border-t"
                    style={{
                      borderColor: "var(--border-subtle)",
                      background: "var(--accent-jade-dim)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "var(--accent-jade)" }}
                    >
                      Simple Explanation
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {resp.simple_explanation}
                    </p>
                  </div>
                )}

                {/* ELI5 section */}
                {resp.eli5_explanation && (
                  <div
                    className="px-5 py-4 border-t"
                    style={{
                      borderColor: "var(--border-subtle)",
                      background: "rgba(251,191,36,0.05)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "#fbbf24" }}
                    >
                      🧒 Explain Like I'm 10
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {resp.eli5_explanation}
                    </p>
                  </div>
                )}

                {/* Hindi translation */}
                {resp.hindi_translation && (
                  <div
                    className="px-5 py-4 border-t"
                    style={{
                      borderColor: "var(--border-subtle)",
                      background: "rgba(77,122,255,0.05)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      🇮🇳 हिंदी अनुवाद
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {resp.hindi_translation}
                    </p>
                  </div>
                )}

                {/* Footer: confidence + sources */}
                <div
                  className="px-5 py-3 border-t flex items-center justify-between gap-2 flex-wrap"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`confidence-${resp.confidence.toLowerCase()}`}
                    >
                      {resp.confidence} Confidence
                    </span>
                    {resp.query_type && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{
                          background: "var(--bg-glass)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        {resp.query_type}
                      </span>
                    )}
                  </div>

                  {/* Sources toggle */}
                  {resp.sources?.length > 0 && (
                    <button
                      onClick={() => setShowSources(!showSources)}
                      className="flex items-center gap-1 text-xs transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {resp.sources.length} source{resp.sources.length > 1 ? "s" : ""}
                      {showSources ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>

                {/* Sources expanded */}
                {showSources && resp.sources.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-5 pb-4 space-y-2"
                  >
                    {resp.sources.map((src, i) => {
                      const Icon =
                        sourceIcons[src.source] || FileText;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs py-2 px-3 rounded-lg"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid var(--border-subtle)",
                          }}
                        >
                          <Icon
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: "var(--accent-saffron)" }}
                          />
                          <span
                            className="font-medium"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {sourceLabels[src.source] || src.source}
                          </span>
                          <span style={{ color: "var(--text-muted)" }}>
                            {src.title}
                          </span>
                          {src.score && (
                            <span
                              className="ml-auto font-mono"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {src.score}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </>
            ) : (
              // Fallback for error messages
              <div className="px-5 py-4">
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#f87171" }}
                >
                  {message.content}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Timestamp */}
        <p
          className="text-xs mt-1.5 px-1"
          style={{
            color: "var(--text-muted)",
            textAlign: isUser ? "right" : "left",
          }}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}
