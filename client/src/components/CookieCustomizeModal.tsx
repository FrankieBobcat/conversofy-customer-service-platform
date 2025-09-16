import { useState } from "react";
import { X } from "lucide-react";
import { CookieTypes, useCookieConsent } from "@/context/CookieConsentContext";

const CookieCustomizeModal = () => {
  const {
    showCustomizeModal,
    setShowCustomizeModal,
    cookiePreferences,
    updateCookiePreferences,
  } = useCookieConsent();

  const [preferences, setPreferences] = useState<CookieTypes>({
    ...cookiePreferences,
  });

  if (!showCustomizeModal) {
    return null;
  }

  const handleChange = (cookieType: keyof CookieTypes) => {
    if (cookieType === "necessary") return; // Necessary cookies can't be toggled
    
    setPreferences({
      ...preferences,
      [cookieType]: !preferences[cookieType],
    });
  };

  const handleSave = () => {
    updateCookiePreferences(preferences);
  };

  const handleClose = () => {
    setShowCustomizeModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-gray-900 rounded-lg shadow-xl border border-gray-800 w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Privacy Preferences</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-300 mb-6">
            Customize which cookies you want to accept. Necessary cookies are required for the 
            website to function properly and cannot be disabled.
          </p>

          <div className="space-y-6">
            {/* Necessary Cookies - Always enabled */}
            <div className="pb-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">Necessary Cookies</h3>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="sr-only peer"
                    id="necessary"
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-sky-600/25 peer-checked:bg-sky-600 peer-disabled:bg-sky-700 peer-disabled:opacity-70"></div>
                  <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                These cookies are necessary for the website to function properly and cannot be disabled.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="pb-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">Analytics Cookies</h3>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handleChange("analytics")}
                    className="sr-only peer"
                    id="analytics"
                  />
                  <label htmlFor="analytics" className="w-11 h-6 bg-gray-700 flex items-center rounded-full cursor-pointer peer peer-focus:ring-2 peer-focus:ring-sky-600/25 peer-checked:bg-sky-600">
                    <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                These cookies help us analyze how visitors use our website, which pages are visited most often, and how effective our marketing campaigns are.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="pb-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">Marketing Cookies</h3>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handleChange("marketing")}
                    className="sr-only peer"
                    id="marketing"
                  />
                  <label htmlFor="marketing" className="w-11 h-6 bg-gray-700 flex items-center rounded-full cursor-pointer peer peer-focus:ring-2 peer-focus:ring-sky-600/25 peer-checked:bg-sky-600">
                    <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                These cookies are used to track visitors across websites to display relevant advertisements.
              </p>
            </div>

            {/* Preferences Cookies */}
            <div className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">Preferences Cookies</h3>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={() => handleChange("preferences")}
                    className="sr-only peer"
                    id="preferences"
                  />
                  <label htmlFor="preferences" className="w-11 h-6 bg-gray-700 flex items-center rounded-full cursor-pointer peer peer-focus:ring-2 peer-focus:ring-sky-600/25 peer-checked:bg-sky-600">
                    <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                These cookies allow the website to remember choices you make (such as your preferred language or the region you are in) and provide enhanced, personalized features.
              </p>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-900 p-4 border-t border-gray-800 flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieCustomizeModal;