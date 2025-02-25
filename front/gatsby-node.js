exports.onCreateNode = ({ node }) => {
  // Función recursiva para reemplazar null por cadena vacía
  const replaceNulls = (value) => {
    if (value === null) {
      return "";
    }
    if (Array.isArray(value)) {
      return value.map(replaceNulls);
    }
    if (value !== null && typeof value === "object") {
      const newObj = {};
      Object.keys(value).forEach((key) => {
        newObj[key] = replaceNulls(value[key]);
      });
      return newObj;
    }
    return value;
  };

  // Recorremos todas las propiedades del nodo y las transformamos
  Object.keys(node).forEach((key) => {
    node[key] = replaceNulls(node[key]);
  });
};
