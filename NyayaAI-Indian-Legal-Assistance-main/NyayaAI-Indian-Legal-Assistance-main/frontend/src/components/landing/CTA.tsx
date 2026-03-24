"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Scale } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,140,26,0.08), rgba(77,122,255,0.05))",
            border: "1px solid rgba(255,140,26,0.2)",
          }}
        >
          {/* Glow blob */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,140,26,0.15), transparent 70%)",
            }}
          />

          <Scale
            className="w-10 h-10 mx-auto mb-6"
            style={{ color: "var(--accent-saffron)" }}
          />

          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Know Your Rights.
            <br />
            <span className="text-gradient-saffron">Now.</span>
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Start asking legal questions. Free, private, and always accurate.
          </p>
          <Link href="/chat" className="btn-primary text-base px-8 py-3.5 group">
            Start a Legal Conversation
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t px-4 py-10" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #ff8c1a, #f07000)" }}
          >
            <Scale className="w-3.5 h-3.5 text-white" />
          </div>
          <span
            className="font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-gradient-saffron">Nyaya</span>
            <span className="text-white">AI</span>
          </span>
        </div>

        <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
          NyayaAI is for informational purposes only. Not a substitute for professional legal advice.
        </p>

        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Built with Mistral · LlamaIndex · FAISS
        </p>
      </div>
    </footer>
  );
}

export default CTA;
