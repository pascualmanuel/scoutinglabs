import React from "react";
import { Link } from "gatsby"; // Importamos Link de Gatsby para navegación
import { useLanguage } from "./LanguageContext"; // Usamos el contexto de idioma

const LangLink = ({ to, children, ...props }) => {
  const { locale } = useLanguage(); // Obtener el idioma actual
  console.log(locale, "fweda");
  // Lógica para gestionar la URL de acuerdo al idioma
  const updatedTo = locale === "ES" ? `${to}` : `/en${to}`;

  return (
    <Link to={updatedTo} {...props}>
      {children}
    </Link>
  );
};

export default LangLink;
