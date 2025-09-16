import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CookieConsentProps {
  onAcceptAll: () => void;
  onCustomize: () => void;
  onRejectAll: () => void;
}

const CookieConsent = ({
  onAcceptAll,
  onCustomize,
  onRejectAll,
}: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Force show for now due to issues
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
    
    // Original code (commented out for now)
    // Check if user has already made a choice
    // const hasConsent = localStorage.getItem("cookieConsent");
    
    // if (!hasConsent) {
    //   // Show the banner after a short delay for better UX
    //   const timer = setTimeout(() => {
    //     setIsVisible(true);
    //   }, 1500);
    //   
    //   return () => clearTimeout(timer);
    // }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    onAcceptAll();
  };

  const handleCustomize = () => {
    // Don't store in localStorage yet, as user is customizing
    onCustomize();
  };

  const handleRejectAll = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
    onRejectAll();
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-gray-900 border-t border-gray-800 shadow-lg p-4 md:p-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-semibold text-white mb-2">We value your privacy</h3>
              <p className="text-gray-300 text-sm md:text-base">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors text-sm"
              >
                Reject All
              </button>
              <button
                onClick={handleCustomize}
                className="px-4 py-2 rounded-lg border border-sky-800 text-sky-400 hover:bg-sky-950/50 transition-colors text-sm"
              >
                Customise
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors text-sm"
              >
                Accept All
              </button>
            </div>
            
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;