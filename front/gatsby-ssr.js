export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "es" });
};

export const wrapRootElement = ({ element }) => {
  if (typeof window === "undefined") {
    return null; // Evita errores en el SSR
  }
  return element;
};
