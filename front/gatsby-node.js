exports.onCreateNode = ({ node }) => {
  const replaceNulls = (value) => {
    if (value === null) return "";
    if (Array.isArray(value)) return value.map(replaceNulls);
    if (typeof value === "object") {
      // Caso especial para botones (tanto en "buttons" como en "localizations.buttons")
      if (value.link && value.text) {
        // Identifica objetos que son botones
        value.icon = value.icon ? replaceNulls(value.icon) : { url: "" }; // Fuerza el campo "icon"
      }
      return Object.fromEntries(
        Object.entries(value).map(([key, val]) => [key, replaceNulls(val)])
      );
    }
    return value;
  };

  // Recorremos todas las propiedades del nodo y las transformamos
  Object.keys(node).forEach((key) => {
    node[key] = replaceNulls(node[key]);
  });
};
