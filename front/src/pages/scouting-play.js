import React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import SPLogo from "../assets/scoutingplay/scouting-play-logo.svg";
import Tiktok from "../assets/scoutingplay/icons/tiktok.svg";
import Instagram from "../assets/scoutingplay/icons/instagram.svg";
import Youtube from "../assets/scoutingplay/icons/yb.svg";
import ScoutingPLayReels from "../components/ScoutingPlayReels";
import usePagesData from "../hooks/usePagesData";
import { useLanguage } from "../hooks/LanguageContext";
import { ParseMarkdown } from "../hooks/ParseMarkdown";
const ScoutinPlay = () => {
  const { scoutingPlayPage } = usePagesData();
  const { locale } = useLanguage();
  console.log(scoutingPlayPage);
  const localizedData =
    scoutingPlayPage?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || scoutingPlayPage;



  const data = [
    {
      title: "+2 m",
      description: "Followers",
    },
    {
      title: "+123 m",
      description: "Views",
    },
    {
      title: "+450 k",
      description: "Likes",
    },
    {
      title: "+123 k",
      description: "Comments",
    },
  ];

  return (
    <>
      <Layout>
        <div className="sPlay-bg h-[800px] flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <img src={SPLogo} className="mb-8" />
            <h2
              className="h1Title text-clearBlue w-[270px] sm:w-[400px]
             mg:w-auto text-center mb-4 sm:mb-0"
            >
              UNA COMUNIDAD
            </h2>
            <h2 className="h1Title w-[270px] sm:w-[400px] mg:w-auto text-center">
              LA MISMA PASION
            </h2>
          </div>
          <div className=" flex flex-wrap justify-center gap-2 sm:gap-4 mt-10">
            <Button
              text={"Digitaliza tu torneo"}
              width="w-[93vw] sm:w-[auto] lg:w-[196px]"
              height="h-[50px]"
            />
            <Button
              width="w-[30vw] sm:w-[auto]"
              height="h-[50px]"
              bg="#F6F6F633"
            >
              <div className="flex flex-row items-center px-2">
                <img src={Tiktok} alt="Tiktok" className="w-6 h-6" />
                <p className="buttonText hidden md:block ml-4">Tiktok</p>
              </div>
            </Button>

            <Button
              width="w-[30vw] sm:w-[auto]"
              height="h-[50px]"
              bg="#F6F6F633"
            >
              <div className="flex flex-row items-center px-2">
                <img src={Instagram} alt="Instagram" className="w-6 h-6" />
                <p className="buttonText hidden md:block ml-4">Instagram</p>
              </div>
            </Button>

            <Button
              width="w-[30vw] sm:w-[auto]"
              height="h-[50px]"
              bg="#F6F6F633"
            >
              <div className="flex flex-row items-center px-2">
                <img src={Youtube} alt="Youtube" className="w-6 h-6" />
                <p className="buttonText hidden md:block ml-4">Youtube</p>
              </div>
            </Button>
          </div>
          <div className="mt-14 mx-4">
            <div className="flex flex-row md:gap-6 justify-between max-w-[780px] mg:max-w-[1000px] m-auto">
              {localizedData?.datos.map((item, index) => (
                <div
                  key={index}
                  className="box-sc w-[20%] flex flex-col items-center border-t border-grey2 pt-5"
                >
                  <p className="group flex items-center justify-between subH  py-2 sm:!text-[45px]">
                    {item?.title}
                  </p>
                  <p className="body1 text-grey2 mb-8 sm:!text-[18px] sm:mt-2">
                    {item?.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ScoutingPLayReels />
      </Layout>
    </>
  );
};

export default ScoutinPlay;
