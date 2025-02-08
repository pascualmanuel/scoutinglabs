import React from "react";
import { useState, useEffect } from "react";
import Video1 from "../../assets/veocam/grid/VeoSetup.mp4";
import Video2 from "../../assets/veocam/grid/followCam.mp4";
import Battery from "../../assets/veocam/grid/battery.webp";
import Clima from "../../assets/veocam/grid/clima.webp";
import Video4 from "../../assets/veocam/grid/eventos.mp4";
import Video5 from "../../assets/veocam/grid/VeoSetup.mp4";
import VeoCamImg from "../../assets/home/veo-transparent2.webp";

// import Lottie from "lottie-react"; // Import the correct Lottie component

import dotAnimation from "../../assets/veocam/dot-animation.json?raw";

const GridSection = () => {
  const [ocultarPadre, setOcultarPadre] = useState(false);

  useEffect(() => {
    const manejarResize = () => {
      const ancho = window.innerWidth;
      setOcultarPadre(ancho >= 1 && ancho <= 920); // Solo oculta el padre en este rango
    };

    manejarResize(); // Ejecutar al cargar
    window.addEventListener("resize", manejarResize);

    return () => window.removeEventListener("resize", manejarResize);
  }, []);

  return (
    <>
      {!ocultarPadre ? (
        <div className="llg:scale-75 mg:scale-100">
          <div className="px-6 xll:px-28 max-w-screen-2xl mx-auto flex flex-col">
            <div className="llg:w-[1200px] lg:w-[1300px] mg:w-full flex flex-row h-[440px] gap-5">
              <div
                className="w-1/3 rounded-[20px] border border-grey4 whtie-50-op"
                style={{
                  background:
                    "linear-gradient(142deg, rgba(5, 132, 245, 0.9), rgba(5, 132, 245, 0) 90%)",
                }}
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="pt-10 pl-7 pr-16">
                    <h2 className="h2Title pb-4">SET UP SIMPLE</h2>
                    <p className="body1">
                      Coloca la cámara y filma tu partido sin la necesidad de un
                      camarógrafo.
                    </p>
                  </div>
                  <div className="w-[85%] h-[260px] ">
                    <video
                      className="h-full w-full object-cover rounded-bl-[20px] rounded-tr-[20px] "
                      src={Video1}
                      autoPlay={true}
                      playsInline
                      muted
                      loop={true}
                    />
                  </div>
                </div>
              </div>
              <div
                className="w-1/3 rounded-[20px] border border-grey4 whtie-50-op "
                style={{
                  background:
                    "linear-gradient(142deg, rgba(5, 132, 245, 0.6), rgba(5, 132, 245, 0) 50%)",
                }}
              >
                <div className="flex flex-col justify-end h-full relative overflow-hidden pl-7">
                  <img
                    src={VeoCamImg}
                    className="absolute top-4 right-0  w-auto translate-x-1/2 h-[230px]"
                  />
                  {/* <Lottie
                    animationData={dotAnimation} // Correct prop for Lottie
                    loop={true} // Enable looping
                    style={{
                      height: "21px",
                      width: "21px",
                      marginRight: "7px",
                      marginLeft: "5px",
                      marginBottom: "27px",
                      // filter: "blur(1px)",
                    }}
                  /> */}

                  <h2 className="h2Title w-[225px]">
                    CALIDAD <br /> DE VIDEO NITIDA
                  </h2>
                  <p className="body1 pt-4 pb-8 max-w-[350px]">
                    Las lentes de nueva generación y la introducción del HDR
                    garantizan una calidad de vídeo nítida y colores vibrantes
                    en todas las grabaciones.
                  </p>
                </div>
              </div>

              <div className="w-1/3 rounded-[20px] border border-grey4 whtie-50-op ">
                <div className="flex flex-col justify-between pl-7 pt-10 h-full">
                  <div>
                    <h2 className="h2Title pb-4">FOLLOW CAM</h2>
                    <p className="body1">
                      La cámara con IA sigue automáticamente las acciones del
                      partido, y ofrece una experiencia similar a ver un partido
                      en la TV.
                    </p>
                  </div>
                  <div className="w-[85%] h-[260px]  ml-auto">
                    <video
                      className="h-full w-full object-cover rounded-br-[20px] rounded-tl-[20px] "
                      src={Video2}
                      autoPlay={true}
                      playsInline
                      muted
                      loop
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row h-[440px] gap-5 mt-5">
              <div className="w-[25%] rounded-[20px] border border-grey4 whtie-50-op ">
                <div className="w-[220px] h-[196px] m-auto">
                  <img
                    src={Clima}
                    className="h-full w-full object-cover mt-8 rounded-[10px] "
                  />
                  <h2 className="h2Title max-w-[170px] pt-11">
                    {" "}
                    Preparada para todo clima{" "}
                  </h2>
                </div>
              </div>
              <div className="w-3/5 rounded-[20px] border border-grey4 whtie-50-op ">
                <div className="flex flex-row-reverse justify-between h-full">
                  <div className="pt-10 px-4 w-[360px]">
                    <h2 className="h2Title pb-4">
                      DETECTA eventos automaticamente
                    </h2>
                    <p className="body1">
                      La IA detecta y etiqueta los eventos clave del partido,
                      como goles, remates, tiros de esquina o penaltis.
                    </p>
                  </div>
                  <div className="w-[85%] h-[100%] flex items-end">
                    <video
                      className="h-full w-full object-cover rounded-bl-[20px] rounded-tr-[20px] max-h-[280px] xxl:max-h-[330px] max-w-[350px]"
                      src={Video4}
                      autoPlay={true}
                      playsInline
                      muted
                      loop
                    />
                  </div>
                </div>
              </div>
              <div className="w-[25%] rounded-[20px] border border-grey4 whtie-50-op ">
                <div className="w-[220px] h-[100%] m-auto flex flex-col justify-between">
                  <h2 className="h2Title  pt-11">8H de batería</h2>
                  <img
                    src={Battery}
                    className="h-full w-full object-cover  max-h-[196px] rounded-[10px] mb-8 "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="llg:scale-75 mg:scale-100">
          <div className="px-6 xll:px-28 ms:max-w-screen-2xl mx-auto flex flex-row flex-wrap gap-5 max-w-[540px]">
            <div
              className=" w-[100%] ms:w-[47.5%] md:w-[48.5%] h-[450px] ms:h-[470px] md:h-[440px] rounded-[20px] border border-grey4 whtie-50-op"
              style={{
                background:
                  "linear-gradient(142deg, rgba(5, 132, 245, 0.9), rgba(5, 132, 245, 0) 90%)",
              }}
            >
              <div className="flex flex-col justify-between h-full">
                <div className="pt-10 pl-4 ssm:pl-7 pr-16">
                  <h2 className="h2Title pb-4">SET UP SIMPLE</h2>
                  <p className="body1 ">
                    Coloca la cámara y filma tu partido sin la necesidad de un
                    camarógrafo.
                  </p>
                </div>
                <div className="w-[92%] h-[260px] ">
                  <video
                    className="h-full w-full object-cover rounded-bl-[20px] rounded-tr-[20px] "
                    src={Video1}
                    autoPlay={true}
                    playsInline
                    muted
                    loop
                  />
                </div>
              </div>
            </div>
            <div
              className="w-[100%] ms:w-[47.5%] md:w-[48.5%] h-[450px] ms:h-[470px] md:h-[440px] rounded-[20px] border border-grey4 whtie-50-op "
              style={{
                background:
                  "linear-gradient(142deg, rgba(5, 132, 245, 0.6), rgba(5, 132, 245, 0) 50%)",
              }}
            >
              <div className="flex flex-col justify-end h-full relative overflow-hidden pl-4 ssm:pl-7">
                <img
                  src={VeoCamImg}
                  className="absolute top-4 right-0  w-auto translate-x-1/2 h-[230px]"
                />
                {/* <Lottie
                  animationData={dotAnimation} // Correct prop for Lottie
                  loop={true} // Enable looping
                  style={{
                    height: "21px",
                    width: "21px",
                    marginRight: "7px",
                    marginLeft: "5px",
                    marginBottom: "27px",
                    // filter: "blur(1px)",
                  }}
                /> */}
                <h2 className="h2Title w-[225px]">
                  CALIDAD <br /> DE VIDEO NITIDA
                </h2>
                <p className="body1 pt-4 pb-8 pr-6 ssm:max-w-[350px]">
                  Las lentes de nueva generación y la introducción del HDR
                  garantizan una calidad de vídeo nítida y colores vibrantes en
                  todas las grabaciones.
                </p>
              </div>
            </div>

            <div className="w-[100%] ms:w-[56%] md:w-[65%] h-[470px] ms:h-[470px] md:h-[440px] rounded-[20px] border border-grey4 whtie-50-op ">
              <div className="flex flex-col justify-between pl-4 ssm:pl-7 pt-10 h-full">
                <div>
                  <h2 className="h2Title pb-4">FOLLOW CAM</h2>
                  <p className="body1 pr-6">
                    La cámara con IA sigue automáticamente las acciones del
                    partido, y ofrece una experiencia similar a ver un partido
                    en la TV.
                  </p>
                </div>
                <div className="w-[92%] h-[260px]  ml-auto">
                  <video
                    className="h-full w-full object-cover rounded-br-[20px] rounded-tl-[20px] "
                    src={Video2}
                    autoPlay={true}
                    playsInline
                    muted
                    loop
                  />
                </div>
              </div>
            </div>

            <div className="w-[100%] ms:w-[39%] md:w-[32%] h-[440px] ms:h-[470px] md:h-[440px] rounded-[20px] border border-grey4 whtie-50-op ">
              <div className=" w-[90%] ms:w-[220px] ms:h-[196px] m-auto">
                <img
                  src={Clima}
                  className=" w-full object-cover mt-8 h-[230px] ms:h-full rounded-[10px] "
                />
                <h2 className="h2Title pt-11"> Preparada para todo clima </h2>
              </div>
            </div>
            <div className="w-[100%] ms:w-[39%] md:w-[32%] h-[340px] ms:h-[470px] md:h-[440px] rounded-[20px] border border-grey4 whtie-50-op ">
              <div className="w-[90%] ms:w-[220px] h-[100%] m-auto flex flex-col justify-between">
                <h2 className="h2Title  pt-11">8H de batería</h2>
                <img
                  src={Battery}
                  className="h-full w-full object-cover  max-h-[196px] rounded-[10px] mb-8 "
                />
              </div>
            </div>
            <div className="w-[100%] ms:w-[56%] md:w-[65%] h-[450px] ms:h-[470px] md:h-[440px] rounded-[20px] border border-grey4 whtie-50-op ">
              <div className="flex flex-col justify-between h-full">
                <div className="pt-10 px-4 ssm:px-7 ms:w-[360px]">
                  <h2 className="h2Title pb-4">
                    DETECTA eventos automaticamente
                  </h2>
                  <p className="body1">
                    La IA detecta y etiqueta los eventos clave del partido, como
                    goles, remates, tiros de esquina o penaltis.
                  </p>
                </div>
                <div className="w-[92%] h-[100%] flex justify-start ms:justify-end items-end">
                  <video
                    className="h-full w-full object-cover rounded-bl-[20px] 
                    rounded-tr-[20px] max-h-[230px] xxl:max-h-[330px] "
                    src={Video4}
                    autoPlay={true}
                    playsInline
                    muted
                    loop
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GridSection;
