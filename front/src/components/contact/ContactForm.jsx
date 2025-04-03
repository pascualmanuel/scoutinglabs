import React from "react";
import { useState, useEffect } from "react";
import countries from "country-list";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

import TickWhite from "../../assets/icons/tick-white.svg";
import RightArrow from "../../assets/icons/r-arrow.svg";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Button from "../Button";
import { useLanguage } from "../../hooks/LanguageContext";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function ContactForm() {
  const phoneUtil = PhoneNumberUtil.getInstance();

  const { locale } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    first_name: "",
    country: "",
    origen: "contacto",
    message: "",
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
      case "phone_number":
        try {
          const parsedNumber = phoneUtil.parseAndKeepRawInput(value);
          if (!phoneUtil.isValidNumber(parsedNumber)) {
            error = locale === "ES" ? "Teléfono inválido. " : "Invalid phone.";
          }
        } catch (error) {
          error =
            locale === "ES"
              ? "Formato de teléfono incorrecto"
              : "Invalid phone format";
        }
        break;

      case "first_name":
        if (value.trim().length < 2) error = "Nombre completo requerido";
        break;
      case "country":
        if (!value) error = "Selecciona tu país";
        break;
      case "message":
        if (value.trim().length < 0) error = "Mensaje demasiado corto";
        break;
      default:
        break;
    }
    return error;
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    // Validación de todos los campos antes de enviar el formulario
    let formErrors = {};
    for (let field in formData) {
      const error = validateField(field, formData[field]);
      if (error) formErrors[field] = error;
    }
    setErrors(formErrors);

    // Si hay errores, no enviamos el formulario
    if (Object.keys(formErrors).length > 0) return;

    const normalizedPhone = (() => {
      try {
        const parsed = phoneUtil.parse(formData.phone_number);
        return phoneUtil.format(parsed, PhoneNumberFormat.E164);
      } catch (error) {
        return formData.phone_number.replace(/[^\d+]/g, "");
      }
    })();

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
            message: formData.message,
          },
          metric: {
            data: {
              type: "metric",
              attributes: {
                name: "Formulario de Contacto", // Nombre de tu evento en Klaviyo
                service: "lead-generation", // Ej: marketing, sales, etc.
              },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: formData.email,
                phone_number: normalizedPhone,
                first_name: formData.first_name,
                last_name: formData.last_name,
                location: {
                  country: formData.country,
                },
                email_consent: "explicit",
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

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit", // Este es el evento que GTM capturará
      });

      // Enviar mensaje de WhatsApp si se seleccionó esa opción
      if (type === "whatsapp") {
        const whatsappMessage = `Hola, mi nombre es ${formData.first_name} y tengo la siguiente consulta: ${formData.message}`;
        const whatsappUrl = `https://wa.me/59894958171?text=${encodeURIComponent(
          whatsappMessage
        )}`;
        window.open(whatsappUrl, "_blank");
      }

      setFormData({
        email: "",
        phone_number: "",
        first_name: "",
        country: "",
        origen: "contacto",
        message: "",
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      // alert(`Error: ${error.message}`);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validar campo individual al cambiar
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
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
            <label className="block body1 text-grey1 mb-1">
              {locale === "ES" ? "Nombre" : "Name *"}
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder={
                locale === "ES" ? "Nombre" : "Enter your full name... *"
              }
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
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onBlur={() => {
                const error = validateField("email", formData.email);
                setErrors({ ...errors, email: error });
              }}
              placeholder={locale === "ES" ? "Email" : "Enter your email *"}
              className="w-full pl-2 h-[50px] bg-[#ffffff0d] border border-[#434652] rounded-md body2 "
            />
            {errors.email && (
              <p className="text-red-500  text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="ssm:flex gap-4">
          <div className="ssm:w-1/2">
            <label className="block body1 text-grey1 mb-1">
              {locale === "ES" ? "Télefono" : "Phone *"}
            </label>
            <PhoneInput
              defaultCountry="ar"
              value={formData.phone_number}
              onChange={(phone_number) => {
                setFormData({ ...formData, phone_number });
              }}
              onBlur={() => {
                const error = validateField(
                  "phone_number",
                  formData.phone_number
                );
                setErrors({ ...errors, phone_number: error });
              }}
              inputClassName="w-full pl-2 h-[50px] bg-[#ffffff0d] border border-[#434652] rounded-md body2"
              countrySelectorStyleProps={{
                buttonClassName:
                  "h-[50px] bg-[#ffffff0d] border border-[#434652] rounded-md px-2",
                dropdownStyleProps: {
                  className: "bg-[#ffffff0d] border border-[#434652]",
                },
              }}
              placeholder="Enter phone number number..."
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
            )}
          </div>
          <div className="ssm:w-1/2">
            <label className="block body1 text-grey1 mb-1">
              {locale === "ES" ? "País" : "Country of residence *"}
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full pl-2 h-[50px] bg-[#ffffff0d] border border-[#434652] rounded-md body2 "
            >
              <option value="">
                {locale === "ES" ? "País" : "Country of residence *"}
              </option>
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
          <label className="block body1 text-grey1 mb-1">
            {" "}
            {locale === "ES" ? "Mensaje *" : "Message *"}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={
              locale === "ES"
                ? "Escribí tu mensaje"
                : "Type your message here..."
            }
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

              {locale === "ES"
                ? "Enviaste el formulario"
                : "You submitted the form"}
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
                {locale === "ES"
                  ? "Te respondemos lo antes posible"
                  : "We reply as soon as possible"}
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
                {locale === "ES" ? "Atención disponible:" : "Available from:"}
                <br />{" "}
                {locale === "ES"
                  ? "Lun – Vie 09:30 – 18:00"
                  : "Mon – Fri 09:30 – 18:00"}
              </span>
              <div className="bg-white py-[6px] px-2 flex flex-row text-iBlue body3 rounded-md">
                <span>Chat with Us</span>
                <img src={RightArrow} className="ml-2" />
              </div>
            </button>
          </div>
        ) : (
          <Button text={locale === "ES" ? "Enviar" : "Send"} width="w-[100%]" />
        )}
      </form>
    </div>
  );
}

export default ContactForm;
