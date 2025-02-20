// gatsby-config.js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`, // Cargar el archivo .env basado en el entorno
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `scoutingLabs`,
    siteUrl: `https://www.yourdomain.tld`,
  },

  plugins: [
    "gatsby-plugin-postcss", // Necesario si estás utilizando Tailwind CSS
    "gatsby-plugin-image", // Necesario para trabajar con imágenes en Gatsby
    "gatsby-plugin-sharp", // Necesario para procesar imágenes
    "gatsby-transformer-sharp", // Para transformar imágenes (por ejemplo, `.webp`)

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/src/assets/`, // Ruta donde están tus imágenes
      },
    },

    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png", // Ajusta la ruta si es necesario
      },
    },
    "gatsby-plugin-mdx", // Si estás usando MDX para contenido adicional
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: "http://localhost:1337",
        singleTypes: [
          {
            singularName: "home",
            queryParams: {
              populate: {
                hero_background: true,
                partner_img: true,
                logos: true,
                heroLinks: "*",
                partner_cta: "*",
                mision_button: "*",
                box_link: "*",
                veo_button: "*",
                slider: {
                  populate: {
                    video: {
                      populate: "*", // Poblar url y otros campos
                    },
                  },
                },
              },
            },
          },
        ],
        queryLimit: 1000,
      },
    },
  ],
};
