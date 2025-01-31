import React from "react";
import { useState } from "react";
import FutbolBg from "../../assets/veocam/sports/Sport-5.webp";
import RugbyBg from "../../assets/veocam/sports/Sport-6.webp";
import HockeyBg from "../../assets/veocam/sports/Sport-3.webp";
import VolleyBg from "../../assets/veocam/sports/Sport-4.webp";
import HandballBg from "../../assets/veocam/sports/Sport-2.webp";
import BasketBg from "../../assets/veocam/sports/Sport-1.webp";
import "../../styles/Home.css";
const sports = [
  {
    name: "Futbol",
    image: FutbolBg,
    description:
      "Graba y analiza tus partidos y entrenamientos de fútbol. Revive los mejores goles, asistencias y jugadas clave con precisión.",
  },
  {
    name: "Rugby",
    image: RugbyBg,
    description:
      "Captura la intensidad de tu partido de rugby. Analiza las jugadas más impactantes, tries y momentos decisivos para seguir mejorando tu nivel.",
  },
  {
    name: "Hockey",
    image: HockeyBg,
    description:
      "Graba y estudia tus partidos y entrenamientos de hockey. Revisa las mejores jugadas, goles y analiza tus tácticas de juego.",
  },
  {
    name: "Volley",
    image: VolleyBg,
    description:
      "Captura la acción de tu partido de vóley. Analiza los mejores saques, bloqueos y puntos cruciales.",
  },
  {
    name: "Handball",
    image: HandballBg,
    description:
      "Graba tu partido de handball y revisa las jugadas más emocionantes, goles y defensas clave.",
  },
  {
    name: "Basket",
    image: BasketBg,
    description:
      "Revive tu partido de baloncesto. Revisa los mejores triples, asistencias y jugadas de alto impacto.",
  },
];
const SportsSection = () => {
  const [activeSport, setActiveSport] = useState(sports[0]);

  return (
    <div
      // className="w-[90vw] h-[620px] sm:w-[100vw] sm:h-[705px] transition-all duration-500"
      className="w-[90vw] h-[620px] sm:w-[100vw] sm:h-[705px] transition-all duration-500 background-transition"
      style={{
        backgroundImage: `url('${activeSport.image}'`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // transition: "background 0.5s ease-in-out", // Transición suave
      }}
    >
      <div
        className="h-[100%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 46.13%, #000000 100%)",
        }}
      >
        <div className="flex flex-col sm:flex-row h-full">
          {/* Lista de deportes */}
          <div className="flex flex-col justify-center px-6 md:px-16 lg:px-28 max-w-screen-2xl mx-auto ">
            {sports?.map((sport) => (
              <div
                key={sport.name}
                className={`h2Title my-[10px]  cursor-pointer transition-opacity duration-300 ${
                  activeSport.name === sport.name
                    ? "text-[#FAF9F6] opacity-100"
                    : "text-[#FAF9F6] opacity-50"
                }`}
                onMouseEnter={() => setActiveSport(sport)}
                onClick={() => setActiveSport(sport)}
              >
                {sport?.name}
              </div>
            ))}
          </div>

          <div className="flex items-end justify-end w-full p-6 sm:p-12 text-white text-right ">
            <p className="max-w-md body0 !text-lg ">
              {activeSport?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsSection;
