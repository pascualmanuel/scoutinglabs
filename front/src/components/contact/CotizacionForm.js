import React from "react";
import { useState, useEffect } from "react";
import countries from "country-list";
import WhatsAppIcon from "../../assets/icons/WhatsApp.svg";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Button from "../Button";
function CotizacionForm({ selectedPlanType, addons, selectedPlan, onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    first_name: "",
    country: "",
    origen: "cotizacion",
    selectedPlan: selectedPlan,
    addons: addons,
    selectedPlanType: selectedPlanType,
  });
  console.log(formData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);

  // Cargar lista de países
  useEffect(() => {
    setCountryList(
      countries.getData().sort((a, b) => a.name.localeCompare(b.name))
    );
  }, []);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Formato de email inválido";
        break;
      case "phone_number":
        if (!/^\+\d{7,15}$/.test(value)) {
          error = "Teléfono inválido.";
        }
        break;
      case "name":
        if (value.trim().length < 2) error = "Nombre completo requerido";
        break;
      case "country":
        if (!value) error = "Selecciona tu país";
        break;
    }
    return error;
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    const eventData = {
      data: {
        type: "event",
        attributes: {
          properties: {
            $source: "website",
            origen: formData.origen, // Mensaje
            selectedPlan: formData.selectedPlan,
            addons: formData.addons,
            selectedPlanType: formData.selectedPlanType,
          },
          metric: {
            data: {
              type: "metric",
              attributes: {
                name: "Solicitud de Cotizacion ", // Nombre de tu evento en Klaviyo
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

      if (response.ok) {
        // Llamar al callback con los datos necesarios para WhatsApp
        if (onSuccess) {
          onSuccess({
            name: formData.first_name, // Mapear first_name => name
            email: formData.email,
            phone: formData.phone_number, // Mapear phone_number => phone
            plan: formData.selectedPlan,
            planType: formData.selectedPlanType,
          });
        }

        // Mantener tu reset original del formulario
        setFormData({
          email: "",
          phone_number: "",
          first_name: "",
          last_name: "",
          country: "",
          origen: "cotizacion",
          selectedPlan: "",
          addons: [],
          selectedPlanType: "",
        });

        alert("¡Datos enviados con éxito!"); // Mantener tu alerta
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="max-w-[] mx-auto  rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="ssm:flex gap-4">
          <div className="ssm:w-1/2">
            <label className="block body1 text-grey1 mb-1">Name *</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter your full name..."
              className="w-full pl-2 h-[50px] bg-[#ffffff0d] border border-[#434652] rounded-md body2 "
            />
            {errors.name && (
              <p className="text-red-500  text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="ssm:w-1/2">
            <label className="block body1 text-grey1 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="w-full pl-2 h-[50px] bg-[#ffffff0d] border border-[#434652] rounded-md body2 "
            />
            {errors.email && (
              <p className="text-red-500  text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="ssm:flex gap-4">
          <div className="ssm:w-1/2">
            <label className="block body1 text-grey1 mb-1">Phone *</label>
            <PhoneInput
              defaultCountry="ar" // Código de país inicial (Argentina)
              value={formData.phone_number}
              onChange={(phone_number) => {
                setFormData({ ...formData, phone_number });
              }}
              inputClassName="w-full pl-2 h-[50px] bg-[#ffffff0d] border border-[#434652] rounded-md body2"
              countrySelectorStyleProps={{
                buttonClassName:
                  "h-[50px] bg-[#ffffff0d] border border-[#434652] rounded-md px-2",
                dropdownStyleProps: {
                  className: "bg-[#ffffff0d] border border-[#434652]",
                },
              }}
              placeholder="Enter phone_number number..."
            />
            {errors.phone_number && (
              <p className="text-red-500  text-sm mt-1">
                {errors.phone_number}
              </p>
            )}
          </div>
          <div className="ssm:w-1/2">
            <label className="block body1 text-grey1 mb-1">
              Country of residence *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full pl-2 h-[50px] bg-[#ffffff0d] border border-[#434652] rounded-md body2 "
            >
              <option value="">Selecciona tu país...</option>
              {countryList.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500  text-sm mt-1">{errors.country}</p>
            )}
          </div>
        </div>
        {/* Campo Message - Ancho completo */}

        <button type="submit">
          <Button
            // link={null}
            text={
              <>
                <div className="flex flex-row items-center px-2">
                  <img src={WhatsAppIcon} alt="whattsapp" className="w-6 h-6" />
                  <p className="buttonText ml-4 capitalize">
                    Recibir cotización
                  </p>
                </div>
              </>
            }
            width="w-[100%]"
          />
        </button>
      </form>
    </div>
  );
}

export default CotizacionForm;
