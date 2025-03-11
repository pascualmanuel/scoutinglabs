import React from "react";
import { Link } from "gatsby";
import { useLanguage } from "../hooks/LanguageContext";

const Button = ({
  text,
  link,
  bg = "#0584F5",
  textColor = "#fff",
  children,
  width = "w-[133px]",
  height = "h-[42px]",
  border = "none",
  onClick, // Permite manejar clics en botones sin enlace
  type = "button", // Asegura compatibilidad con formularios
}) => {
  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    gap: "10px",
    backgroundColor: bg,
    borderRadius: "8px",
    color: textColor,
    border: border,
    cursor: "pointer",
  };

  const { locale } = useLanguage();
  const hasValidLink = link && typeof link === "string" && link.trim() !== "";

  const buttonElement = (
    <button
      className={`buttonText ${width} ${height}`}
      style={buttonStyle}
      onClick={onClick}
      type={type}
    >
      {children || text}
    </button>
  );

  return hasValidLink ? (
    <Link
      to={locale === "EN" ? `/en${link}` : link}
      style={{ textDecoration: "none" }}
    >
      {buttonElement}
    </Link>
  ) : (
    buttonElement
  );
};

export default Button;
