import React, { useEffect } from "react";
import VeocamBg from "../../assets/veocam-bg.webp";
import { useState } from "react";

import { useLanguage } from "../../hooks/LanguageContext";
const Popup = ({ onClose }) => {
  const { locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores

  const [email, setEmail] = useState(""); // Estado para el email
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Hacer visible el popup después de 500ms
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validación de email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, ingresa un email válido.");
      return;
    }

    // Estructura para Klaviyo 2025
    const eventData = {
      data: {
        type: "event",
        attributes: {
          properties: {
            $source: "website",
            origen: "newsletter", // Identificador único
          },
          metric: {
            data: {
              type: "metric",
              attributes: {
                name: "Suscripción Newsletter", // Debe existir en Klaviyo
                service: "marketing", // Área de servicio
              },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: email, // Único campo requerido
              },
            },
          },
          time: new Date().toISOString(),
        },
      },
    };

    try {
      const response = await fetch(
        "https://a.klaviyo.com/client/events/?company_id=YzQZwN", // Reemplaza con tu ID
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
        throw new Error(
          errorData.errors?.[0]?.detail || "Error en el servidor"
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      setEmail("");

      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 2500);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" fixed inset-0 z-50 ">
      <div
        className={`absolute inset-0 bg-black ${
          isVisible ? "opacity-50" : "opacity-0"
        } transition-opacity duration-1000`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed w-[90vw] max-w-[450px] left-1/2 top-1/2 -translate-x-1/2 translate-y-[-67%] h-[300px] sm:h-auto
            sm:w-[420px] sm:bottom-[50px] sm:right-[25px] sm:mg:right-[65px] sm:left-auto sm:top-auto sm:translate-x-0 sm:translate-y-0 
            rounded-lg shadow-lg transition-all duration-500 
        ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } animate-fadeIn`}
      >
        {/* Close Button */}
        <img src={VeocamBg} className="object-cover h-[50vh] sm:h-auto" />
        <button
          onClick={onClose}
          className="absolute top-1 sm:top-2 right-4 sm:right-6 text-white hover:text-white text-[36px] sm:text-xl"
        >
          &times;
        </button>
        <div className="flex flex-col  absolute top-16 sm:top-6 left-2 m-4 h-[35vh] justify-between sm:mt-4 sm:h-auto w-[90%] sm:w-auto">
          <h2 className="relative text-white uppercase h-[120px] h2Title !text-[42px] sm:w-[370px]">
            <span
              className={`absolute inset-0 transition-opacity duration-300 ${
                isSuccess ? "opacity-100" : "opacity-0"
              }`}
            >
              {locale === "ES" ? "¡Gracias!" : "Thanks!"}
            </span>
            <span
              className={`absolute inset-0 transition-opacity duration-300 ${
                isSuccess ? "opacity-0" : "opacity-100"
              }`}
            >
              {locale === "ES"
                ? "Suscríbete y consigue descuentos especiales!"
                : "Suscribe and get special discounts!"}
            </span>
          </h2>
          <div className="">
            <form
              onSubmit={handleSubmit}
              className="w-[100%] flex flex-row items-center"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-2 h-[50px] bg-[white] border border-[#434652] rounded-md body2 !text-iBlue rounded-r-[0px]"
                required
              />

              <button
                type="submit"
                className="bg-iBlue h-[50px] w-[120px] flex items-center justify-center body2 rounded-r-md"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                      />
                    </svg>
                  </span>
                ) : isSuccess ? (
                  "Enviado"
                ) : (
                  "Enviar"
                )}
              </button>

              {/* <button
                type="submit"
                className={`bg-iBlue h-[50px] w-[120px] flex items-center justify-center body2 rounded-r-md transition-all ${
                  isSubmitting || isSuccess
                    ? "opacity-90 cursor-not-allowed"
                    : ""
                }`}
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                      />
                    </svg>
                    Enviando
                  </span>
                ) : isSuccess ? (
                  "¡Gracias!"
                ) : (
                  "Enviar"
                )}
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
