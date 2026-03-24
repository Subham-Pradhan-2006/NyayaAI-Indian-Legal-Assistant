"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      {/* Glassmorphism bar */}
      <div
        className="mx-4 mt-4 rounded-2xl px-6 py-3 flex items-center justify-between"
        style={{
          background: "rgba(10, 15, 30, 0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #ff8c1a, #f07000)" }}
            >
              <Scale className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient-saffron">Nyaya</span>
              <span className="text-white">AI</span>
            </span>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase">
              Legal Assistant
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {["Features", "How it Works"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <Link href="/chat" className="btn-primary text-sm py-2 px-4">
          <Sparkles className="w-3.5 h-3.5" />
          Ask NyayaAI
        </Link>
      </div>
    </motion.header>
  );
}
