"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-3 max-w-4xl mr-auto"
    >
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1"
        style={{ background: "linear-gradient(135deg, #ff8c1a, #f07000)" }}
      >
        <Scale className="w-4 h-4 text-white" />
      </div>

      {/* Bubble */}
      <div
        className="px-5 py-4 rounded-2xl rounded-tl-sm"
        style={{
          background: "var(--bg-glass)",
          border: "1px solid var(--border-subtle)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Bouncing dots */}
          <div className="flex items-center gap-1">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Searching legal database...
          </span>
        </div>
      </div>
    </motion.div>
  );
}
