export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io", // Imágenes de plugins
            "dl.airtable.com", // Si usas Airtable
            "*.strapi.io", // Dominio de Strapi Cloud
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "*.strapi.io",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },

  {
    name: "strapi::cors",
    config: {
      origin: [
        "https://scoutinglabs.onrender.com",
        "https://your-strapi-cloud-url.strapi.io", // Reemplaza con tu URL
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
