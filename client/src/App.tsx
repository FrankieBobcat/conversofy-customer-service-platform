import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import { CookieConsentProvider, useCookieConsent } from "@/context/CookieConsentContext";
import CookieConsent from "@/components/CookieConsent";
import CookieCustomizeModal from "@/components/CookieCustomizeModal";
import { ChatWidget } from "@/components/ChatWidget";
import Home from "@/pages/Home";
import BlogPage from "@/pages/BlogPage";
import AboutPage from "@/pages/AboutPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/about" component={AboutPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { acceptAllCookies, setShowCustomizeModal, rejectAllCookies } = useCookieConsent();
  
  return (
    <>
      <Router />
      <Toaster />
      <ChatWidget position="bottom-right" primaryColor="#0ea5e9" />
      <CookieConsent 
        onAcceptAll={acceptAllCookies}
        onCustomize={() => setShowCustomizeModal(true)}
        onRejectAll={rejectAllCookies}
      />
      <CookieCustomizeModal />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <CookieConsentProvider>
            <AppContent />
          </CookieConsentProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
