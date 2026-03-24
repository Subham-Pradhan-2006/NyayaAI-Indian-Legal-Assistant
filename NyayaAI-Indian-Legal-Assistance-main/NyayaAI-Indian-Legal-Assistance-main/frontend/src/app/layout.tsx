import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NyayaAI – Indian Legal Assistant",
  description:
    "AI-powered Indian legal assistant. Get instant answers on Constitutional law, case law, and legislation — locally, privately, accurately.",
  keywords: ["Indian law", "legal AI", "constitution", "case law", "RTI", "legal assistant"],
  openGraph: {
    title: "NyayaAI – Indian Legal Assistant",
    description: "Instant answers on Indian law, powered by local AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <div className="mesh-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
