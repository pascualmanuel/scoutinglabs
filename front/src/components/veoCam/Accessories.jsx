import React from "react";
import Button from "../Button";
import Accessorie1 from "../../assets/veocam/accessories/Accessorie-1.png";
import Accessorie2 from "../../assets/veocam/accessories/Accessorie-2.png";
import Accessorie3 from "../../assets/veocam/accessories/Accessorie-3.png";

import usePagesData from "../../hooks/usePagesData";
import { useLanguage } from "../../hooks/LanguageContext";
import { ParseMarkdown } from "../../hooks/ParseMarkdown";
const Accessories = () => {
  const data = [
    {
      title: "Tripode  de  5,2 metros",
      description:
        "Te recomendaremos la suscripción que mejor se adapte a lo que necesitas.",
      imgSrc: Accessorie1, // Aquí puedes agregar la URL de la imagen
    },
    {
      title: "Tripode  de  7,4 metros",
      description: "Llevamos tu cámara y la configuramos donde quieras.",
      imgSrc: Accessorie2, // Aquí puedes agregar la URL de la imagen
    },
    {
      title: "travel case",
      description:
        "Te enseñamos a sacarle el jugo a los datos y mejorar tu nivel con la Veo Cam 3.",
      imgSrc: Accessorie3, // Aquí puedes agregar la URL de la imagen
    },
    {
      title: "travel bag",
      description: "Estamos conectados para resolver tus inquietudes.",
      imgSrc: Accessorie1, // Aquí puedes agregar la URL de la imagen
    },
  ];
  const { accessoriesData } = usePagesData();
  const { locale } = useLanguage();
  const localizedData =
    accessoriesData?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || accessoriesData;

  return (
    <>
      <div className="bg-grey0 py-28">
        <div className="md:max-w-[1536px] ml-6 llg:mx-6 lg:mx-16 xl:mx-28 2xl:mx-auto 2xl:px-28 mt-14 md:mt-[100px] ">
          <h3 className="h1Title uppercase mb-[70px] text-black">
            Accessories
          </h3>
          <div className="overflow-x-auto llg:overflow-hidden pr-6 llg:pr-0">
            <div className="flex flex-row gap-4 llg:gap-6 justify-between  m-auto w-fit llg:w-[auto]">
              {localizedData?.map((item, index) => (
                <div key={index} className="h-[290px] w-[310px] text-black">
                  <img
                    src={`${process.env.REACT_APP_API_URL}${item?.image?.url}`}
                    className="!w-[100%] max-h-[175px]"
                  />
                  <h3 className="subH my-4">{item?.title}</h3>
                  <p className="body2">{item?.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-[100px]">
          <p className="body1 text-iBlue">Quieres saber mas?</p>
          <div className="py-6 flex flex-col sm:flex-row">
            <div className="mr-0 sm:mr-4 pb-[10px] sm:pb-0">
              <Button
                text={"Contactanos"}
                width="w-[90vw] sm:w-[185px]"
                height="h-[48px]"
              />
            </div>
            <div>
              <Button
                text={"Recibir cotización"}
                width="w-[90vw] sm:w-[220px]"
                height="h-[48px]"
                bg={"rgba(255, 255, 255, 0.1)"}
                textColor="#03000D"
                border="solid 1px #03000D "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accessories;
