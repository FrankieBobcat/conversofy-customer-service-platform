import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import ParallaxLayer from "./ParallaxLayer";
import ScrollParallax from "./ScrollParallax";

// Owner.com inspired animated badge component
const AnimatedBadge = ({ text }: { text: string }) => {
  // Split the text if it contains "Made Simple" to apply hover effect just to that part
  if (text.includes("Made Simple")) {
    const parts = text.split("Made Simple");
    return (
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-sky-950 border border-sky-800 text-sky-400 text-sm font-medium mb-4">
        <span className="mr-2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </span>
        {parts[0]}
        <span className="hover:scale-105 inline-block transition-transform duration-300 text-[1.05em] font-semibold text-sky-400">Made Simple</span>
      </div>
    );
  }
  
  // Default rendering without split
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-sky-950 border border-sky-800 text-sky-400 text-sm font-medium mb-4">
      <span className="mr-2 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
      </span>
      {text}
    </div>
  );
};

// Owner.com inspired floating elements with parallax effect
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating gradient circles with parallax */}
      <ParallaxLayer 
        speed={-0.15} 
        translateY={true} 
        scale={true}
        className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-sky-500/10 blur-3xl"
      >
        <div></div>
      </ParallaxLayer>
      
      <ParallaxLayer 
        speed={0.1} 
        translateY={true} 
        scale={true}
        className="absolute bottom-[15%] right-[10%] w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"
      >
        <div></div>
      </ParallaxLayer>
      
      {/* Animated dots grid with subtle parallax */}
      <ParallaxLayer
        speed={0.05}
        translateY={true}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(56, 189, 248, 0.2) 2px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </ParallaxLayer>
    </div>
  );
};

