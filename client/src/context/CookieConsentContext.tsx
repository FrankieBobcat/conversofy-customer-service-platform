import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the types of cookies we might track
export type CookieTypes = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

// Define the context state structure
type CookieConsentContextType = {
  consentGiven: boolean;
  showCustomizeModal: boolean;
  cookiePreferences: CookieTypes;
  setConsentGiven: (value: boolean) => void;
  setShowCustomizeModal: (value: boolean) => void;
  updateCookiePreferences: (preferences: Partial<CookieTypes>) => void;
  acceptAllCookies: () => void;
  rejectAllCookies: () => void;
};

// Create the context with default values
const CookieConsentContext = createContext<CookieConsentContextType>({
  consentGiven: false,
  showCustomizeModal: false,
  cookiePreferences: {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  },
  setConsentGiven: () => {},
  setShowCustomizeModal: () => {},
  updateCookiePreferences: () => {},
  acceptAllCookies: () => {},
  rejectAllCookies: () => {},
});

// Define props for provider component
type CookieConsentProviderProps = {
  children: ReactNode;
};

// Create the provider component
export const CookieConsentProvider = ({ children }: CookieConsentProviderProps) => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookieTypes>({
    necessary: true, // Always true as necessary cookies are required
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Load saved preferences on initial render
  useEffect(() => {
    const savedConsent = localStorage.getItem("cookieConsent");
    const savedPreferences = localStorage.getItem("cookiePreferences");
    
    if (savedConsent === "accepted" || savedConsent === "customized") {
      setConsentGiven(true);
      
      if (savedPreferences) {
        try {
          const preferences = JSON.parse(savedPreferences);
          setCookiePreferences(preferences);
        } catch (error) {
          console.error("Error parsing saved cookie preferences:", error);
        }
      }
    }
  }, []);

  // Update cookie preferences
  const updateCookiePreferences = (preferences: Partial<CookieTypes>) => {
    const updatedPreferences = { ...cookiePreferences, ...preferences };
    setCookiePreferences(updatedPreferences);
    
    // Save to localStorage
    localStorage.setItem("cookieConsent", "customized");
    localStorage.setItem("cookiePreferences", JSON.stringify(updatedPreferences));
    
    setConsentGiven(true);
    setShowCustomizeModal(false);
  };

  // Accept all cookies
  const acceptAllCookies = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    setCookiePreferences(allAccepted);
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
    
    setConsentGiven(true);
    setShowCustomizeModal(false);
  };

  // Reject all cookies except necessary ones
  const rejectAllCookies = () => {
    const allRejected = {
      necessary: true, // Always true
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    setCookiePreferences(allRejected);
    localStorage.setItem("cookieConsent", "rejected");
    localStorage.setItem("cookiePreferences", JSON.stringify(allRejected));
    
    setConsentGiven(true);
    setShowCustomizeModal(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consentGiven,
        showCustomizeModal,
        cookiePreferences,
        setConsentGiven,
        setShowCustomizeModal,
        updateCookiePreferences,
        acceptAllCookies,
        rejectAllCookies,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

// Create a hook for using the context
export const useCookieConsent = () => useContext(CookieConsentContext);