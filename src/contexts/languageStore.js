import { createContext } from "react";

export const translations = {
  en: {
    menus: ["Home", "About", "Features", "How it Works"],
    login: "Login",
    change_language: "Language",
    heroWelcome: "Welcome to Astrela!",
    heroTitlePart1: "Optimize your banking sales with",
    heroTitlePart2: "smarter lead prioritization",
    heroDescription:
      "Astrela helps your sales team contact the right prospects at the right time — logging calls, scheduling follow-ups, and surfacing next-best-offer product recommendations based on data-driven lead scoring.",
    heroBtnPrimary: "Get Started - Sign In",
    heroBtnSecondary: "Explore Features",
    heroBadgeText1: "Designed for",
    heroBadgeText2: "Banking Sales Professionals",
    heroImageAlt: "Illustration of banking sales optimization",
  },
  id: {
    menus: ["Beranda", "Tentang", "Fitur", "Cara Kerja"],
    login: "Masuk",
    change_language: "Bahasa",
    heroWelcome: "Selamat datang di Astrela!",
    heroTitlePart1: "Optimalkan penjualan perbankan Anda dengan",
    heroTitlePart2: "prioritas prospek yang lebih cerdas",
    heroDescription:
      "Astrela membantu tim sales Anda menghubungi prospek yang tepat pada waktu yang tepat — mencatat panggilan, menjadwalkan tindak lanjut, dan menampilkan rekomendasi produk terbaik berikutnya berdasarkan penilaian prospek berbasis data.",
    heroBtnPrimary: "Mulai Sekarang - Masuk",
    heroBtnSecondary: "Jelajahi Fitur",
    heroBadgeText1: "Dirancang untuk",
    heroBadgeText2: "Profesional Penjualan Perbankan",
    heroImageAlt: "Ilustrasi optimisasi penjualan perbankan",
  },
};

export const LanguageContext = createContext(null);
