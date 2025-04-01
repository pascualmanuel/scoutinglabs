import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
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
    } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "El campo email es requerido",
      });
    }

    // Mapear origen_lead a un evento
    const eventMap = {
      contacto: "Formulario de Contacto",
      newsletter: "Suscripción a Newsletter",
      cotizacion: "Solicitud de Cotizacion",
    };

    const eventName = eventMap[origen] || "Evento Desconocido";

    const eventData = {
      data: {
        type: "event",
        attributes: {
          properties: {
            nombre: nombre || undefined, // Solo se envía si tiene valor
            mensaje: mensaje || undefined,
            phone_number: telefono || undefined,
            country: pais || undefined,
            origen_lead: origen || undefined, // Se mantiene solo en el evento para segmentación
            selectedPlan: selectedPlan || undefined,
            addons: addons && addons.length > 0 ? addons : undefined,
            selectedPlanType: selectedPlanType || undefined,
            consentimiento_marketing: true, // Consentimiento de marketing
          },
          time: new Date().toISOString(), // Timestamp correcto
          metric: {
            data: {
              type: "metric",
              attributes: {
                name: eventName, // Nombre del evento
              },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: email,
                phone_number: telefono || undefined,

                // NOTA: No se incluyen otras propiedades en el perfil para evitar sobrescribir datos anteriores.
              },
            },
          },
        },
      },
    };

    try {
      const response = await axios.post(
        "https://a.klaviyo.com/api/events",
        eventData,
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
            Revision: "2025-01-15",
            Authorization: `Klaviyo-API-Key ${process.env.GATSBY_KLAVIYO_API_KEY}`,
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: "Evento enviado con éxito a Klaviyo",
        data: response.data,
      });
    } catch (error) {
      console.error(
        "Error al enviar evento a Klaviyo:",
        error.response?.data || error
      );

      // Verificamos si error.response existe y tiene un cuerpo
      if (!error.response?.data) {
        return res.status(500).json({
          success: false,
          error: "Respuesta vacía de Klaviyo o error desconocido",
        });
      }

      return res.status(500).json({
        success: false,
        error: error.response?.data?.errors?.[0]?.detail || "Error desconocido",
      });
    }
  }
}
