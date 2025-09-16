import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "./context/ThemeContext";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import { LoadingProvider } from "./context/LoadingContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CookieConsentProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </CookieConsentProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
