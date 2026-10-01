import React from "react";
import usePagesData from "../../hooks/usePagesData";
import { useLanguage } from "../../hooks/LanguageContext";
import { ParseMarkdown } from "../../hooks/ParseMarkdown";

const WhereWeAre = () => {
  const items = [
    {
      country: "Argentina",
      countryCode: "ar",
    },
    {
      country: "uruguay",
      countryCode: "uy",
    },
    {
      country: "Colombia",
      countryCode: "co",
    },
    {
      country: "Chile",
      countryCode: "cl",
    },
    {
      country: "Ecuador",
      countryCode: "ec",
    },
    {
      country: "Perú",
      countryCode: "pe",
    },
    {
      country: "Bolivia",
      countryCode: "bo",
    },
    {
      country: "Brazil",
      countryCode: "br",
    },
    {
      country: "México",
      countryCode: "mx",
    },
    {
      country: "USA",
      countryCode: "us",
    },
    {
      country: "España",
      countryCode: "es",
    },
    {
      country: "Chipre",
      countryCode: "cy",
    },
    {
      country: "Australia",
      countryCode: "au",
    },
    {
      country: "Japon",
      countryCode: "jp",
    },
  ];

  const { nosotrosData } = usePagesData();
  const { locale } = useLanguage();
  const localizedData =
    nosotrosData?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || nosotrosData;

  return (
    <>
      <div>
        <h2 className="pb-10 pt-40 h1Title text-center m-auto w-[300px] ssm:w-full ">
          <ParseMarkdown text={localizedData?.paises_title} />
        </h2>
      </div>
      <div className="flex flex-row flex-wrap gap-4 max-w-[630px] lm:max-w-[900px] m-auto justify-center px-4">
        {localizedData?.paises.map((item) => (
          <div
            key={item?.country_name}
            className="w-[95px] h-[85px] rounded-lg bg-[#eaeaea1a] p-4"
          >
            <div className="w-[25px] h-[25px]  rounded-full ">
              <img
                src={`https://flagcdn.com/${item.country_code}.svg`}
                className="w-full h-full object-cover rounded-full"
                alt="Ukraine"
              />
            </div>
            <p className="body2 mt-3"> {item?.country_name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WhereWeAre;
