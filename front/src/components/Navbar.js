import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby"; // Asumir que usas gatsby para la navegación
import WhiteLogo from "../assets/white-logo.svg";
import Button from "./Button";
import "../styles/Layout.css";
import { useLocation } from "@reach/router";
import useWindowSize from "../hooks/useWindowSize";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [locale, setLocale] = useState("ES"); // Idioma por defecto
  const { width, height } = useWindowSize(); // Destructure window size from the hook

  const [mLeft, setMLeft] = useState(192);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newMLeft = 192;

      if (width < 1024) newMLeft = 0;
      else if (width < 1300) newMLeft = 80;
      else if (width < 1400) newMLeft = 192;

      setMLeft(newMLeft);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const menuItems = [
    { path: "/veo-cam/", label: "Veo Cam 3", position: 0 },
    { path: "/scouting-play/", label: "ScoutingPlay", position: 120 },
    { path: "/nosotros/", label: "Nosotros", position: 300 },

    { path: "/suscripciones/", label: "Suscripciones", position: 300 },
    { path: "/ayuda", label: "Ayuda!", position: 300 },
  ];

  const location = useLocation();

  // Usamos useRef para persistir la posición entre renders
  const [initialDotPosition, setInitialDotPosition] = useState(() => {
    // Valor inicial seguro: intenta obtenerlo de localStorage si es cliente
    if (typeof window !== "undefined" && localStorage) {
      return parseInt(localStorage.getItem("dotPosition") || "0", 10);
    }
    return 0; // Valor por defecto para SSR
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const dotPositionRef = useRef(initialDotPosition);
  const [dotPosition, setDotPosition] = useState(dotPositionRef.current);
  const [helpPosition, setHelpPosition] = useState(555); // Valor inicial

  // Se establece el valor inicial desde localStorage o 0

  // Se establece el valor inicial desde localStorage o 0 solo en el cliente
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage) {
      const storedPosition = parseInt(
        localStorage.getItem("dotPosition") || "0",
        10
      );
      dotPositionRef.current = storedPosition; // Guardamos la posición en el ref
      setDotPosition(storedPosition); // Establecemos el estado
    }
  }, []); // Este useEffect solo se ejecuta una vez cuando el componente se monta

  useEffect(() => {
    // Actualizar helpPosition según el tamaño de la ventana
    let newHelpPosition = 555; // Valor por defecto

    if (width < 1024) {
      newHelpPosition = 360;
    } else if (width < 1300) {
      newHelpPosition = 442;
    } else if (width < 1400) {
      newHelpPosition = 555;
    }

    // Establecer el nuevo valor de helpPosition
    setHelpPosition(newHelpPosition);
  }, [width]); // Este efecto se ejecuta cada vez que cambia windowSize

  useEffect(() => {
    if (dotPosition === null) return; // Esperamos a que el estado de dotPosition se inicialice

    // Activamos la transición cuando la ruta cambia
    setIsTransitioning(true);

    let newPosition;
    switch (location.pathname) {
      case "/veo-cam/":
        newPosition = 0;
        break;
      case "/scouting-play/":
        newPosition = 90;
        break;
      case "/nosotros/":
        newPosition = 180;
        break;
      case "/suscripciones/":
        newPosition = 270;
        break;
      case "/ayuda/":
        newPosition = helpPosition;
        break;
      case "/":
        newPosition = null;
        break;
      case "/contacto/":
        newPosition = null;
        break;
      default:
        newPosition = dotPositionRef.current; // Mantener la última posición si no hay cambio de ruta
        break;
    }

    // Guardamos la nueva posición en localStorage para persistir entre visitas
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("dotPosition", newPosition);
    }

    // Actualizamos el ref y el estado de dotPosition
    dotPositionRef.current = newPosition;
    setDotPosition(newPosition);

    // Terminamos la transición después de 500ms
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    // Limpiamos el timer cuando el efecto termine
    return () => clearTimeout(timer);
  }, [location.pathname, helpPosition]); // Solo se ejecuta cuando la ruta cambia

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && lastScrollY < 90) {
      // Keep the navbar visible when scrolling down near the top
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY) {
      // Hide the navbar when scrolling down beyond 90px
      setIsVisible(false);
    } else {
      // Show the navbar when scrolling up
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only add event listener if running in browser (Gatsby has SSR)
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  return (
    <div
      className={`navbar fixed z-[1000] w-full ${
        isVisible ? "navbar-visible bg-iBlue  z-50" : "navbar-hidden"
      }`}
    >
      <nav className="bg-iBlue  relative">
        <div className=" h-[72px] mx-auto max-w-screen-2xl flex justify-between items-center ">
          <Link to={"/"}>
            <div className="ml-[20px] mg:ml-[80px] xl:ml-28">
              <img src={WhiteLogo} alt="Logo" className="w-[120px]" />
            </div>
          </Link>
          <div className="flex flex-row justify-between section-dot relative llg:ml-[-110px]">
            <div className="nav-dot relative flex items-center">
              <div>
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="text-grey1 body2 hidden lg:block"
                    style={
                      item.path === "/ayuda" ? { marginLeft: `${mLeft}px` } : {}
                    }
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              {/* Aquí iría el código para el dot indicator */}
              {dotPosition !== null && (
                <div
                  className={`line ${isTransitioning ? "transitioning" : ""}`}
                  style={{
                    left: `${dotPosition}px`,
                    top: `25px`,
                    transition: isTransitioning ? "left 0.5s ease" : "none",
                  }}
                >
                  •
                </div>
              )}
            </div>
            <div className="flex flex-row cursor-pointer justify-end items-center llg:mr-[20px] mg:mr-[80px] xl:mr-28">
              <div
                className={`transition-[1000] ${
                  languageOpen ? "mt-[-30px]" : "mt-0"
                }`}
                onClick={toggleLanguage}
              >
                <div
                  className={`relative lang-selector  select-none rounded-lg hidden  llg:flex mr-3 lg:mr-4 ${
                    languageOpen ? "rounded-t-lg rounded-b-none" : "closed"
                  }`}
                >
                  <span className="text-white cursor-pointer flex flex-row items-center  ml-2">
                    {locale} {locale === "ES" ? "🇪🇸" : "🇬🇧"}
                    <svg
                      className={`ml-2 transition-all duration-300 absolute right-[10px] ${
                        languageOpen ? "rotate-180 bottom-[0px]" : ""
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
                    <div className="absolute top-full left-0 text-white lang-selector  select-none rounded-b-lg flex">
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
              <div className="hidden llg:block">
                <Button
                  link="/contacto"
                  text="Contactanos"
                  bg="#0584F5"
                  textColor="#fff"
                  width="w-[129px] "
                  className={`transition-all duration-300  ${
                    menuOpen ? "absolute bottom-4" : ""
                  }`}
                >
                  Contactanos
                </Button>
              </div>
            </div>
          </div>

          {/* Icono de hamburguesa */}
          <div className="flex items-center  llg:hidden">
            <Button
              link="/contacto"
              text="Contactanos"
              bg="#0584F5"
              textColor="#fff"
              width="w-[129px] "
              className={`transition-all duration-300 llg:hidden ${
                menuOpen ? "absolute bottom-4" : ""
              }`}
            >
              Contactanos
            </Button>

            <div
              className="flex flex-col justify-between items-center w-[24px] h-[18px] cursor-pointer  mx-[20px] llg:hidden z-[1000]"
              onClick={toggleMenu}
            >
              <div
                className={`h-[2px] w-full bg-white transition-transform duration-300  ${
                  menuOpen
                    ? "transform rotate-45 translate-y-[8px] mt-0"
                    : "mt-1"
                }`}
              />

              <div
                className={`h-[2px] w-full bg-white transition-transform duration-300 ${
                  menuOpen ? "transform -rotate-45 translate-y-[-8px]" : ""
                }`}
              />
            </div>
          </div>
        </div>
        <div
          className={`z-[999] absolute navbar-background top-0 left-0 w-screen h-[100dvh] bg-iBlue bg-opacity-100 transition-transform duration-300 ease-in-out transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ willChange: "transform" }}
        >
          <div className="flex items-center justify-between mr-[78px] h-[72px] ml-5">
            <Link to={"/"}>
              <img src={WhiteLogo} alt="Logo" className="w-[120px]" />
            </Link>
            {/* Toggle de idioma */}
            <div
              className={`relative lang-selector  select-none flex rounded-lg ${
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
                <div className="absolute  top-full left-0 text-white lang-selector  select-none rounded-b-lg">
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
              to="/veo-cam"
              className="text-white py-3 px-5 h2Title"
              onClick={closeMenu}
            >
              VEO CAM 3
            </Link>
            <Link
              to="/scouting-play"
              className="text-white py-3 px-5 h2Title"
              onClick={closeMenu}
            >
              SCOUTINGPLAY
            </Link>
            {/* <Link
              to="/becas"
              className="text-white py-3 px-5 h2Title"
              onClick={closeMenu}
            >
              BECAS
            </Link> */}
            <Link
              to="/suscripciones"
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
            <Link
              to="/ayuda"
              className="text-white py-3 px-5 h2Title"
              onClick={closeMenu}
            >
              ayuda
            </Link>

            <div className="pt-11 flex justify-center w-screen ">
              <Button
                link="/contacto"
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
    </div>
  );
};

export default Navbar;
