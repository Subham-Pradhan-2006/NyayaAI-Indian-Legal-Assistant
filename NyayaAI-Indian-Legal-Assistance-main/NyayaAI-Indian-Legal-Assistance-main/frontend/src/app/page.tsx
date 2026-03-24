import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import SampleQueries from "@/components/landing/SampleQueries";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="relative z-10 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <SampleQueries />
      <CTA />
      <Footer />
    </main>
  );
}
