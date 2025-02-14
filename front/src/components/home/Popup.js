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

  return (
    <div className="absolute inset-0 z-50">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black ${
          isVisible ? "opacity-50" : "opacity-0"
        } transition-opacity duration-1000`}
        onClick={onClose}
      ></div>

      {/* Popup Content */}
      <div
        className={`absolute bottom-[100px] right-[65px] rounded-lg shadow-lg w-[420px] transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } animate-fadeIn`}
      >
        {" "}
        {/* Close Button */}
        <img src={VeocamBg} className="object-cover" />
        <button
          onClick={onClose}
          className="absolute top-2 right-6 text-white hover:text-white text-xl"
        >
          &times;
        </button>
        <div className=" absolute top-6 left-2 m-4 ">
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
          {/* {errors.email && ( */}
          <p className="text-red-500  text-sm mt-1"></p>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Popup;
