// import React, { useState, useEffect, useRef } from "react";
// import "../styles/Navbar.css";
// import { Link } from "gatsby";
// import { useLocation } from "@reach/router";

// const Navbardos = () => {
//   const location = useLocation();

//   // Se establece el valor inicial desde localStorage o 0
//   const initialDotPosition = parseInt(
//     localStorage.getItem("dotPosition") || "0",
//     10
//   );

//   // Usamos useRef para persistir la posición entre renders
//   const dotPositionRef = useRef(initialDotPosition);
//   const [dotPosition, setDotPosition] = useState(dotPositionRef.current);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   useEffect(() => {
//     // Activamos la transición cuando la ruta cambia
//     setIsTransitioning(true);

//     let newPosition;
//     switch (location.pathname) {
//       case "/veo-cam/":
//         newPosition = 0;
//         break;
//       case "/scouting-play/":
//         newPosition = 100;
//         break;
//       case "/prueba/":
//         newPosition = 200;
//         break;
//       case "/suscripciones/":
//         newPosition = 300;
//         break;
//       default:
//         newPosition = dotPositionRef.current; // Mantener la última posición si no hay cambio de ruta
//         break;
//     }

//     // Guardamos la nueva posición en localStorage para persistir entre visitas
//     localStorage.setItem("dotPosition", newPosition);

//     // Actualizamos el ref y el estado de dotPosition
//     dotPositionRef.current = newPosition;
//     setDotPosition(newPosition);

//     // Terminamos la transición después de 500ms
//     const timer = setTimeout(() => {
//       setIsTransitioning(false);
//     }, 500);

//     // Limpiamos el timer cuando el efecto termine
//     return () => clearTimeout(timer);
//   }, [location.pathname]); // Solo se ejecuta cuando la ruta cambia

//   return (
//     <>
//       <div className="section-dot relative">
//         <div className="nav-dot">
//           <Link
//             to="/veo-cam"
//             className={`menuItem top ${dotPosition === 0 ? "active" : ""}`}
//           >
//             Veo Cam 3
//           </Link>
//           <Link
//             to="/scouting-play"
//             className={`menuItem about ${dotPosition === 100 ? "active" : ""}`}
//           >
//             ScoutingPlay
//           </Link>
//           <Link
//             to="/prueba"
//             className={`menuItem work ${dotPosition === 200 ? "active" : ""}`}
//           >
//             prueba
//           </Link>
//           <Link
//             to="/suscripciones"
//             className={`menuItem contact ${
//               dotPosition === 300 ? "active" : ""
//             }`}
//           >
//             Suscripciones
//           </Link>

//           {/* Punto dinámico que se mueve suavemente */}
//           <div
//             className={`line ${isTransitioning ? "transitioning" : ""}`}
//             style={{ left: `${dotPosition}px` }}
//           >
//             •
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbardos;
