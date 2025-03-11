module.exports = {
  routes: [
    {
      method: "POST",
      path: "/klaviyo/subscribe",
      handler: "klaviyo.sendToKlaviyo", // Cambio "subscribe" por "sendToKlaviyo"
      config: { auth: false }, // Permite acceso público
    },
  ],
};
