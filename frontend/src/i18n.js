import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pa from "./locales/pa.json"; // Import Punjabi translations

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    pa: {
      translation: pa,
    },
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language in case a translation is missing
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});
