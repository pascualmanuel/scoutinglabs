import React from "react";
import ArrowIcon from "../../assets/icons/arrow.svg";
import "../../styles/Home.css";
import VeoLogo from "../../assets/icons/veo-logo.svg";
import Button from "../Button";
import VeoCamImg from "../../assets/home/veo-transparent.webp";
import TeamsCarousel from "../TeamsCarousel";

import { graphql } from "gatsby";
import { useStaticQuery } from "gatsby";
import { useLanguage } from "../../hooks/LanguageContext.js";
import LangLink from "../../hooks/LangLink.jsx";
import useHomeData from "../../hooks/useHomeData.jsx";
import { ParseMarkdown } from "../../hooks/ParseMarkdown.js";
const HomeVeo = () => {
  const { locale } = useLanguage();
  const currentLocale = locale;

  const data = useHomeData();

  const localizedData =
    data?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === currentLocale.toLowerCase()
    ) || data;

  return (
    <>
      <div className="mb-[80px] md:mb-[180px] max-w-[1536px] mx-6 lm:mx-16 xl:mx-28 2xl:mx-auto 2xl:px-28 mt-14 md:mt-[100px]">
        <div className="h-280 relative mt-16 ">
          <p className="subH text-grey4 text-right">
            {localizedData?.why_scouting_upTitle}
          </p>
          <h2 className="h1Title my-6 md:w-[580px]">
            {localizedData?.first_title}
          </h2>
          <h2 className="h1Title text-right">{localizedData?.second_title}</h2>
        </div>
        <div className="mt-28 ">
          <div className="flex flex-col md:flex-row md:gap-6 justify-between">
            {localizedData?.box_link.map((item, index) => (
              <div key={index} className="box-sc">
                <a
                  href={item.link}
                  className="group flex items-center justify-between subH border-t border-[#434652] pt-7"
                >
                  {item.title}
                  <span className="">
                    <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center relative overflow-hidden">
                      <div className="flex items-center transition-transform duration-500 ease-in-out transform group-hover:translate-x-16 group-hover:-translate-y-16">
                        <img src={ArrowIcon} className="" />
                      </div>

                      <div className="absolute flex items-center transition-transform duration-500 ease-in-out transform group-hover:translate-x-[51px] group-hover:translate-y-[-51px] bottom-[-35px] left-[-35px]">
                        <img src={ArrowIcon} className="" />
                      </div>
                    </div>
                  </span>
                </a>
                <p className="body1 text-grey2 mb-8">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="veo-bg ">
        <div className="flex flex-col items-center justify-center text-center pt-[60px] md:pt-0">
          <div className="mb-4 lg:mb-8 max-w-[280px]">
            <span className=" bg-[#faf9f61a] body3 p-1 pr-2 pl-1 rounded-full border border-[#FAF9F64D] flex items-center aeonik">
              <span className="w-[25px] h-[25px] bg-[#0A3D14] rounded-full border border-grey3 inline-block relative mr-2">
                <img
                  src={VeoLogo}
                  alt="Veo Logo"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[17px] h-[17px]"
                />
              </span>
              {locale === "ES"
                ? "Distribuidor oficial de Veo Technologies"
                : "Official distributor of Veo Technologies"}
            </span>
          </div>
          <h2 className="h1Title pt-[50px] w-[270px] sm:w-auto ">
            {localizedData?.veo_first_title}
          </h2>
          <img src={VeoCamImg} className="my-[-102px] relative w-[300px]" />
          <h2 className="h1Title  sm:w-auto">
            <ParseMarkdown text={localizedData?.veo_second_title} />
          </h2>
          <p className="body2 px-5 text-grey2 py-9">
            {localizedData?.veo_desc}
          </p>
          <Button
            text={localizedData?.veo_button?.text}
            link={localizedData?.veo_button?.link}
            width="w-[90vw] sm:w-[225px]"
          />
        </div>
      </div>
      <div className="mx-6 lm:mx-16 mb-16 lg:mx-28 max-w-screen-2xl 2xl:mx-auto 2xl:px-28">
        <h2 className="h1Title uppercase text-left sm:w-[490px]">
          {/* Confian en <br /> nosotros */}
          {localizedData?.confian_first_title}
        </h2>
        <div className="flex justify-end w-full">
          <h2 className="text-clearBlue text-right h1Title mt-6 smallLetter ms:w-[685px] mg:w-[900px]">
            <span className="text-skyBlue">
              {/* clubes, torneos <br /> y academias */}
              {localizedData?.confian_second_title}
            </span>
            {/* &nbsp; de todo el mundo */}
          </h2>
        </div>
      </div>
      <TeamsCarousel />
    </>
  );
};

export default HomeVeo;
