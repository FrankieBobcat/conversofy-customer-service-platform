import { useEffect, useState, memo } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureHighlights from "@/components/FeatureHighlights";
import HowItWorks from "@/components/HowItWorks";
import BusinessSolutions from "@/components/BusinessSolutions";
import TryVirtualAgent from "@/components/TryVirtualAgent";
import Blog from "@/components/Blog";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { SEO, createOrganizationSchema, createWebSiteSchema } from "@/components/SEO";

function Home() {
  // State to control when to show the parallax background
  const [showParallaxBg, setShowParallaxBg] = useState(false);

  // Only render parallax effects after initial load to ensure proper positioning
  useEffect(() => {
    // Use requestAnimationFrame for better performance
    const timer = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        setShowParallaxBg(true);
      });
    }, 500);
    
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="AI-Powered Customer Service Automation"
        description="Transform your customer service with AI chatbots and automation solutions. Simple, effective, and affordable customer service tools for businesses of all sizes."
        keywords="AI chatbot, customer service automation, customer support, AI customer service, chatbot platform, automated support, customer service software"
        structuredData={[createOrganizationSchema(), createWebSiteSchema()]}
      />
      <Header />
      {showParallaxBg && <ParallaxBackground count={25} />}
      <main>
        <Hero />
        <FeatureHighlights />
        <HowItWorks />
        <BusinessSolutions />
        <TryVirtualAgent />
        <Blog />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

// Memoize the Home component to prevent unnecessary re-renders
export default memo(Home);
