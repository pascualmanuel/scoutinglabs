import React from "react";
import { useState, useEffect } from "react";
import countries from "country-list";
import TickWhite from "../../assets/icons/tick-white.svg";
import RightArrow from "../../assets/icons/r-arrow.svg";
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
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      console.log("Datos del formulario:", formData);

      // Datos a enviar
      const dataToSend = {
        email: formData.email,
        telefono: formData.phone,
        pais: formData.country,
        nombre: formData.name,
        mensaje: formData.message,
        origen: formData.origen,
        selectedPlan: formData.selectedPlan,
        addons: formData.addons,
        selectedPlanType: formData.selectedPlanType,
      };

      try {
        await fetch("/api/klaviyoSubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            revision: "2025-01-15",
            Accept: "application/vnd.api+json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (type === "whatsapp") {
          const whatsappMessage = `Hola, mi nombre es ${formData.name} y tengo la siguiente consulta: ${formData.message}`;
          const whatsappUrl = `https://wa.me/5491151632960?text=${encodeURIComponent(
            whatsappMessage
          )}`;
          window.open(whatsappUrl, "_blank");
        }

        // Limpiar el formulario y mostrar mensaje de éxito
        setFormData({
          name: "",
          email: "",
          phone: "",
          country: "",
          message: "",
          origen: "contacto",
        });
        setSubmitted(true);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const allFieldsFilled = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (allFieldsFilled) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [allFieldsFilled]);

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

        {submitted ? (
          <div className="w-fit bg-[#1d1a26] text-white p-4 rounded-md">
            <p className="text-left body2 flex items-center flex-row">
              <img src={TickWhite} className="mr-2" />
              Enviaste el formulario
            </p>
          </div>
        ) : allFieldsFilled ? (
          <div
            className={`flex  ssm:flex-row gap-4 transition-all duration-500 transform ${
              showButtons ? "opacity-100 " : "opacity-5  pointer-events-none"
            }`}
          >
            <button
              onClick={(e) => handleSubmit(e, "email")}
              className="w-1/2 p-4 h-[140px] flex flex-col justify-between items-start bg-[#161616] rounded-lg text-left"
            >
              <span className="body1">Email</span>
              <span className="body3 text-grey3 ">
                We reply as soon as possible
              </span>
              <div className="bg-white py-[6px] px-2 flex flex-row text-iBlue body3 rounded-md">
                <span>Email Us</span>
                <img src={RightArrow} className="ml-2" />
              </div>
            </button>
            <button
              onClick={(e) => handleSubmit(e, "whatsapp")}
              className="w-1/2 p-4 h-[140px] flex flex-col justify-between items-start bg-[#161616] rounded-lg text-left"
            >
              <span className="body1">Whatsapp</span>
              <span className="body3 text-grey3 ">
                Available from: <br /> Mon – Fri 09:30 – 16:30
              </span>
              <div className="bg-white py-[6px] px-2 flex flex-row text-iBlue body3 rounded-md">
                <span>Chat with Us</span>
                <img src={RightArrow} className="ml-2" />
              </div>
            </button>
          </div>
        ) : (
          <Button
            text="Enviar"
            width="w-[100%]"
            onClick={(e) => handleSubmit(e)}
          />
        )}
      </form>
    </div>
  );
}

export default ContactForm;
