import React from "react";
import "../styles/Layout.css";
import { Link } from "gatsby";
import LangLink from "../hooks/LangLink";
import useLayoutData from "../hooks/useLayoutData";
import { useLanguage } from "../hooks/LanguageContext";
import { ParseMarkdown } from "../hooks/ParseMarkdown";
const Prefooter = () => {
  const { footer } = useLayoutData();
  const { locale } = useLanguage();

  const localizedData =
    footer?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || footer;

  return (
    <>
      <div className="bg-iBlue prefooter-bg mt-[px]">
        <div className="relative max-w-[600px] mx-auto">
          <LangLink to={localizedData.footerCards[1].link}>
            <div className="first-card w-[214px] h-[226px] sm:w-[219px] sm:h-[310px]  right-[30px] lm:right-[-60px] lg:right-[-190px] lg:top-[80px] pl-4">
              <div className="flex flex-col h-[226px] sm:h-[310px] justify-around text-black">
                <p className="uppercase grotzec subH flex flex-col">
                  <span className="text-[40px] leading-[0px] pb-2">•</span>
                  {localizedData.footerCards[1].title}
                </p>
                <p className="body3 w-[180px] ">
                  {localizedData.footerCards[1].description}
                </p>
                <p className="uppercase h2Title text-sm">
                  {localizedData.footerCards[1].second_title}
                </p>
              </div>
            </div>
          </LangLink>
          <div className="flex items-center justify-center h-[670px]">
            <h2 className="uppercase relative h1Title sm:text-[90px] text-center w-[360px] sm:min-w-[735px] text-white   sm:!leading-[82px]">
              {/* <ParseMarkdown text="<sBlue>The revolution</sBlue> of amateur sport" /> */}
              <ParseMarkdown text={localizedData.preFooter_title} />

              {/* {localizedData.preFooter_title} */}
            </h2>
          </div>
          <LangLink to={localizedData.footerCards[0].link}>
            <div className="second-card w-[214px] h-[291px] sm:w-[219px] sm:h-[300px]  left-[28px] top-[434px] sm:left-[5px] sm:top-[380px]  lg:top-[395px] lg:left-[-180px]  mg:top-[325px] mg:left-[-223px] pl-4 text-black">
              <div className="flex flex-col h-[291px] sm:h-[300px] justify-around">
                <p className="uppercase grotzec subH flex flex-col">
                  <span className="text-[40px] leading-[0px] pb-2">•</span>
                  {localizedData.footerCards[0].title}
                </p>
                <p className="body3 w-[180px]">
                  {localizedData.footerCards[0].description}
                </p>
                <p className="uppercase h2Title">
                  {" "}
                  {localizedData.footerCards[0].second_title}
                </p>
              </div>
            </div>
          </LangLink>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Prefooter;
