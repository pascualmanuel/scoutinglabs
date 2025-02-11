import React from "react";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    sports.forEach((sport) => {
      const img = new Image();
      img.src = sport.image;
    });
  }, []);

  return (
    <>
      <img src={FutbolBg} className="hidden" />
      <img src={RugbyBg} className="hidden" />
      <img src={HockeyBg} className="hidden" />
      <img src={VolleyBg} className="hidden" />
      <img src={HandballBg} className="hidden" />
      <img src={BasketBg} className="hidden" />
      <div
        className="w-[90vw] h-[620px] sm:w-[100vw] sm:h-[705px] transition-all duration-500 background-transition m-auto rounded-md  md:rounded-none"
        style={{
          backgroundImage: `url('${activeSport.image}'`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-[100%]  bg-[linear-gradient(180deg,rgba(0,0,0,0)_-40%,#000000_86%)]  sm:bg-[linear-gradient(180deg,rgba(0,0,0,0)_46.13%,#000000_100%)] ">
          <div className="flex flex-col sm:flex-row h-full justify-between">
            {/* Lista de deportes */}
            <div className="flex flex-col justify-center pt-11 sm:pt-0 px-6 md:px-16 lg:px-28 max-w-screen-2xl mx-auto ">
              {sports?.map((sport) => (
                <div
                  key={sport.name}
                  className={`h2Title my-[10px]  cursor-pointer transition-opacity duration-300 text-center sm:text-start ${
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

            <div
              className="flex items-end sm:justify-end w-full pl-6
           sm:pt-[90px] sm:pb-32 pb-10 lm:p-24 text-white"
            >
              <p className="max-w-md body0 !text-lg pr-5 w-[450px]">
                {activeSport?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SportsSection;
