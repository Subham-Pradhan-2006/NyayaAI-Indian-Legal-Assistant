"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Gavel,
  FileText,
  Brain,
  Languages,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Constitutional Authority",
    description:
      "Grounded in the Indian Constitution — all 448 articles, schedules, and amendments. Every answer cites the exact provision.",
    badge: "Constitution",
    color: "saffron",
  },
  {
    icon: Gavel,
    title: "Case Law Reasoning",
    description:
      "Backed by landmark Supreme Court and High Court judgments from Indian Kanoon. Precedent-aware legal reasoning.",
    badge: "Case Law",
    color: "blue",
  },
  {
    icon: FileText,
    title: "Legislative Clarity",
    description:
      "Plain-language summaries of Acts, Bills, and Rules sourced from PRS India — from RTI to GST.",
    badge: "Legislation",
    color: "jade",
  },
  {
    icon: Brain,
    title: "Zero Hallucination",
    description:
      "RAG architecture means NyayaAI answers only from verified legal documents. It tells you when it doesn't know.",
    badge: "Accuracy",
    color: "saffron",
  },
  {
    icon: Languages,
    title: "Hindi Support",
    description:
      "Get legal answers in Hindi with one click. Legal terms are preserved accurately. Accessible to all.",
    badge: "Bilingual",
    color: "jade",
  },
  {
    icon: ShieldCheck,
    title: "Complete Privacy",
    description:
      "Everything runs locally via Ollama. Your queries never leave your machine. No data collection, ever.",
    badge: "Private",
    color: "blue",
  },
];

const colorMap = {
  saffron: {
    icon: "var(--accent-saffron)",
    bg: "var(--accent-saffron-dim)",
    border: "rgba(255,140,26,0.15)",
    glow: "rgba(255,140,26,0.08)",
  },
  blue: {
    icon: "var(--accent-blue)",
    bg: "var(--accent-blue-dim)",
    border: "rgba(77,122,255,0.15)",
    glow: "rgba(77,122,255,0.08)",
  },
  jade: {
    icon: "var(--accent-jade)",
    bg: "var(--accent-jade-dim)",
    border: "rgba(16,185,129,0.15)",
    glow: "rgba(16,185,129,0.08)",
  },
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "var(--accent-saffron)" }}
          >
            Why NyayaAI
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built for{" "}
            <span className="text-gradient-saffron">Accuracy</span>,
            <br />
            Designed for{" "}
            <span className="text-gradient-jade">Everyone</span>
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const colors = colorMap[feat.color as keyof typeof colorMap];
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative p-6 rounded-2xl cursor-default transition-all duration-300"
                style={{
                  background: "var(--bg-glass)",
                  border: `1px solid ${colors.border}`,
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${colors.glow}, transparent 60%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: colors.bg }}
                >
                  <feat.icon className="w-5 h-5" style={{ color: colors.icon }} />
                </div>

                <h3
                  className="text-lg font-semibold text-white mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {feat.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
