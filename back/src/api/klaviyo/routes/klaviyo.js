module.exports = {
  routes: [
    {
      method: "POST",
      path: "/klaviyo-subscribe",
      handler: "klaviyo.sendToKlaviyo",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
