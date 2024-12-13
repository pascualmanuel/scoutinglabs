import React, { useState, useEffect } from "react";
import { Link } from "gatsby"; // Asumir que usas gatsby para la navegación
import WhiteLogo from "../assets/white-logo.svg";
import Button from "./Button";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [locale, setLocale] = useState("ES"); // Idioma por defecto

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "ES";
    setLocale(savedLocale);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleLanguage = () => setLanguageOpen(!languageOpen);
  const closeMenu = () => setMenuOpen(false); // Cierra el menú al hacer clic en un enlace

  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale); // Guardar el idioma seleccionado
    setLanguageOpen(false); // Cerrar el dropdown
  };

  return (
    <nav className="bg-iBlue  relative">
      {/* Logo y Botón de Contactanos */}
      <div className="flex justify-between items-center h-[72px] mx-5">
        <img src={WhiteLogo} alt="Logo" className="w-[120px]" />
        <Button
          link="/prueba"
          text="Contactanos"
          bg="#0584F5"
          textColor="#fff"
          width="sm:w-[125px] md:w-[400px]"
          className={`transition-all duration-300 ${
            menuOpen ? "absolute bottom-4" : ""
          }`}
        >
          Contactanos
        </Button>
        {/* Icono de hamburguesa */}
        <div
          className="flex flex-col justify-between items-center w-[24px] h-[18px] cursor-pointer z-10"
          onClick={toggleMenu}
        >
          <div
            className={`h-[2px] w-full bg-white transition-transform duration-300  ${
              menuOpen ? "transform rotate-45 translate-y-[8px] mt-0" : "mt-1"
            }`}
          />

          <div
            className={`h-[2px] w-full bg-white transition-transform duration-300 ${
              menuOpen ? "transform -rotate-45 translate-y-[-8px]" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={`absolute navbar-background top-0 left-0 w-screen h-[100dvh] bg-iBlue bg-opacity-100 transition-transform duration-300 ease-in-out transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="flex items-center justify-between mr-[78px] h-[72px] ml-5">
          {/* Logo */}
          <img src={WhiteLogo} alt="Logo" className="w-[120px]" />

          {/* Toggle de idioma */}
          <div
            className={`relative lang-selector select-none rounded-lg ${
              languageOpen ? "rounded-t-lg rounded-b-none" : "closed"
            }`}
          >
            <span
              className="text-white cursor-pointer flex flex-row items-center ml-2"
              onClick={toggleLanguage}
            >
              {locale} {locale === "ES" ? "🇪🇸" : "🇬🇧"}
              <svg
                className={`ml-2 transition-all duration-300 ${
                  languageOpen ? "rotate-180" : ""
                }`}
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 4.5L0.669873 1.38009e-07L9.33013 8.95112e-07L5 4.5Z"
                  fill="#D9D9D9"
                />
              </svg>
            </span>
            {languageOpen && (
              <div className="absolute top-full left-0 text-white lang-selector select-none rounded-b-lg">
                {locale !== "ES" && (
                  <span
                    className="cursor-pointer block ml-2"
                    onClick={() => changeLanguage("ES")}
                  >
                    ES 🇪🇸
                  </span>
                )}
                {locale !== "EN" && (
                  <span
                    className="cursor-pointer block ml-2"
                    onClick={() => changeLanguage("EN")}
                  >
                    EN 🇬🇧
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Links del menú */}
        <div className="flex flex-col mb-10 absolute bottom-0 z-100">
          <Link
            to="/veocam"
            className="text-white py-3 px-5 h2Title"
            onClick={closeMenu}
          >
            VEO CAM 3
          </Link>
          <Link
            to="/scoutingplay"
            className="text-white py-3 px-5 h2Title"
            onClick={closeMenu}
          >
            SCOUTINGPLAY
          </Link>
          <Link
            to="/becas"
            className="text-white py-3 px-5 h2Title"
            onClick={closeMenu}
          >
            BECAS
          </Link>
          <Link
            to="/precios"
            className="text-white py-3 px-5 h2Title"
            onClick={closeMenu}
          >
            PRECIOS
          </Link>
          <Link
            to="/nosotros"
            className="text-white py-3 px-5 h2Title"
            onClick={closeMenu}
          >
            NOSOTROS
          </Link>

          <div className="pt-11 flex justify-center w-screen ">
            <Button
              link="/prueba"
              text="Contactanos"
              bg="#0584F5"
              textColor="#fff"
              width="w-[90vw]"
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 "
            >
              Contactanos
            </Button>
          </div>
        </div>
        {/* <div className="ellipse"></div> */}
      </div>
    </nav>
  );
};

export default Navbar;
