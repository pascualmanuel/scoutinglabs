import React, { useEffect } from "react";
import VeocamBg from "../../assets/veocam-bg.webp";
import { useState } from "react";
const Popup = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Desactivar el scroll al abrir el popup

    // Hacer visible el popup después de 3 segundos
    setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => {};
  }, []);
  let errors = false;
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
  ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"} animate-fadeIn`}
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

          <input
            type="email"
            name="email"
            // value={formData.email}
            // onChange={handleChange}
            placeholder="Enter your email..."
            className="w-full pl-2 h-[50px] bg-[white] border border-[#434652] rounded-md body2 !text-iBlue"
          />
          {errors && <p className="text-red-500  text-sm mt-1"></p>}
        </div>
      </div>
    </div>
  );
};

export default Popup;
