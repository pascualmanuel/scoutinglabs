// LocalizedLink.js
import React from "react";
import { Link } from "gatsby"; // O cualquier otra librería de enlaces que uses
import { useLanguage } from "./LanguageContext";

const LocalizedLink = ({ to, children }) => {
  const { locale } = useLanguage();

  // Si el enlace ya tiene el prefijo de idioma, lo dejamos tal cual
  if (to.startsWith(`/${locale}`)) {
    return <Link to={to}>{children}</Link>;
  }

  // Si no tiene prefijo de idioma, lo agregamos automáticamente
  return <Link to={`/${locale}${to}`}>{children}</Link>;
};

export default LocalizedLink;
