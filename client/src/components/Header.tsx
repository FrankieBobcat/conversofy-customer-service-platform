import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { MessageSquareText } from "lucide-react";

// Owner.com inspired animated button
const AnimatedButton = ({ 
  children, 
  onClick, 
  className = ""
}: { 
  children: React.ReactNode; 
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
      {children}
    </button>
  );
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    // If on blog page, navigate to home page first
    if (location === "/blog") {
      setLocation("/");
      
      // Need to set a timeout to wait for navigation to complete
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerHeight = document.querySelector("header")?.offsetHeight || 0;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - headerHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // On home page already, just scroll
      const element = document.getElementById(id);
      if (element) {
        const headerHeight = document.querySelector("header")?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerHeight,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled 
      ? 'backdrop-blur-lg bg-black/70 shadow-lg border-b border-gray-800' 
      : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 bg-sky-900/30 rounded-lg flex items-center justify-center mr-3 group-hover:bg-sky-800/50 transition-colors border border-sky-800/50">
                <MessageSquareText className="h-5 w-5 text-sky-400" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">Conversofy</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-base font-medium text-gray-300 hover:text-white animated-underline transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Home
            </Link>
            <button 
              onClick={() => scrollToSection("how-it-works")} 
              className="text-base font-medium text-gray-300 hover:text-white animated-underline transition-colors"
            >
              How It Works
            </button>
            <Link 
              href="/about" 
              className="text-base font-medium text-gray-300 hover:text-white animated-underline transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              About Us
            </Link>
            <Link 
              href="/blog" 
              className="text-base font-medium text-gray-300 hover:text-white animated-underline transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Blog
            </Link>
            
            <AnimatedButton onClick={() => scrollToSection("contact")}>
              Get Started
            </AnimatedButton>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMobileMenu}
              type="button" 
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - Owner.com style slide-down panel */}
      <div 
        className={`absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg transition-all duration-300 border-b border-gray-800 ${
          mobileMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-3">
          <Link 
            href="/" 
            className="block w-full text-left py-3 text-base font-medium text-gray-300 hover:text-white border-b border-gray-800"
            onClick={() => {
              window.scrollTo(0, 0);
              setMobileMenuOpen(false);
            }}
          >
            Home
          </Link>
          <button 
            onClick={() => scrollToSection("how-it-works")} 
            className="block w-full text-left py-3 text-base font-medium text-gray-300 hover:text-white border-b border-gray-800"
          >
            How It Works
          </button>
          <Link 
            href="/about" 
            className="block w-full text-left py-3 text-base font-medium text-gray-300 hover:text-white border-b border-gray-800"
            onClick={() => {
              window.scrollTo(0, 0);
              setMobileMenuOpen(false);
            }}
          >
            About Us
          </Link>
          <Link 
            href="/blog" 
            className="block w-full text-left py-3 text-base font-medium text-gray-300 hover:text-white border-b border-gray-800"
            onClick={() => {
              window.scrollTo(0, 0);
              setMobileMenuOpen(false);
            }}
          >
            Blog
          </Link>
          <AnimatedButton 
            onClick={() => scrollToSection("contact")}
            className="w-full mt-4"
          >
            Get Started
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
