import "./src/styles/global.css";
// gatsby-browser.js
import React from "react";
import { LanguageProvider } from "./src/hooks/LanguageContext";
// import { I18nextProvider } from "gatsby-plugin-react-i18next"; // Para usar i18next

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>{element}</LanguageProvider>
);
