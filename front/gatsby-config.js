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
    siteUrl: `https://scoutinglabs.onrender.com/`,
    description: `Scouting Labs: Obtene la Veo Cam, cámaras deportivas inteligentes para análisis y grabación, sin necesidad de un camarógrafo.`,
  },
  flags: {
    DEV_SSR: true,
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

    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     icon: "src/images/icon.png", // Ajusta la ruta si es necesario
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Scouting Labs`,
        short_name: `ScoutingLabs`,
        start_url: `/`,
        background_color: `#03000d`,
        display: `standalone`,
        icon: `src/assets/favicon/favicon.svg`,
        icons: [
          {
            src: `src/assets/favicon/apple-touch-icon.png`,
            sizes: `180x180`,
            type: `image/png`,
          },
          {
            src: `src/assets/favicon/favicon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `src/assets/favicon/favicon.ico`,
            sizes: `16x16`,
            type: `image/x-icon`,
          },
          {
            src: `src/assets/favicon/web-app-manifest-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `src/assets/favicon/web-app-manifest-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        languages: ["es", "en"], // Los idiomas soportados
        defaultLanguage: "es", // Idioma por defecto
        siteUrl: "https://scoutinglabs.onrender.com/", // URL base de tu sitio
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
        apiURL: "https://great-hope-45f9424224.strapiapp.com/",
        collectionTypes: [
          {
            singularName: "accessorie",
            queryParams: {
              populate: {
                image: true,
                localizations: {
                  populate: ["image"],
                },
              },
            },
          },
          {
            singularName: "subscription-plan",
            queryParams: {
              populate: {
                addon: "*",
                localizations: {
                  populate: "*",
                },
              },
            },
          },
        ],

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
                    media: {
                      populate: "*",
                    },
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
                        media: {
                          populate: "*",
                        },
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
          {
            singularName: "nosotros",
            queryParams: {
              populate: {
                boxes: {
                  populate: {
                    media: {
                      populate: "*",
                    },
                  },
                },
                paises: "*",
                localizations: {
                  populate: {
                    paises: "*",
                    boxes: {
                      populate: {
                        media: {
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
            singularName: "suscripciones",
            queryParams: {
              populate: {
                button: "*",
                cta_img: true,
                localizations: {
                  populate: {
                    button: "*",
                    cta_img: true,
                  },
                },
              },
            },
          },
          {
            singularName: "contact",
            queryParams: {
              populate: {
                imagenes_nosotros: true,
                localizations: {
                  populate: {
                    imagenes_nosotros: true,
                  },
                },
              },
            },
          },
          {
            singularName: "faq",
            queryParams: {
              populate: "*",
            },
          },
        ],
        queryLimit: 1000,
      },
    },
  ],
};
