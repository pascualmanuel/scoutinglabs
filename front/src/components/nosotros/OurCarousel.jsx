import React from "react";
import usePagesData from "../../hooks/usePagesData";
import { useLanguage } from "../../hooks/LanguageContext";
import { ParseMarkdown } from "../../hooks/ParseMarkdown";

const OurCarousel = () => {
  const { nosotrosData } = usePagesData();
  const { locale } = useLanguage();
  const localizedData =
    nosotrosData?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || nosotrosData;

  return (
    <>
      <div>
        <div className="flex flex-wrap justify-center max-w-[960px] gap-5 m-auto pt-40">
          {localizedData.boxes?.map((item) => (
            <div key={item.name} className="w-[305px] h-[405px] mt-16">
              <img
                src={`${item?.media?.url}`}
                className="w-full h-[305px] rounded-lg object-cover"
              />
              <p className="subH2 text-grey4 mt-10 mb-1">{item.description}</p>
              <h2 className="subH">{item.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurCarousel;
