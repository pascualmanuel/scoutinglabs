import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout"; // Si tienes un layout común
import Seo from "../../components/Seo.js"; // Si estás usando SEO dinámico
import "../../styles/Layout.css";
import "../../styles/Home.css";
import HeroVideo from "../../assets/videos/hero-video.mp4";
import ArrowIcon from "../../assets/icons/arrow.svg";
import ReactSVG from "react-svg";
// import VeoIcon from "../../assets/icons/veo-icon.png";
import VeoLogo from "../../assets/icons/veo-logo.svg";
import Six from "../../assets/icons/six.svg";
import Button from "../Button.js";
import Pablo from "../../assets/pablo.png";
import Popup from "./Popup.js";
import { useEffect, useState, useRef } from "react";
import { useStaticQuery } from "gatsby";
import { useLanguage } from "../../hooks/LanguageContext.js";
import LangLink from "../../hooks/LangLink.jsx";
import useHomeData from "../../hooks/useHomeData";

const HomeHero = ({ onVideoLoad, onError, playVideo }) => {
  const { locale } = useLanguage();
  const currentLocale = locale;
  const data = useHomeData();

  const localizedData =
    data?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === currentLocale.toLowerCase()
    ) || data;

  const videoRef = useRef(null); // Creamos una referencia para el video

  const handleVideoLoad = () => {
    onVideoLoad(); // Llamamos a la función pasada como prop
  };

  // Reproducir el video si `playVideo` es `true`
  useEffect(() => {
    if (videoRef.current && playVideo) {
      videoRef.current.play();
    }
  }, [playVideo]); // Solo se ejecuta cuando `playVideo` cambia a `true`

  const [hola, setHola] = useState(true); // Valor por defecto para escritorio

  useEffect(() => {
    const handleResize = () => {
      // Si el ancho de la ventana es menor o igual a 768px (dispositivo móvil)
      if (window.innerWidth <= 768) {
        setHola(true); // Cambiar a `false` en dispositivos móviles
      } else {
        setHola(false); // Cambiar a `true` en escritorio
      }
    };

    // Ejecutar la función de resize al cargar el componente
    handleResize();

    // Agregar un event listener para cambios en el tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Este efecto solo se ejecuta una vez al cargar el componentec

  return (
    <>
      <section className="relative w-full  h-[100vh] overflow-hidden ">
        {/* Video de fondo */}
        <video
          ref={videoRef} // Usamos la referencia aquí
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay={hola}
          loop={true}
          muted={true}
          playsInline={true}
          onLoadedData={handleVideoLoad} // O usa onCanPlay si prefieres
          src={localizedData?.hero_background.url}
          onError={onError} // Para manejar errores de carga
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#03000D] to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-end  h-full p-6 md:p-22 lg:px-28 pb-[130px] text-white  max-w-screen-2xl mx-auto">
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

          <h1 className="h1Title mb-6 lg:mb-8 md:w-[550px] 2xl:w-[auto]">
            {localizedData?.hero_title}
          </h1>

          <div className="flex flex-col md:flex-row md:gap-6 ">
            {localizedData?.heroLinks?.map((link, index) => (
              <LangLink
                key={index}
                to={link.link} // Usamos el enlace desde Strapi
                className="group flex items-center gap-2 subH2 border-t border-[#434652] pt-4 w-[fit-content]"
              >
                {link.text}
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
              </LangLink>
            ))}
          </div>
        </div>
      </section>

      <div className="llg:h-[1200px] partner-bg flex flex-col llg:items-center llg:flex-row llg:justify-between  max-w-screen-2xl m-auto">
        {/* <div> */}
        <div className=" max-w-[540px] llg:w-[460px] ml-6 mr-6 md:ml-16  xl:ml-28 relative llg:mr-[70px] 2xl:m">
          {/* <img src={Six} className="absolute right-12" /> */}
          <h1 className="transparent-bold grotzec absolute right-[32px]">
            {" "}
            {localizedData?.partner_number}
          </h1>

          <div className="llg:mb-[50px] z-50 relative">
            <h2
              className="grotzec text-[64px] leading-[51px] tracking-[-2%] llg:text-[110px] llg:leading-[110px] 
            llg:tracking-[-3%] text-white uppercase mb-5 llg:mb-0"
            >
              {localizedData?.partner_title}
            </h2>
            <h3 className="h2Title text-clearBlue">
              {localizedData?.partner_subtitle}
            </h3>
          </div>
          <div className="my-10 llg:my-0">
            <p className="text-grey2 body0 mb-8 !text-[18px] xxl:!text-[24px]">
              {localizedData?.partner_desc}
            </p>
            <Button
              text={localizedData?.partner_cta?.text}
              width="w-[155px]"
              height="h-[48px]"
              link={localizedData?.partner_cta?.link}
            />
          </div>
        </div>
        <div className="llg:h-[1440px] flex sm:justify-end llg:items-end sm:mt-[-110px] llg:mt-0">
          <div className=" llg:mb-[270px] xl:mb-[140px] m-6 sm:m-0">
            <div className=" ">
              <img
                src={localizedData?.partner_img?.url}
                className="sm:w-[440px] md:w-[540px] xl:w-[740px] rounded-md sm:rounded-r-none"
              />
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default HomeHero;
