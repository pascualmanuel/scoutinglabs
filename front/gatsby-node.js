// gatsby-node.js
const fs = require("fs/promises");
const path = require("path");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type STRAPI_FAQ implements Node {
      link: String  # Campo opcional
      text: String
      icon: STRAPI_ICON  # Asegúrate de definir este tipo si existe
      localizations: [STRAPI_FAQLocalizations]
    }

    type STRAPI_FAQLocalizations {
      link: String
    }

    type STRAPI_ICON {
      url: String
    }
  `;
  createTypes(typeDefs);
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  const replaceNulls = (value) => {
    if (value === null) return "";
    if (Array.isArray(value)) return value.map(replaceNulls);
    if (typeof value === "object" && value !== null) {
      // Asegura que 'icon' exista incluso si es null/undefined
      if (value.link && value.text && !value.icon) {
        value.icon = { url: "" };
      }
      return Object.fromEntries(
        Object.entries(value).map(([key, val]) => [key, replaceNulls(val)])
      );
    }
    return value;
  };

  // Crea nuevos campos sin modificar el nodo directamente
  const processedData = replaceNulls(node);
  Object.keys(processedData).forEach((key) => {
    createNodeField({
      node,
      name: key,
      value: processedData[key],
    });
  });
};
exports.onPostBuild = async ({ store, reporter }) => {
  // React 18 puede insertar NUL al cortar texto UTF-8 durante el SSR.
  // https://github.com/facebook/react/issues/31134
  // Quitamos solo ese carácter inválido; los copies no se modifican.
  let cleanedFiles = 0;
  const cleanHtml = async (directory) => {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    await Promise.all(
      entries.map(async (entry) => {
        const file = path.join(directory, entry.name);
        if (entry.isDirectory()) {
          await cleanHtml(file);
        } else if (entry.isFile() && entry.name.endsWith(".html")) {
          const html = await fs.readFile(file, "utf8");
          if (html.includes("\0")) {
            await fs.writeFile(file, html.replace(/\0/g, ""));
            cleanedFiles += 1;
          }
        }
      })
    );
  };

  await cleanHtml(path.join(store.getState().program.directory, "public"));
  if (cleanedFiles) {
    reporter.info(`Removed invalid NUL characters from ${cleanedFiles} HTML files.`);
  }
};

// exports.onCreateNode = ({ node, actions }) => {
//   const replaceNulls = (value) => {
//     if (value === null) return ""; // Ahora sí reemplaza null por ""
//     if (Array.isArray(value)) return value.map(replaceNulls);
//     if (typeof value === "object") {
//       if (value.link && value.text && !value.icon) {
//         value.icon = { url: "" }; // Default para icon faltante
//       }
//       return Object.fromEntries(
//         Object.entries(value).map(([k, v]) => [k, replaceNulls(v)])
//       );
//     }
//     return value;
//   };

//   // No modificar el nodo directamente (mejor usar createNodeField)
//   Object.keys(node).forEach((key) => {
//     const newValue = replaceNulls(node[key]);
//     actions.createNodeField({
//       node,
//       name: key,
//       value: newValue,
//     });
//   });
// };
