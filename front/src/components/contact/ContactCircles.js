import React from "react";
import usePagesData from "../../hooks/usePagesData";
import { useLanguage } from "../../hooks/LanguageContext";
const ContactCircles = () => {
  const { contactData } = usePagesData();
  const { locale } = useLanguage();
  const localizedData =
    contactData?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || contactData;

  return (
    <>
      <div className="flex flex-row ml-2 mt-4 mb-8 ">
        {localizedData?.imagenes_nosotros?.map((item) => (
          <div className="w-[55px] h-[55px] border-grey4 border rounded-full ml-[-6px]">
            <img
              src={item?.url}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactCircles;
