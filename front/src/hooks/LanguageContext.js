import React, { createContext, useContext, useState, useEffect } from "react";
import { navigate } from "gatsby";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("ES");

  useEffect(() => {
    // Obtener el idioma guardado o detectar de la URL
    const savedLocale = localStorage.getItem("locale");
    const path = window.location.pathname;

    // Detectar idioma inicial
    const detectedLocale = path.startsWith("/en") ? "EN" : savedLocale || "ES";
    setLocale(detectedLocale);

    // Redirección si hay discrepancia entre URL y localStorage
    if (detectedLocale === "EN" && !path.startsWith("/en")) {
      navigate("/en", { replace: true });
    } else if (detectedLocale === "ES" && path.startsWith("/en")) {
      navigate("/", { replace: true });
    }
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
