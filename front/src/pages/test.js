import React from "react";
import { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "+541151632960",
    first_name: "",
    last_name: "",
    // ... otros campos
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Estructura para Klaviyo 2025-01-15
    const eventData = {
      data: {
        type: "event",
        attributes: {
          properties: {
            $source: "website", // Campo obligatorio
            ProductID: 1234,
            ProductName: "Ejemplo",
          },
          metric: {
            data: {
              type: "metric",
              attributes: {
                name: "Viewed Product",
                service: "your-service-name", // Nuevo campo requerido
              },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: formData.email,
                phone_number: formData.phone_number,
                first_name: formData.first_name,
                last_name: formData.last_name,
                location: {
                  city: "New York",
                  country: "US",
                },
              },
            },
          },
          time: new Date().toISOString(),
          value: 99.99,
          value_currency: "USD",
        },
      },
    };

    try {
      const response = await fetch(
        "https://a.klaviyo.com/client/events/?company_id=YzQZwN",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
            Revision: "2025-01-15",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) throw new Error(await response.text());
      alert("Evento registrado!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar datos");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      {/* ... otros campos */}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default EventForm;
