import React from "react";
import { useState, useEffect } from "react";

import "../../styles/Home.css";

import usePagesData from "../../hooks/usePagesData";
import { useLanguage } from "../../hooks/LanguageContext";
import { ParseMarkdown } from "../../hooks/ParseMarkdown";

const SportsSection = () => {
  const { veoCamPage } = usePagesData();
  const { locale } = useLanguage();
  const localizedData =
    veoCamPage?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || veoCamPage;

  let sports = localizedData?.slider;

  // useEffect(() => {
  //   sports.forEach((sport) => {
  //     const img = new Image();
  //     img.src = sport.image;
  //   });
  // }, []);

  const [activeSport, setActiveSport] = useState(sports[0]);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleHover = (sport) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoverTimeout(setTimeout(() => setActiveSport(sport), 300));
  };

  return (
    <>
      {/* <img src={FutbolBg} className="hidden" />
      <img src={RugbyBg} className="hidden" />
      <img src={HockeyBg} className="hidden" />
      <img src={VolleyBg} className="hidden" />
      <img src={HandballBg} className="hidden" />
      <img src={BasketBg} className="hidden" /> */}
      <div
        className="w-[90vw] h-[620px] sm:w-[100vw] sm:h-[705px] transition-all duration-300 background-transition m-auto rounded-md  md:rounded-none"
        style={{
          backgroundImage: `url('${activeSport?.bg_image?.url}'`,
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
                    activeSport.deporte === sport?.deporte
                      ? "text-[#FAF9F6] opacity-100"
                      : "text-[#FAF9F6] opacity-50"
                  }`}
                  onMouseEnter={() => handleHover(sport)}
                  onClick={() => setActiveSport(sport)}
                >
                  {sport?.deporte}
                </div>
              ))}
            </div>

            <div
              className="flex items-end sm:justify-end w-full pl-6
           sm:pt-[90px] sm:pb-32 pb-10 lm:p-24 text-white"
            >
              <p className="max-w-md body0 !text-lg pr-5 w-[450px]">
                <ParseMarkdown text={activeSport?.description} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SportsSection;
