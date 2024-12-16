import React, { useState, useEffect, useRef } from "react";
import "../styles/Navbar.css";
import { Link } from "gatsby"; // Usando Gatsby Link
import { useLocation } from "@reach/router"; // Usamos useLocation para obtener la ubicación actual

const Navbardos = () => {
  const location = useLocation();

  // Usamos useRef para mantener la posición del dot de manera persistente
  const dotPositionRef = useRef(0); // Guarda la última posición del dot
  const [dotPosition, setDotPosition] = useState(dotPositionRef.current); // Estado para la posición visible

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Activamos la transición cada vez que la ruta cambia
    setIsTransitioning(true);

    // Determinamos la nueva posición del dot según la ruta activa
    let newPosition;
    switch (location.pathname) {
      case "/veo-cam/":
        newPosition = 0;
        break;
      case "/scouting-play/":
        newPosition = 100;
        break;
      case "/prueba/":
        newPosition = 200;
        break;
      case "/suscripciones/":
        newPosition = 300;
        break;
      default:
        newPosition = dotPositionRef.current; // Mantener la última posición si no hay cambio de ruta
        break;
    }

    // Solo actualizamos si la nueva posición es diferente
    if (newPosition !== dotPositionRef.current) {
      dotPositionRef.current = newPosition; // Guardamos la nueva posición en el ref
      setDotPosition(newPosition); // Actualizamos el estado
    }

    // Terminamos la transición después de 500ms
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // El tiempo de transición (ajustable)

    // Limpiamos el timer cuando el efecto termine
    return () => clearTimeout(timer);
  }, [location.pathname]); // Este efecto solo se ejecutará cuando la ruta cambie

  // Debug: Para ver la posición de `dotPosition` en cada render
  console.log(dotPosition);

  return (
    <>
      <div className="header-dot">
        <div className="section-dot">
          <div className="nav-dot">
            <Link
              to="/veo-cam"
              className={`menuItem top ${dotPosition === 0 ? "active" : ""}`}
            >
              Veo Cam 3
            </Link>
            <Link
              to="/scouting-play"
              className={`menuItem about ${
                dotPosition === 100 ? "active" : ""
              }`}
            >
              ScoutingPlay
            </Link>
            <Link
              to="/prueba"
              className={`menuItem work ${dotPosition === 200 ? "active" : ""}`}
            >
              prueba
            </Link>
            <Link
              to="/suscripciones"
              className={`menuItem contact ${
                dotPosition === 300 ? "active" : ""
              }`}
            >
              Suscripciones
            </Link>

            {/* Punto dinámico que se mueve suavemente */}
            <div
              className={`line ${isTransitioning ? "transitioning" : ""}`}
              style={{ left: `${dotPosition}px` }}
            >
              •
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbardos;
