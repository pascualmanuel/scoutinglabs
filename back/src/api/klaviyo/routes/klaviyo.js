module.exports = {
  routes: [
    {
      method: "POST",
      path: "/klaviyo/subscribe",
      handler: "klaviyo.subscribe",
      config: { auth: false }, // Permite acceso público
    },
  ],
};
