import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Validar email obligatorio
    const { email, telefono, pais, nombre, mensaje, origen } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        error: "El campo email es requerido",
      });
    }

    const data = {
      data: {
        type: "profile",
        attributes: {
          email: email,
          phone_number: telefono || "", // Teléfono en formato E.164

          properties: {
            country: pais || "", // Código ISO alpha-2
            nombre: nombre || "", // Nombre del usuario
            mensaje: mensaje || "", // Mensaje
            estado_lead: "nuevo",
            origen_lead: origen,
          },
        },
      },
    };

    try {
      const response = await axios.post(
        "https://a.klaviyo.com/api/profiles/",
        data,
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
            Revision: "2025-01-15",
            Authorization: `Klaviyo-API-Key ${process.env.GATSBY_KLAVIYO_API_KEY}`,
          },
        }
      );

      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      console.error("Error detallado:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({
        success: false,
        error: "Error al enviar datos a Klaviyo",
        details: error.response?.data || error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
