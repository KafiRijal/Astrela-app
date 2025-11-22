import { createContext } from "react";

export const translations = {
  en: {
    menus: ["Home", "About", "Features", "How it Works"],
    login: "Login",
    change_language: "Language",
  },
  id: {
    menus: ["Beranda", "Tentang", "Fitur", "Cara Kerja"],
    login: "Masuk",
    change_language: "Bahasa",
  },
};

export const LanguageContext = createContext(null);
