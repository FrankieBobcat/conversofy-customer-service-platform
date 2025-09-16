import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Users, Award, Globe, Mail, Phone } from "lucide-react";
import ParallaxBackground from "@/components/ParallaxBackground";
import ParallaxSectionTitle from "@/components/ParallaxSectionTitle";
import ParallaxLayer from "@/components/ParallaxLayer";
import ScrollParallax from "@/components/ScrollParallax";
import OptimizedImage from "@/components/OptimizedImage";
import { useEffect, useState, useRef, memo } from "react";
import { SEO, createFAQSchema } from "@/components/SEO";

export default function AboutPage() {
  // State to control when to show the parallax background
  const [showParallaxBg, setShowParallaxBg] = useState(false);
  const scrollThrottleRef = useRef<number | null>(null);

  // Only render parallax effects after initial load to ensure proper positioning
  useEffect(() => {
    // Use requestAnimationFrame for better performance
    const timer = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        setShowParallaxBg(true);
      });
    }, 500);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => window.clearTimeout(timer);
  }, []);

  // FAQ data for structured data
  const aboutFAQs = [
    {
      question: "What is Conversofy?",
      answer: "Conversofy is an AI-powered customer service automation platform that provides chatbots and customer support solutions for businesses of all sizes, focusing on simplicity and effectiveness."
    },
    {
      question: "How does AI improve customer service?",
      answer: "AI automates routine inquiries, provides 24/7 support, ensures consistent responses, and allows human agents to focus on complex issues, improving overall efficiency and customer satisfaction."
    },
    {
      question: "What makes Conversofy different?",
      answer: "We prioritize simplicity over complexity, offer flat-fee pricing, provide genuine human connection alongside automation, and focus on effective solutions rather than feature-heavy platforms."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="About Conversofy"
        description="Learn about Conversofy's mission to transform customer service with AI-powered automation. Discover our story, values, and commitment to simplifying customer support."
        keywords="about conversofy, customer service automation, AI chatbot company, customer support solutions, business automation"
        type="website"
        structuredData={createFAQSchema(aboutFAQs)}
      />
      <Header />
      {showParallaxBg && <ParallaxBackground count={20} />}
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                <span className="highlight-text hover:scale-105 inline-block transition-transform duration-300 text-sky-500">About</span> Conversofy
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Transforming customer service with solutions that prioritize simplicity, 
                effectiveness, and genuine human connection.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          {/* Background parallax elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <ParallaxLayer speed={-0.05} className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/5">
              <div></div>
            </ParallaxLayer>
            <ParallaxLayer speed={0.07} translateX={true} className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-primary/10">
              <div></div>
            </ParallaxLayer>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ParallaxSectionTitle 
              title="Our Story"
              textColor="text-blue-500"
            />
            
            <div className="flex flex-col lg:flex-row gap-12 items-center mt-12">
              <ScrollParallax 
                className="lg:w-1/2" 
                speed={0.1} 
                direction="left"
              >
                <div>
                  <p className="text-lg text-gray-700 mb-6">
                    We founded Conversofy with a simple mission: make customer service accessible to businesses of all sizes without the complexity of traditional enterprise platforms.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    Our journey began when we noticed that small and medium-sized businesses were struggling with the same customer service challenges as large corporations, but without access to the same powerful tools.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    We believe that exceptional customer service shouldn't require a complex infrastructure or a steep learning curve. That's why we built Conversofy to be intuitive, powerful, and accessible.
                  </p>
                </div>
              </ScrollParallax>
              
              <ParallaxLayer 
                className="lg:w-1/2" 
                speed={0.15}
                translateY={true}
              >
                <div className="relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 transform hover:scale-[1.02]">
                  <OptimizedImage 
                    src="/attached_assets/pexels-fauxels-3182781.jpg" 
                    alt="Team discussing customer service solutions" 
                    className="w-full rounded-lg" 
                    width={600} 
                    height={400}
                    priority={false}
                    overlay={true}
                    overlayColor="bg-gradient-to-t from-black/30 to-transparent opacity-70"
                  />
                </div>
              </ParallaxLayer>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ParallaxSectionTitle 
              title="Our Values"
              textColor="text-blue-500"
              subtitleColor="text-gray-300"
            />
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <ScrollParallax direction="up" speed={0.1} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
                <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors">Customer First</h3>
                <p className="text-gray-300">
                  We design all our solutions with your customers' needs in mind, ensuring every interaction strengthens your relationship with them.
                </p>
              </ScrollParallax>
              
              <ScrollParallax direction="up" speed={0.15} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
                <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors">Excellence in Simplicity</h3>
                <p className="text-gray-300">
                  We believe that the most powerful tools should also be the easiest to use. We're constantly refining our platform to make it more intuitive without sacrificing functionality.
                </p>
              </ScrollParallax>
              
              <ScrollParallax direction="up" speed={0.2} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
                <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors">Inclusive Innovation</h3>
                <p className="text-gray-300">
                  We develop technology that's accessible to businesses of all sizes, ensuring that advanced customer service tools aren't just for enterprises with large budgets.
                </p>
              </ScrollParallax>
            </div>
          </div>
        </section>



        {/* Contact Information */}
        <section className="py-20 bg-gray-800 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ParallaxSectionTitle 
              title="Get In Touch"
              textColor="text-blue-500"
              subtitleColor="text-gray-300"
            />
            
            <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
              <div className="bg-gray-700/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600 hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-gray-300 mb-4">
                  Our friendly team is here to help.
                </p>
                <a href="mailto:hello@conversofy.com" className="text-primary hover:underline">
                  hello@conversofy.com
                </a>
              </div>
              
              <div className="bg-gray-700/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600 hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-gray-300 mb-4">
                  Mon-Fri from 8am to 5pm.
                </p>
                <a href="tel:+17242219876" className="text-primary hover:underline">
                  +1 (724) 221-9876
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}