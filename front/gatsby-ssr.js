import React from "react";
import { LanguageProvider } from "./src/hooks/LanguageContext";

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "es" });
};

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>{element}</LanguageProvider>
);