const Hero = () => {
  // Reference for animated elements
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set visible after a short delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative bg-black text-white overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32">
      {/* Background elements */}
      <FloatingElements />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left column - Text content */}
          <ScrollParallax 
            className={`lg:w-1/2 lg:pr-8 mb-16 lg:mb-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            speed={0.15} 
            direction="up"
            startOffset={0}
          >
            <h1 
              id="hero-title"
              ref={headingRef}
              className="display-heading mb-6"
            >
              Customer Service <span className="highlight-text hover:scale-105 inline-block transition-transform duration-300 text-sky-500">Made Simple</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
              We provide effective customer service solutions 
              without complex platforms — our straightforward approach means better results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={() => scrollToSection("contact")}
                className="gradient-button"
              >
                Get Started
              </button>
              
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="px-6 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white hover:bg-gray-800 transition-all"
              >
                How It Works
              </button>
            </div>
            
            {/* Trust indicators - similar to owner.com */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No complex platforms</span>
              </div>
              
              <div className="dot-separator"></div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No complicated contracting</span>
              </div>
            </div>
          </ScrollParallax>
          
          {/* Right column - Device mockups */}
          <ScrollParallax 
            className={`lg:w-1/2 lg:pl-16 relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            speed={0.08}
            direction="up"
            startOffset={25}
          >
            <div className="relative">
              {/* Computer display in background */}
              <div className="hidden lg:block absolute left-0 top-20 w-[450px] h-[280px] bg-gray-900 rounded-xl shadow-2xl rotate-[-8deg] z-0 border border-gray-800 overflow-hidden">
                {/* Computer screen frame */}
                <div className="bg-gray-900 p-3 rounded-lg h-full w-full">
                  <div className="bg-gray-950 h-full w-full rounded-lg overflow-hidden flex flex-col border border-gray-800">
                    {/* Browser header */}
                    <div className="h-9 bg-gray-900 border-b border-gray-800 flex items-center px-4">
                      <div className="flex space-x-2 mr-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 bg-gray-800 h-5 rounded-full flex items-center justify-center text-xs text-gray-400 px-4">
                        support-dashboard.company.com
                      </div>
                    </div>
                    
                    {/* Chat interface */}
                    <div className="flex-1 flex">
                      {/* Sidebar */}
                      <div className="w-1/4 bg-gray-900 border-r border-gray-800 p-2">
                        <div className="h-8 bg-gray-800 rounded mb-2"></div>
                        <div className="h-10 bg-sky-900/30 rounded mb-1 flex items-center px-2">
                          <div className="w-6 h-6 rounded-full bg-sky-800/30 mr-2"></div>
                          <div className="h-3 w-14 bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-10 bg-gray-800/50 rounded mb-1 flex items-center px-2">
                          <div className="w-6 h-6 rounded-full bg-gray-700 mr-2"></div>
                          <div className="h-3 w-12 bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-10 bg-gray-800/50 rounded mb-1 flex items-center px-2">
                          <div className="w-6 h-6 rounded-full bg-gray-700 mr-2"></div>
                          <div className="h-3 w-10 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                      
                      {/* Main chat area */}
                      <div className="w-3/4 flex flex-col bg-gray-950">
                        {/* Chat header */}
                        <div className="h-12 border-b border-gray-800 flex items-center px-4">
                          <div className="w-7 h-7 rounded-full bg-sky-900/30 mr-3 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0010-6c0 3.366-2.334 6-5 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <div className="h-3 w-28 bg-gray-700 rounded"></div>
                            <div className="h-2 w-16 bg-gray-800 rounded mt-1"></div>
                          </div>
                        </div>
                        
                        {/* Messages */}
                        <div className="flex-1 p-4">
                          {/* Message samples */}
                          <div className="flex mb-3">
                            <div className="w-7 h-7 rounded-full bg-sky-900/30 flex-shrink-0 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0010-6c0 3.366-2.334 6-5 6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-2 p-2 bg-gray-800 rounded-lg max-w-[70%] text-xs text-gray-300">
                              Hello! How can I assist you with your account today?
                            </div>
                          </div>
                          
                          {/* User message */}
                          <div className="flex justify-end mb-3">
                            <div className="p-2 bg-sky-900/50 text-sky-100 rounded-lg max-w-[70%] text-xs">
                              I need help troubleshooting an issue with my account
                            </div>
                          </div>
                          
                          {/* Support message */}
                          <div className="flex mb-3">
                            <div className="w-7 h-7 rounded-full bg-sky-900/30 flex-shrink-0 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0010-6c0 3.366-2.334 6-5 6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-2 p-2 bg-gray-800 rounded-lg max-w-[70%] text-xs text-gray-300">
                              I'd be happy to help. Can you tell me more about what specific issue you're experiencing?
                            </div>
                          </div>
                        </div>
                        
                        {/* Input area */}
                        <div className="h-10 border-t border-gray-800 p-2">
                          <div className="bg-gray-800 rounded-full flex items-center h-full px-3">
                            <div className="flex-1 h-3 bg-transparent"></div>
                            <div className="w-6 h-6 bg-sky-900/70 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main smartphone display */}
              <div className="relative z-10 mx-auto ml-10 lg:ml-20">
                <div className="w-[280px] h-[520px] bg-black rounded-[36px] border-[12px] border-gray-900 relative shadow-2xl overflow-hidden">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-lg z-10"></div>
                  
                  {/* Phone screen */}
                  <div className="w-full h-full bg-gray-950 overflow-hidden flex flex-col border border-gray-800">
                    {/* Phone status bar */}
                    <div className="bg-gray-900 text-sky-400 p-2 text-center text-sm font-medium border-b border-gray-800">
                      Customer Support
                    </div>
                    
                    {/* Chat messages */}
                    <div className="flex-1 p-4 bg-gray-950 overflow-hidden">
                      <div className="text-xs text-center text-gray-500 mb-3">Today, 3:45 PM</div>
                      
                      {/* Bot message */}
                      <div className="flex mb-4">
                        <div className="w-7 h-7 rounded-full bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                          </svg>
                        </div>
                        <div className="ml-2 py-2 px-3 bg-gray-800 rounded-br-xl rounded-tr-xl rounded-tl-xl text-gray-300 max-w-[80%]">
                          <p className="text-sm">Hello! Welcome to customer support. How can I help you today?</p>
                        </div>
                      </div>
                      
                      {/* User message */}
                      <div className="flex mb-4 justify-end">
                        <div className="mr-2 py-2 px-3 bg-sky-900/70 text-sky-100 rounded-bl-xl rounded-tl-xl rounded-tr-xl max-w-[80%]">
                          <p className="text-sm">I need to check on my order status</p>
                        </div>
                      </div>
                      
                      {/* Bot message */}
                      <div className="flex mb-4">
                        <div className="w-7 h-7 rounded-full bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                          </svg>
                        </div>
                        <div className="ml-2 py-2 px-3 bg-gray-800 rounded-br-xl rounded-tr-xl rounded-tl-xl text-gray-300 max-w-[80%]">
                          <p className="text-sm">I can help with that. Could you provide your order number please?</p>
                        </div>
                      </div>
                      
                      {/* User message */}
                      <div className="flex mb-4 justify-end">
                        <div className="mr-2 py-2 px-3 bg-sky-900/70 text-sky-100 rounded-bl-xl rounded-tl-xl rounded-tr-xl max-w-[80%]">
                          <p className="text-sm">It's ABC-12345</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Input field */}
                    <div className="p-2 border-t border-gray-800 flex items-center">
                      <input 
                        type="text" 
                        className="flex-1 text-sm py-2 px-3 rounded-full border border-gray-700 bg-gray-900 text-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        placeholder="Type your message..."
                        readOnly
                      />
                      <button className="ml-2 bg-sky-600 text-white rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollParallax>
        </div>
      </div>
    </section>
  );
};

export default Hero;