"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Send, Baby, Languages, Loader2 } from "lucide-react";
import { ChatOptions } from "@/lib/types";

interface Props {
  onSend: (query: string) => void;
  isLoading: boolean;
  options: ChatOptions;
  setOptions: (opts: ChatOptions) => void;
}

export default function ChatInput({ onSend, isLoading, options, setOptions }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    // Auto-resize
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const toggle = (key: keyof ChatOptions) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  return (
    <div
      className="shrink-0 px-4 pb-6 pt-3 border-t"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      {/* Options bar */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <button
          onClick={() => toggle("eli5")}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
          style={{
            background: options.eli5
              ? "rgba(251,191,36,0.15)"
              : "var(--bg-glass)",
            color: options.eli5 ? "#fbbf24" : "var(--text-muted)",
            border: `1px solid ${options.eli5 ? "rgba(251,191,36,0.3)" : "var(--border-subtle)"}`,
          }}
        >
          <Baby className="w-3.5 h-3.5" />
          ELI5
        </button>

        <button
          onClick={() => toggle("hindi")}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
          style={{
            background: options.hindi
              ? "rgba(77,122,255,0.15)"
              : "var(--bg-glass)",
            color: options.hindi ? "var(--accent-blue)" : "var(--text-muted)",
            border: `1px solid ${options.hindi ? "rgba(77,122,255,0.3)" : "var(--border-subtle)"}`,
          }}
        >
          <Languages className="w-3.5 h-3.5" />
          हिंदी
        </button>

        {(options.eli5 || options.hindi) && (
          <p className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>
            {[options.eli5 && "ELI5", options.hindi && "Hindi"]
              .filter(Boolean)
              .join(" + ")}{" "}
            mode active
          </p>
        )}
      </div>

      {/* Input box */}
      <div
        className="flex items-end gap-3 rounded-2xl p-3"
        style={{
          background: "var(--bg-glass)",
          border: "1px solid var(--border-subtle)",
          backdropFilter: "blur(16px)",
        }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask any Indian legal question... e.g. What are my rights under Article 21?"
          rows={1}
          className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed"
          style={{
            color: "var(--text-primary)",
            maxHeight: "160px",
            fontFamily: "var(--font-body)",
          }}
          disabled={isLoading}
        />

        <button
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{
            background:
              value.trim() && !isLoading
                ? "linear-gradient(135deg, #ff8c1a, #f07000)"
                : "rgba(255,255,255,0.06)",
            color:
              value.trim() && !isLoading ? "white" : "var(--text-muted)",
            cursor: !value.trim() || isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>

      <p
        className="text-xs text-center mt-2"
        style={{ color: "var(--text-muted)" }}
      >
        NyayaAI may make mistakes. Verify important legal information with a qualified lawyer.
      </p>
    </div>
  );
}
