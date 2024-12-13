import React from "react";
import { Link } from "gatsby"; // Importa Link de Gatsby

// Button component
const Button = ({
  text,
  link,
  bg = "#0584F5",
  textColor = "#fff",
  children,
  width = "w-[133px]",
  height = "h-[42px]",
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
    border: "none",
    cursor: "pointer",
  };

  return (
    <Link to={link} className={``} style={{ textDecoration: "none" }}>
      <button className={`buttonText ${width} ${height}`} style={buttonStyle}>
        {children || text}
      </button>
    </Link>
  );
};

export default Button;
