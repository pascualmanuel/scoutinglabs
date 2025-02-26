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

  return (
    <Link
      to={locale === "EN" ? `/en${link}` : link} // Agrega prefijo solo para EN
      style={{ textDecoration: "none" }}
    >
      <button className={`buttonText ${width} ${height}`} style={buttonStyle}>
        {children || text}
      </button>
    </Link>
  );
};

export default Button;
