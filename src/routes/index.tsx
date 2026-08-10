import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Problems } from "@/components/site/Problems";
import { Compare } from "@/components/site/Compare";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Dashboard } from "@/components/site/Dashboard";
import { CtaSection, Footer } from "@/components/site/CtaSection";
import { Faq } from "@/components/site/Faq";

const title = "Ryan Wegner — Scale Past $100k/Month Without Living In Your DMs";
const description =
  "I help coaches and consultants install the systems behind three seven-figure businesses so they can scale past $100k/month without living in their DMs.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Stats />
      <Problems />
      <Compare />
      <HowItWorks />
      <Dashboard />
      <CtaSection />
      <Faq />
      <Footer />
    </main>
  );
}
