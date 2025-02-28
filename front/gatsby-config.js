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
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        languages: ["es", "en"], // Los idiomas soportados
        defaultLanguage: "es", // Idioma por defecto
        siteUrl: "http://localhost:8000/", // URL base de tu sitio
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // React ya escapa los valores
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [
          {
            matchPath: "/ignored-page", // Página que no se debe traducir
            languages: ["es"],
          },
        ],
        redirect: false, // Desactivar redirección automática de idioma
      },
    },
    "gatsby-plugin-mdx", // Si estás usando MDX para contenido adicional
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: "http://localhost:1337",
        singleTypes: [
          {
            singularName: "footer",
            queryParams: {
              populate: {
                first_col_list: "*",
                second_col_list: "*",
                third_col_list: "*",
                logo: true,
                footerCards: "*",
                social_network: {
                  populate: {
                    icon: {
                      populate: "*",
                    },
                  },
                },
                localizations: {
                  populate: {
                    first_col_list: "*",
                    second_col_list: "*",
                    third_col_list: "*",
                    logo: true,
                    footerCards: "*",
                    social_network: {
                      populate: {
                        icon: {
                          populate: "*",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          {
            singularName: "navbar",
            queryParams: {
              populate: {
                links: "*",
                button: "*",
                logo: true,
                localizations: {
                  populate: {
                    links: "*",
                    button: "*",
                    logo: true,
                  },
                },
              },
            },
          },
          {
            singularName: "home",
            queryParams: {
              populate: {
                hero_background: true,
                partner_img: true,
                partner_cta: "*",
                logos: true,
                heroLinks: "*",
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
                localizations: {
                  populate: {
                    hero_background: true,
                    partner_img: true,
                    partner_cta: "*",
                    logos: true,
                    heroLinks: "*",
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
            },
          },
          {
            singularName: "veo-cam",
            queryParams: {
              populate: {
                buttons: "*",
                second_section_bg: true,
                boxes: {
                  populate: {
                    populate: "*",
                  },
                },
                second_section_buttons: "*",
                slider: {
                  populate: {
                    bg_image: {
                      populate: "*",
                    },
                  },
                },
                localizations: {
                  populate: {
                    buttons: "*",
                    second_section_bg: true,
                    second_section_buttons: "*",
                    boxes: {
                      populate: {
                        populate: "*",
                      },
                    },
                    slider: {
                      populate: {
                        bg_image: {
                          populate: "*",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          {
            singularName: "scouting-play",
            queryParams: {
              populate: {
                logo: true,
                buttons: {
                  populate: {
                    icon: {
                      populate: "*",
                    },
                  },
                },
                datos: "*",
                localizations: {
                  populate: {
                    logo: true,
                    buttons: {
                      populate: {
                        icon: {
                          populate: "*",
                        },
                      },
                    },
                    datos: "*",
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
