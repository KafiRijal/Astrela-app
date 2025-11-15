import React, { useState, useMemo } from "react";
import { LanguageContext, translations } from "./languageStore";

export function LanguageProvider(props = {}) {
  const { children, defaultLang = "en" } = props;
  const [lang, setLang] = useState(defaultLang);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang] || translations.en,
      toggleLang: () => setLang((l) => (l === "en" ? "id" : "en")),
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
