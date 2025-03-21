import React, { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    country: "",
    origen: "contacto", // Valor por defecto
    selectedPlan: "",
    addons: [],
    selectedPlanType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Estructura validada para Klaviyo 2025-01-15
    const eventData = {
      data: {
        type: "event",
        attributes: {
          properties: {
            $source: "website",
            origen: formData.origen,
            selected_plan: formData.selectedPlan,
            addons: formData.addons,
            plan_type: formData.selectedPlanType,
          },
          metric: {
            data: {
              type: "metric",
              attributes: {
                name: "Form Submission", // Nombre de tu evento en Klaviyo
                service: "lead-generation", // Ej: marketing, sales, etc.
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
                  country: formData.country,
                },
                properties: {
                  // Propiedades adicionales del perfil
                  customer_type: "lead",
                },
              },
            },
          },
          time: new Date().toISOString(),
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.detail);
      }

      setFormData({
        // Reset del formulario
        email: "",
        phone_number: "",
        first_name: "",
        last_name: "",
        country: "",
        origen: "contacto",
        selectedPlan: "",
        addons: [],
        selectedPlanType: "",
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Email*</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="tel"
          value={formData.phone_number}
          onChange={(e) =>
            setFormData({ ...formData, phone_number: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          value={formData.first_name}
          onChange={(e) =>
            setFormData({ ...formData, first_name: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Apellido</label>
        <input
          type="text"
          value={formData.last_name}
          onChange={(e) =>
            setFormData({ ...formData, last_name: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>País</label>
        <select
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
        >
          <option value="">Seleccionar</option>
          <option value="AR">Argentina</option>
          <option value="US">Estados Unidos</option>
          {/* Agregar más opciones */}
        </select>
      </div>

      <div className="form-group">
        <label>Plan</label>
        <select
          value={formData.selectedPlan}
          onChange={(e) =>
            setFormData({ ...formData, selectedPlan: e.target.value })
          }
        >
          <option value="">Seleccionar plan</option>
          <option value="basic">Básico</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      <div className="form-group">
        <label>Tipo de Plan</label>
        <select
          value={formData.selectedPlanType}
          onChange={(e) =>
            setFormData({ ...formData, selectedPlanType: e.target.value })
          }
        >
          <option value="">Seleccionar tipo</option>
          <option value="mensual">Mensual</option>
          <option value="anual">Anual</option>
        </select>
      </div>

      <div className="form-group">
        <label>Addons</label>
        <div className="checkbox-group">
          {["SEO", "Hosting", "Soporte"].map((addon) => (
            <label key={addon}>
              <input
                type="checkbox"
                checked={formData.addons.includes(addon)}
                onChange={(e) => {
                  const newAddons = e.target.checked
                    ? [...formData.addons, addon]
                    : formData.addons.filter((item) => item !== addon);
                  setFormData({ ...formData, addons: newAddons });
                }}
              />
              {addon}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Enviar Datos
      </button>
    </form>
  );
};

export default EventForm;
