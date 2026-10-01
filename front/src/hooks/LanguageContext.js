import React, { createContext, useContext, useState, useEffect } from "react";
import { navigate } from "gatsby";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("ES");

  useEffect(() => {
    // La URL determina el idioma; una preferencia antigua no debe sacar
    // al visitante de una página española ni cambiar su contenido.
    const path = window.location.pathname;
    const detectedLocale = /^\/en(?:\/|$)/.test(path) ? "EN" : "ES";
    setLocale(detectedLocale);
  }, []);

  const changeLanguage = (newLocale) => {
    const currentPath = window.location.pathname.replace(/^\/en/, "");
    console.log(currentPath);
    localStorage.setItem("locale", newLocale);
    setLocale(newLocale);
    // Actualizar la URL
    navigate(newLocale === "EN" ? `/en${currentPath}` : `${currentPath}`);
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
