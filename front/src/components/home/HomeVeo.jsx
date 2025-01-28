import React from "react";
import ArrowIcon from "../../assets/icons/arrow.svg";
import "../../styles/Home.css";
import VeoLogo from "../../assets/icons/veo-logo.svg";
import Button from "../Button";
import VeoCamImg from "../../assets/home/veo-transparent.webp";
import TeamsCarousel from "../TeamsCarousel";
const HomeVeo = () => {
  return (
    <>
      <div className="mb-[80px] md:mb-[180px] max-w-[1536px] mx-6 lm:mx-16 xl:mx-28 2xl:mx-auto">
        <div className="h-280 relative mt-16 ">
          <p className="subH text-grey4 text-right">
            POR QUE ELEGIR SCOUTING LABS
          </p>
          <h2 className="h1Title my-6">
            APOYAMOS TU <br className="hidden llg:block" /> CAMINO{" "}
          </h2>
          <h2 className="h1Title text-right">a LA VICTORIA</h2>
        </div>
        <div className="mt-28 ">
          <div className="flex flex-col md:flex-row md:gap-6 justify-center justify-between">
            <div className="">
              <a
                href="#"
                className="group flex items-center justify-between subH border-t border-[#434652] pt-7"
              >
                graba tus pARTIDOS con ia
                <span className="">
                  <div className="w-[44px] h-[44px] rounded-full	   flex justify-center items-center   relative overflow-hidden">
                    <div className="flex items-center transition-transform duration-500 ease-in-out transform group-hover:translate-x-16 group-hover:-translate-y-16">
                      <img src={ArrowIcon} className="" />
                    </div>

                    <div className="absolute flex items-center transition-transform duration-500 ease-in-out transform group-hover:translate-x-[51px] group-hover:translate-y-[-51px]  bottom-[-35px] left-[-35px]">
                      <img src={ArrowIcon} className="" />
                    </div>
                  </div>
                </span>
              </a>
              <p className="body1 text-grey2 mb-8">
                Te enviamos la cámara y te brindamos soporte exclusivo para usar
                la Veo Cam 3 y su plataforma.
              </p>
            </div>
            <div className="">
              <a
                href="#"
                className="flex group items-center justify-between subH border-t border-[#434652] pt-7"
              >
                Scouting play, nuestra comunidad
                {/* <img className="ml-4" src={ArrowIcon} /> */}
                <span className="">
                  <div className="w-[44px] h-[44px] rounded-full	   flex justify-center items-center   relative overflow-hidden">
                    <div className="flex items-center transition-transform duration-500 ease-in-out transform group-hover:translate-x-16 group-hover:-translate-y-16">
                      <img src={ArrowIcon} className="" />
                    </div>

                    <div className="absolute flex items-center transition-transform duration-500 ease-in-out transform group-hover:translate-x-[51px] group-hover:translate-y-[-51px]  bottom-[-35px] left-[-35px]">
                      <img src={ArrowIcon} className="" />
                    </div>
                  </div>
                </span>
              </a>
              <p className="body1 text-grey2 mb-8">
                Te enviamos la cámara y te brindamos soporte exclusivo para usar
                la Veo Cam 3 y su plataforma.
              </p>
            </div>
            {/* <div className="">
              <a
                href="#"
                className="flex group items-center justify-between subH border-t border-[#434652] pt-7    "
              >
                Becas deportivas en el exterior
                <span className="">
                  <div className="w-[44px] h-[44px] rounded-full	   flex justify-center items-center   relative overflow-hidden">
                    <div className="flex items-center transition-transform duration-500 ease-in-out transform group-hover:translate-x-16 group-hover:-translate-y-16">
                      <img src={ArrowIcon} className="" />
                    </div>

                    <div className="absolute flex items-center transition-transform duration-500 ease-in-out transform group-hover:translate-x-[51px] group-hover:translate-y-[-51px]  bottom-[-35px] left-[-35px]">
                      <img src={ArrowIcon} className="" />
                    </div>
                  </div>
                </span>
              </a>
              <p className="body1 text-grey2 mb-8">
                Te enviamos la cámara y te brindamos soporte exclusivo para usar
                la Veo Cam 3 y su plataforma.
              </p>
            </div> */}
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
              Distribuidor oficial de Veo Technologies
            </span>
          </div>
          <h2 className="h1Title pt-[50px]">
            Obten tu <br className="sm:hidden" />
            veo cam3
          </h2>
          <img src={VeoCamImg} className="my-[-102px] relative w-[300px]" />
          <h2 className="h1Title">
            exclusivo <br className="sm:hidden" />
            latam - $ 1199
          </h2>
          <p className="body2 px-5 text-grey2 py-9">
            La cámara necesita de una suscripción para su funcionamiento.
            Renueva tu suscripción cada 1, 6 o 12 meses para mantener la cámara
            activa.
          </p>
          <Button text={"Conoce Veo Cam 3"} width="w-[90vw] sm:w-[225px]" />
        </div>
      </div>
      <div className="mx-5 mb-16 lg:mx-28">
        <h3 className="h1Title uppercase text-left">
          Confian en <br /> nosotros
        </h3>
        <h3 className="text-clearBlue text-right h1Title mt-6 smallLetter">
          <span className="text-skyBlue">
            clubes, torneos <br /> y academias
          </span>
          &nbsp; de todo el mundo
        </h3>
      </div>
      {/* <TeamsCarousel /> */}
    </>
  );
};

export default HomeVeo;
