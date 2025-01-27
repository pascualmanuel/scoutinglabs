import React from "react";
import "../styles/Layout.css";
import { Link } from "gatsby";
const Prefooter = () => {
  return (
    <>
      <div className="bg-iBlue prefooter-bg mt-[px]">
        <div className="relative max-w-[600px] mx-auto">
          <Link to={"/contacto"}>
            <div className="first-card w-[214px] h-[226px] sm:w-[219px] sm:h-[310px]  right-[30px] lm:right-[-60px] lg:right-[-190px] lg:top-[80px] pl-4">
              <div className="flex flex-col h-[226px] sm:h-[310px] justify-around text-black">
                <p className="uppercase grotzec subH flex flex-col">
                  <span className="text-[40px] leading-[0px] pb-2">•</span>
                  CONTACTANOS
                </p>
                <p className="body3 w-[180px] ">
                  Estamos aca para resolver tus dudas. Envianos un mensaje y
                  hablemos.
                </p>
                <p className="uppercase h2Title text-sm">¡hola!</p>
              </div>
            </div>
          </Link>
          <div className="flex items-center justify-center h-[670px]">
            <h2 className="uppercase relative h1Title sm:text-[90px] text-center w-[360px] sm:w-[735px] text-white sm:whitespace-nowrap  sm:!leading-[82px]">
              <span className="text-clearBlue"> la revolucion </span>{" "}
              <br className="hidden sm:block" /> dEL deporte amateur
            </h2>
          </div>
          <Link to={"/contacto"}>
            <div className="second-card w-[214px] h-[291px] sm:w-[219px] sm:h-[300px]  left-[28px] top-[434px] sm:left-[5px] sm:top-[380px]  lg:top-[395px] lg:left-[-180px]  mg:top-[325px] mg:left-[-223px] pl-4 text-black">
              <div className="flex flex-col h-[291px] sm:h-[300px] justify-around">
                <p className="uppercase grotzec subH flex flex-col">
                  <span className="text-[40px] leading-[0px] pb-2">•</span>
                  SOBRE NOSOTROS
                </p>
                <p className="body3 w-[180px]">
                  Creamos ScoutingLabs porque somos apasionados del deporte y de
                  impulsar al límite nuestro rendimiento.
                </p>
                <p className="uppercase h2Title">NUESTRA HISTORIA</p>
              </div>
            </div>
          </Link>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Prefooter;
