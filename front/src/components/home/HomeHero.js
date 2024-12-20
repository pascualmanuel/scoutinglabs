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
const HomeHero = () => {
  return (
    <>
      <section className="relative w-full  h-[100dvh] overflow-hidden ">
        {/* Video de fondo */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          src={HeroVideo}
        ></video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#03000D] to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-end  h-full p-6 lg:px-24 pb-[130px] text-white ">
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

          <h1 className="h1Title mb-6 lg:mb-8 md:w-[550px]">
            Lleva <br className="md:hidden" /> tu pasion
            <br className="md:hidden" /> al siguiente nivel
          </h1>

          <div className="flex flex-col md:flex-row md:gap-6 ">
            <a
              href="#"
              className="group flex items-center gap-2 subH2 border-t border-[#434652] pt-4   w-[fit-content]"
            >
              CAMARA DEPORTIVA CON IA
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
            <a
              href="#"
              className="flex group items-center gap-2 subH2 md:border-t md:border-[#434652] md:pt-4    "
            >
              SCOUTINGPLAY, NUESTRA COMUNIDAD{" "}
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
            <a
              href="#"
              className="flex group items-center gap-2 subH2 md:border-t md:border-[#434652] md:pt-4    "
            >
              BECAS PARA ESTUDIAR EN EL EXTERIOR{" "}
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
          </div>
        </div>
      </section>
      <div className="h-[1200px] partner-bg flex flex-row items-center justify-between">
        <div className="w-[440px] ml-[112px]">
          <div className="lg:mb-[70px]">
            <h2 className="grotzec lg:text-[110px] lg:leading-[110px] lg:tracking-[-3%] text-white uppercase">
              pablo <br /> matera
            </h2>
            <h3 className="h2Title text-clearBlue">Strategic partner</h3>
          </div>
          <div>
            <p className="text-grey2 body0 mb-8">
              "Una de las principales ventajas de la cámara Veo es que no
              necesitas ser un genio para usarla; es muy intuitiva y fácil de
              usar. Desde padres hasta entrenadores tienen la capacidad de
              compartir cualquier video, ya sea de un entrenamiento o de un
              partido, con familiares, amigos o cualquier otra persona, sin
              importar donde se encuentren"
            </p>
            <Button
              text={"Nuestra historia"}
              width="w-[155px]"
              height="h-[48px]"
              link={"/"}
            />
          </div>
        </div>
        <div className="h-[1440px] flex items-end">
          <div>
            <div
              className="w-[740px] h-[740px]"
              style={{
                backgroundImage: `url("${Pablo}")`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHero;
