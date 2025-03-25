// gatsby-browser.js
import "./src/styles/global.css";
import React from "react";
import { LanguageProvider } from "./src/hooks/LanguageContext";

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>{element}</LanguageProvider>
);
