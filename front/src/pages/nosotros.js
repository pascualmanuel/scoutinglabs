import React from "react";
import Layout from "../components/Layout";
import NosotrosCa from "../assets/nosotros/nosotros-bg.webp";
import OurCarousel from "../components/nosotros/OurCarousel.jsx";
import WhereWeAre from "../components/nosotros/WhereWeAre.jsx";
import usePagesData from "../hooks/usePagesData";
import { useLanguage } from "../hooks/LanguageContext";
import { ParseMarkdown } from "../hooks/ParseMarkdown";

const Nosotros = () => {
  const { nosotrosData } = usePagesData();
  const { locale } = useLanguage();
  const localizedData =
    nosotrosData?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || nosotrosData;
  // style={{backgroundColor: `${nosotros}`}}
  return (
    <>
      <Layout>
        <div className="nosotros-bg h-[calc(100vh-70px)] max-h-[620px] sm:max-h-[800px] min-h-[600px] flex flex-col sm:justify-center">
          <div className="mx-6 lm:mx-16 lg:mx-28 max-w-screen-2xl 2xl:mx-auto 2xl:px-28 h-[480px] 2xl:w-full ssm:flex ssm:justify-between">
            <h3 className="h1Title uppercase text-left mt-[70px] max-w-[400px]">
              {localizedData?.left_title}
            </h3>
            <h3 className=" text-right h1Title  mt-[200px] md:mt-[330px] max-w-[400px]">
              {localizedData?.right_title}
            </h3>
          </div>
        </div>
        <div className="m-auto text-grey2 pt-10">
          <p className="mx-6 lm:mx-16 lg:mx-28 max-w-[1020px] 2xl:mx-auto  body0">
            <ParseMarkdown
              text={
                locale === "EN"
                  ? localizedData?.paragraph
                  : localizedData?.paragraph?.data?.paragraph
              }
            />
          </p>
        </div>
        <OurCarousel />
        <WhereWeAre />
      </Layout>
    </>
  );
};

export default Nosotros;
