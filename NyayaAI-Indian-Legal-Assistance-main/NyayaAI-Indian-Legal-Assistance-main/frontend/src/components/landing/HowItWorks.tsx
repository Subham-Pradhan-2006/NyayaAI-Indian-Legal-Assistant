"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Ask Your Legal Question",
    description:
      "Type any question about Indian law — constitutional rights, court cases, Acts, or legal procedures.",
    detail: "In plain English or Hindi",
  },
  {
    number: "02",
    title: "AI Classifies & Retrieves",
    description:
      "NyayaAI classifies your query and searches the most relevant index — Constitution, case law, or legislation.",
    detail: "Multi-index RAG pipeline",
  },
  {
    number: "03",
    title: "Mistral Reasons Locally",
    description:
      "Ollama runs Mistral on your machine to reason over the retrieved context. No cloud calls. No data sent.",
    detail: "100% local inference",
  },
  {
    number: "04",
    title: "Structured Legal Answer",
    description:
      "Receive a structured response: direct answer, legal basis (Articles & cases), simple explanation, and confidence.",
    detail: "Cited. Structured. Clear.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-4">
      {/* Divider line */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-16"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,140,26,0.3))",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "var(--accent-jade)" }}
          >
            How It Works
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From Question to{" "}
            <span className="text-gradient-jade">Legal Clarity</span>
            <br />
            in 4 Steps
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute left-[3.5rem] top-8 bottom-8 w-px"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,140,26,0.3), rgba(16,185,129,0.3))",
            }}
          />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 items-start group"
              >
                {/* Step number bubble */}
                <div className="relative shrink-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg relative z-10 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "var(--bg-glass)",
                      border: "1px solid rgba(255,140,26,0.25)",
                      color: "var(--accent-saffron)",
                      fontFamily: "var(--font-mono)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="flex-1 p-5 rounded-2xl transition-all duration-300 group-hover:border-orange-500/20"
                  style={{
                    background: "var(--bg-glass)",
                    border: "1px solid var(--border-subtle)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h3
                      className="text-lg font-semibold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.title}
                    </h3>
                    <span
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "var(--accent-jade-dim)",
                        color: "var(--accent-jade)",
                        border: "1px solid rgba(16,185,129,0.2)",
                      }}
                    >
                      {step.detail}
                    </span>
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
