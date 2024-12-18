import React from "react";
import "../styles/Navbar.css";
const Prefooter = () => {
  return (
    <>
      <div className="bg-iBlue prefooter-bg">
        <div className="relative max-w-[600px] mx-auto">
          <div className="first-card right-[30px] pl-4">
            <div className="flex flex-col h-[226px] justify-around">
              <p className="uppercase grotzec text-base flex flex-col">
                <span className="text-[40px] leading-[0px] pb-2">•</span>
                CONTACTANOS
              </p>
              <p className="body3 w-[180px]">
                Estamos aca para resolver tus dudas. Envianos un mensaje y
                hablemos.
              </p>
              <p className="uppercase h1Title">¡hola!</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-[670px]">
            <h2 className="uppercase relative h1Title text-center w-[360px] lm:w-[635px] text-white">
              <span className="text-clearBlue"> la revolucion </span>{" "}
              <br className="hidden lm:block" /> dEL deporte amateur
            </h2>
          </div>
          <div className="second-card right-[] pl-4">
            <div className="flex flex-col h-[291px] justify-around">
              <p className="uppercase grotzec text-base flex flex-col">
                <span className="text-[40px] leading-[0px] pb-2">•</span>
                SOBRE NOSOTROS
              </p>
              <p className="body3 w-[180px]">
                Creamos ScoutingLabs porque somos apasionados del deporte y de
                impulsar al límite nuestro rendimiento.
              </p>
              <p className="uppercase h1Title">NUESTRA HISTORIA</p>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Prefooter;
