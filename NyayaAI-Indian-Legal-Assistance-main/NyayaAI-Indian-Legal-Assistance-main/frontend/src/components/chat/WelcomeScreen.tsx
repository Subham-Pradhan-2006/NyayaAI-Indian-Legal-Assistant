"use client";

import { motion } from "framer-motion";
import { BookOpen, Gavel, FileText } from "lucide-react";

const suggestions = [
  {
    icon: BookOpen,
    label: "Constitutional",
    query: "What are my fundamental rights under the Indian Constitution?",
    color: "saffron",
  },
  {
    icon: Gavel,
    label: "Case Law",
    query: "What was decided in the Kesavananda Bharati case?",
    color: "blue",
  },
  {
    icon: FileText,
    label: "Legislation",
    query: "How do I file an RTI application and what can I ask for?",
    color: "jade",
  },
  {
    icon: BookOpen,
    label: "Rights",
    query: "Can police arrest me without a warrant? What are my rights?",
    color: "saffron",
  },
  {
    icon: FileText,
    label: "Consumer",
    query: "What are my rights if I receive a defective product online?",
    color: "jade",
  },
  {
    icon: Gavel,
    label: "Privacy",
    query: "Is the right to privacy a fundamental right in India?",
    color: "blue",
  },
];

const colorMap = {
  saffron: {
    icon: "var(--accent-saffron)",
    bg: "var(--accent-saffron-dim)",
    border: "rgba(255,140,26,0.2)",
    label: "rgba(255,140,26,0.8)",
  },
  blue: {
    icon: "var(--accent-blue)",
    bg: "var(--accent-blue-dim)",
    border: "rgba(77,122,255,0.2)",
    label: "rgba(77,122,255,0.8)",
  },
  jade: {
    icon: "var(--accent-jade)",
    bg: "var(--accent-jade-dim)",
    border: "rgba(16,185,129,0.2)",
    label: "rgba(16,185,129,0.8)",
  },
};

interface Props {
  onQueryClick: (query: string) => void;
}

export default function WelcomeScreen({ onQueryClick }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        {/* Decorative emblem */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,140,26,0.2), transparent 70%)",
            }}
          />
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
            style={{
              background: "linear-gradient(135deg, #ff8c1a22, #f0700011)",
              border: "1px solid rgba(255,140,26,0.25)",
            }}
          >
            ⚖️
          </div>
        </div>

        <h2
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          How can I help you today?
        </h2>
        <p className="text-sm max-w-md" style={{ color: "var(--text-secondary)" }}>
          Ask any question about Indian law — constitutional rights, court
          judgments, or legislation. I'll give you a structured, cited answer.
        </p>
      </motion.div>

      {/* Suggestion grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-3xl">
        {suggestions.map((s, i) => {
          const colors = colorMap[s.color as keyof typeof colorMap];
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3, scale: 1.01 }}
              onClick={() => onQueryClick(s.query)}
              className="group text-left p-4 rounded-xl transition-all duration-200"
              style={{
                background: "var(--bg-glass)",
                border: `1px solid ${colors.border}`,
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: colors.bg }}
                >
                  <s.icon className="w-3.5 h-3.5" style={{ color: colors.icon }} />
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: colors.label }}
                >
                  {s.label}
                </span>
              </div>
              <p
                className="text-sm leading-snug group-hover:text-white transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                {s.query}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-xs">Enter</kbd> to send · <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-xs">Shift+Enter</kbd> for new line
      </motion.p>
    </div>
  );
}
