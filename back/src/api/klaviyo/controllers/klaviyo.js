const axios = require("axios");

module.exports = {
  async sendToKlaviyo(ctx) {
    try {
      const {
        email,
        telefono,
        pais,
        nombre,
        mensaje,
        origen,
        selectedPlan,
        addons,
        selectedPlanType,
      } = ctx.request.body;

      if (!email) {
        return ctx.badRequest("El campo email es requerido");
      }

      const klaviyoApiKey = strapi.config.get("klaviyo.apiKey"); // Ahora obtenemos la API Key desde la config

      // Mapear origen_lead a un evento
      const eventMap = {
        contacto: "Formulario de Contacto",
        newsletter: "Suscripción a Newsletter",
        cotizacion: "Solicitud de Cotización",
      };
      const eventName = eventMap[origen] || "Evento Desconocido";

      const eventData = {
        data: {
          type: "event",
          attributes: {
            properties: {
              nombre,
              mensaje,
              phone_number: telefono,
              country: pais,
              origen_lead: origen,
              selectedPlan,
              addons: addons && addons.length > 0 ? addons : undefined,
              selectedPlanType,
              consentimiento_marketing: true,
            },
            time: new Date().toISOString(),
            metric: {
              data: {
                type: "metric",
                attributes: {
                  name: eventName,
                },
              },
            },
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email,
                  phone_number: telefono,
                },
              },
            },
          },
        },
      };

      // Enviar datos a Klaviyo
      const response = await axios.post(
        "https://a.klaviyo.com/api/events",
        eventData,
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
            Authorization: `Klaviyo-API-Key ${klaviyoApiKey}`,
            revision: "2025-01-15",
            Accept: "application/vnd.api+json",
          },
        }
      );

      return ctx.send({
        success: true,
        message: "Evento enviado a Klaviyo",
        data: response.data,
      });
    } catch (error) {
      console.error(
        "Error en la petición a Klaviyo:",
        error.response?.data || error.message
      );
      return ctx.internalServerError(
        error.response?.data || "Error desconocido"
      );
    }
  },
};
