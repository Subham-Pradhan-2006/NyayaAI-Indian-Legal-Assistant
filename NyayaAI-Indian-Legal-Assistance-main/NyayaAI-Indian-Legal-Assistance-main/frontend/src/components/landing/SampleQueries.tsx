"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const queries = [
  {
    q: "What are my rights if the police arrest me without a warrant?",
    tags: ["Article 22", "D.K. Basu Case"],
    type: "constitutional",
  },
  {
    q: "How can I file an RTI application and what is the process?",
    tags: ["RTI Act 2005", "Section 6"],
    type: "legislative",
  },
  {
    q: "What is the Basic Structure Doctrine of the Indian Constitution?",
    tags: ["Article 368", "Kesavananda Case"],
    type: "case_law",
  },
  {
    q: "Can my employer fire me without notice under Indian labour law?",
    tags: ["Industrial Disputes Act", "Section 25F"],
    type: "legislative",
  },
  {
    q: "What does Article 21 say about the right to privacy?",
    tags: ["Article 21", "Puttaswamy Case"],
    type: "constitutional",
  },
  {
    q: "What are consumer rights if I receive a defective product?",
    tags: ["Consumer Protection Act 2019", "Section 82"],
    type: "legislative",
  },
];

export default function SampleQueries() {
  const router = useRouter();

  const handleQueryClick = (query: string) => {
    router.push(`/chat?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "var(--accent-saffron)" }}
          >
            Try These
          </p>
          <h2
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Questions People Ask
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {queries.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              onClick={() => handleQueryClick(item.q)}
              className="group text-left p-5 rounded-2xl transition-all duration-300"
              style={{
                background: "var(--bg-glass)",
                border: "1px solid var(--border-subtle)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <p
                  className="text-sm font-medium text-white leading-relaxed"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.q}
                </p>
                <ArrowUpRight
                  className="w-4 h-4 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--accent-saffron)" }}
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{
                      background: "rgba(255,140,26,0.08)",
                      color: "var(--accent-saffron)",
                      border: "1px solid rgba(255,140,26,0.15)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
