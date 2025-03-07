import React, { useEffect } from "react";
import VeocamBg from "../../assets/veocam-bg.webp";
import { useState } from "react";
const Popup = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores
  const [success, setSuccess] = useState(false); // Estado para manejar éxito
  const [email, setEmail] = useState(""); // Estado para el email

  useEffect(() => {
    // Hacer visible el popup después de 500ms
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, ingresa un email válido.");
      return;
    }

    // Datos a enviar al backend
    const dataToSend = {
      email: email,
      origen: "newsletter", // Origen del lead
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
        setSuccess(true); // Mostrar mensaje de éxito
        setError(null);
        setTimeout(() => {
          onClose(); // Cerrar el popup después de 2 segundos
        }, 2000);
      } else {
        setError(result.error || "Error al suscribirse. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className=" absolute inset-0 z-50 ">
      <div
        className={`absolute inset-0 bg-black ${
          isVisible ? "opacity-50" : "opacity-0"
        } transition-opacity duration-1000`}
        onClick={onClose}
      ></div>

      <div
        className={`absolute w-[90vw] max-w-[450px] left-1/2 top-1/2 -translate-x-1/2 translate-y-[-67%] h-[500px] sm:h-auto
            sm:w-[420px] sm:bottom-[100px] sm:right-[25px] sm:mg:right-[65px] sm:left-auto sm:top-auto sm:translate-x-0 sm:translate-y-0 
            rounded-lg shadow-lg transition-all duration-500 
        ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } animate-fadeIn`}
      >
        {/* Close Button */}
        <img src={VeocamBg} className="object-cover h-[100%]" />
        <button
          onClick={onClose}
          className="absolute top-1 sm:top-2 right-4 sm:right-6 text-white hover:text-white text-[36px] sm:text-xl"
        >
          &times;
        </button>
        <div className="flex flex-col  absolute top-6 left-2 m-4 h-[80%] justify-between mt-[50px] sm:mt-4 sm:h-auto">
          <h2 className="text-white opacity-100 uppercase mb-10  h2Title !text-[42px] ">
            Suscribe and get special discounts!
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
                <span>Enviar</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
