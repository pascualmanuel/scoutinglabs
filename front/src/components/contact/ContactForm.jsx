import React from "react";
import { useState, useEffect } from "react";
import countries from "country-list";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Button from "../Button";
function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    origen: "contacto",
  });
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, phone, country, message, name, origen } = formData;

    // Datos a enviar al backend
    const dataToSend = {
      email: email,
      telefono: phone, // Asegúrate de que el teléfono esté en formato E.164
      pais: country, // País en formato ISO alpha-2
      nombre: name, // Nombre del usuario
      mensaje: message, // Mensaje
      origen: origen, // Mensaje
    };

    try {
      const response = await fetch("/api/klaviyoSubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          revision: "2025-01-15",
          Accept: "application/vnd.api+json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Formulario enviado con éxito:", result.data);
        // Aquí puedes mostrar un mensaje de éxito al usuario
      } else {
        console.error("Error en la respuesta del servidor:", result.error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      // Muestra el mensaje de error de Klaviyo
      if (error.details) {
        console.error("Detalles de Klaviyo:", error.details);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newErrors = {};
  //   Object.keys(formData).forEach((key) => {
  //     const error = validateField(key, formData[key]);
  //     if (error) newErrors[key] = error;
  //   });

  //   if (Object.keys(newErrors).length === 0) {
  //     setSubmitted(true);
  //     // Aquí iría la lógica de envío cuando esté lista
  //   } else {
  //     setErrors(newErrors);
  //   }

  //   if (Object.keys(newErrors).length === 0) {
  //     setSubmitted(true);
  //     console.log("Datos del formulario:", formData);
  //     // Llamamos al callback de éxito si se pasó por props
  //     if (onSuccess) {
  //       onSuccess(formData);
  //     }
  //   } else {
  //     setErrors(newErrors);
  //   }
  // };

  return (
    <div className="max-w-[] mx-auto  rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block body1 text-grey1 mb-1">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            className="w-full pl-2 pt-4 bg-[#ffffff0d] border border-[#434652] rounded-md body2 h-32 "
          />
          {errors.message && (
            <p className="text-red-500  text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <div>
          <Button
            text={isLoading ? "Enviando..." : "Enviar"}
            width="w-[100%]"
          />
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
