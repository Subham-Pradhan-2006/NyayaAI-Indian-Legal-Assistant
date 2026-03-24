"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";

const pills = [
  { icon: Shield, label: "No Hallucination" },
  { icon: Zap, label: "< 2s Response" },
  { icon: Lock, label: "100% Private" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{ border: "1px solid rgba(255,140,26,0.3)" }}
        />
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-10"
          style={{ border: "1px solid rgba(255,140,26,0.2)" }}
        />
        <div
          className="absolute w-[1100px] h-[1100px] rounded-full opacity-5"
          style={{ border: "1px solid rgba(255,140,26,0.15)" }}
        />
        {/* Center glow */}
        <div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,140,26,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-medium tracking-wide"
          style={{
            background: "rgba(255,140,26,0.1)",
            border: "1px solid rgba(255,140,26,0.25)",
            color: "var(--accent-saffron)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Powered by Mistral · Runs 100% Locally
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-white">Your Personal</span>
          <br />
          <span className="text-gradient-saffron">Indian Law</span>
          <br />
          <span className="text-white">Expert</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
        >
          Get precise answers on the Indian Constitution, landmark case law,
          and legislation — in plain language. No expensive lawyers. No
          guesswork. No privacy risk.
        </motion.p>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {pills.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
              style={{
                background: "var(--bg-glass)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: "var(--accent-jade)" }} />
              {label}
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/chat" className="btn-primary text-base px-8 py-3.5 group">
            Ask a Legal Question
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a href="#how-it-works" className="btn-ghost text-base">
            See how it works
          </a>
        </motion.div>

        {/* Floating query preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass-card p-4 max-w-xl mx-auto text-left"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs"
              style={{ background: "var(--accent-saffron-dim)", color: "var(--accent-saffron)" }}
            >
              ⚖
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Sample Query</p>
              <p className="text-sm text-white">
                "What are my fundamental rights if I am arrested by the police?"
              </p>
            </div>
          </div>
          <div
            className="mt-3 pt-3 text-xs"
            style={{
              borderTop: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            <span className="badge-constitution mr-2">Article 22</span>
            <span className="badge-case mr-2">D.K. Basu Case</span>
            <span className="badge-prs">CrPC Section 50</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
