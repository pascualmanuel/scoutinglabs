import React from "react";
import { useState, useEffect } from "react";
import countries from "country-list";
import WhatsAppIcon from "../../assets/icons/WhatsApp.svg";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Button from "../Button";
function CotizacionForm({
  selectedPlanType,
  addons,
  selectedPlan,
  // showMessage = true,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    origen: "cotizacion",
    selectedPlan: selectedPlan,
    addons: addons,
    selectedPlanType: selectedPlanType,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
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
      case "phone":
        if (!/^\+?[0-9\s\-]{7,}$/.test(value)) error = "Teléfono inválido";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    console.log("Datos del formulario:", formData);

    // Datos a enviar al backend
    const dataToSend = {
      email: formData.email,
      telefono: formData.phone, // Asegúrate de que el teléfono esté en formato E.164
      pais: formData.country, // País en formato ISO alpha-2
      nombre: formData.name, // Nombre del usuario
      origen: formData.origen, // Mensaje
      selectedPlan: formData.selectedPlan,
      addons: formData.addons,
      selectedPlanType: formData.selectedPlanType,
    };

    console.log("📤 Data to send:", dataToSend);

    try {
      const response = await fetch(
        "https://attractive-darling-8051189523.strapiapp.com/api/klaviyo-subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            revision: "2025-01-15",
            Accept: "application/vnd.api+json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("✅ Formulario enviado con éxito:", result.data);

        // Llamamos al callback de éxito si existe
        if (onSuccess) {
          console.log("🎯 Llamando a onSuccess...");
          onSuccess(formData);
        }
      } else {
        console.error("❌ Error en la respuesta del servidor:", result.error);
      }
    } catch (error) {
      console.error("❌ Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="max-w-[] mx-auto  rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fila 1 - Name & Email */}
        <div className="ssm:flex gap-4">
          <div className="ssm:w-1/2">
            <label className="block body1 text-grey1 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
        {/* Fila 2 - Phone & Country */}
        <div className="ssm:flex gap-4">
          <div className="ssm:w-1/2">
            <label className="block body1 text-grey1 mb-1">Phone *</label>
            <PhoneInput
              defaultCountry="ar" // Código de país inicial (Argentina)
              value={formData.phone}
              onChange={(phone) => {
                setFormData({ ...formData, phone });
              }}
              inputClassName="w-full pl-2 h-[50px] bg-[#ffffff0d] border border-[#434652] rounded-md body2"
              countrySelectorStyleProps={{
                buttonClassName:
                  "h-[50px] bg-[#ffffff0d] border border-[#434652] rounded-md px-2",
                dropdownStyleProps: {
                  className: "bg-[#ffffff0d] border border-[#434652]",
                },
              }}
              placeholder="Enter phone number..."
            />
            {errors.phone && (
              <p className="text-red-500  text-sm mt-1">{errors.phone}</p>
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

        <div type="submit">
          <Button
            link={null}
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
        </div>
      </form>
    </div>
  );
}

export default CotizacionForm;
