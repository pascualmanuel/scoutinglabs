import React, { useState, useEffect, useRef } from "react";
import { graphql } from "gatsby";

import SPlay from "../../assets/ScoutingPlay.mp4";
import VeoCam from "../../assets/VeoCam3.mp4";
import SplayImg from "../../assets/play-img.png";
import VeoImg from "../../assets/veo-img.png";
import Button from "../Button";
import { useStaticQuery } from "gatsby";

import { useLanguage } from "../../hooks/LanguageContext.js";
import LangLink from "../../hooks/LangLink.jsx";

function Locations() {
  const { locale } = useLanguage();
  const currentLocale = locale;

  const { strapiHome } = useStaticQuery(graphql`
    query {
      strapiHome {
        locale
        mission_title
        mision_desc
        mision_button {
          text
          link
        }
        slider {
          id
          title
          description
          video {
            url
            name
          }
        }
        localizations {
          locale
          mission_title
          mision_desc
          mision_button {
            text
            link
          }
          slider {
            id
            title
            description
            video {
              url
              name
            }
          }
        }
      }
    }
  `);

  const localizedData =
    strapiHome?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === currentLocale.toLowerCase()
    ) || strapiHome;

  const locations = localizedData.slider.reduce((acc, item) => {
    acc[item.id] = {
      title: item.title,
      description: item.description,
      video: `${process.env.REACT_APP_API_URL}${item.video.url}`, // Concatenar URL base con la ruta del video
    };
    return acc;
  }, {});

  const locationKeys = Object.keys(locations); // Obtener las claves para iterar

  const [selectedLocation, setSelectedLocation] = useState(locationKeys[0]); // Primera ubicación dinámica
  const [nextLocation, setNextLocation] = useState("");
  const [activeText, setActiveText] = useState(locationKeys[0]);
  const [borderPosition, setBorderPosition] = useState(0);

  const [exiting, setExiting] = useState(false);
  // Actualiza la posición del borde al cambiar la ubicación
  useEffect(() => {
    const index = locationKeys.indexOf(selectedLocation);
    setBorderPosition(index * 60); // Ajusta según la altura de cada item
  }, [selectedLocation]);

  // Maneja el cambio de ubicación al hacer clic
  const handleLocationChange = (location) => {
    if (selectedLocation !== location) {
      transitionToLocation(location);
    }
  };

  // Transición hacia una nueva ubicación
  const transitionToLocation = (location) => {
    setExiting(true);
    setActiveText(location);
    setNextLocation(location);
    setBorderPosition(locationKeys.indexOf(location) * 60);

    setTimeout(() => {
      setSelectedLocation(location);
      setNextLocation("");
      setExiting(false);
    }, 800); // Duración de la animación
  };

  // Maneja el fin del video
  const handleVideoEnd = () => {
    const currentIndex = locationKeys.indexOf(selectedLocation);
    const nextIndex = (currentIndex + 1) % locationKeys.length; // Ciclo circular
    const nextLocationKey = locationKeys[nextIndex];
    transitionToLocation(nextLocationKey);
  };

  const sectionRef = useRef(null); // Referencia al contenedor observado
  const videoRef = useRef(null); // Referencia al video principal
  const nextVideoRef = useRef(null); // Referencia al video secundario (opcional)
  const [isVisible, setIsVisible] = useState(false); // Estado para manejar la visibilidad

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Controla la reproducción y pausa del video según la visibilidad
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }

    if (nextVideoRef.current) {
      if (isVisible) {
        nextVideoRef.current.play();
      } else {
        nextVideoRef.current.pause();
      }
    }
  }, [isVisible]);

  const [isPlaying, setIsPlaying] = useState(false); // Controla si el video ha comenzado a reproducirse

  const handlePlay = () => {
    setIsPlaying(true); // Oculta el placeholder cuando el video comienza
  };

  let ourMission = "NUESTRA MISION";
  if (locale === "EN") {
    ourMission = "OUR MISSION";
  }
  return (
    <>
      <div
        className=" bg-white pb-24 pl-6 pr-6  md:pr-0 lm:pl-16 xl:pl-28 2xl:pl"
        id=""
      >
        <div className="max-w-screen-2xl m-auto">
          <h2 className=" md:w-[440px] llg:w-[780px] py-[60px] lg:py-[100px] grotzec text-[64px] leading-[51px] tracking-[-2%] lg:text-[110px] lg:leading-[110px] lg:tracking-[-3%] text-black uppercase mb-5 lg:mb-0">
            {localizedData?.mission_title}
          </h2>

          <div
            className="locations-container flex flex-col  md:flex-row llg:justify-between max-w-[] mx-auto"
            ref={sectionRef}
          >
            <div className="flex flex-col justify-between sm:mr-[30px] mg:mr-[80px]">
              <div>
                <p className="text-black sm:w-[390px] mg:w-[460px] body0 ">
                  <span className=" text-[34px] grotzec text-skyBlue">[</span>
                  <span className="text-skyBlue grotzec font-bold">
                    {" "}
                    &nbsp; {ourMission} &nbsp;
                  </span>
                  <span className="text-[34px] grotzec text-skyBlue ">]</span>{" "}
                  {localizedData?.mision_desc}
                </p>
                <div className="mt-[47px]">
                  <Button
                    text={localizedData?.mision_button.text}
                    link={localizedData?.mision_button.link}
                    bg="#0584F5"
                    textColor="#fff"
                    width="w-[175px] "
                  />
                </div>
              </div>
              <div className="location border-l-2 border-[#dcdcdc] max-w-[500px] mt-16 mb-16 md:mb-0 ">
                <div
                  className=""
                  style={{
                    position: "absolute",
                    left: "-3px",
                    top: borderPosition,
                    height: "60px",
                    borderLeft: "solid #0584F5 4px",
                    opacity: 1,
                    transition: "top 500ms ease, opacity 500ms ease",
                  }}
                />
                {locationKeys.map((location) => (
                  <div
                    key={location}
                    className={`location-item ${
                      activeText === location ? "active" : ""
                    }`}
                    onClick={() => handleLocationChange(location)}
                  >
                    <h2
                      className={`pl-[30px] text-location subH !capitalize ${
                        activeText === location ? "text-active" : ""
                      }`}
                    >
                      {locations[location].title}
                    </h2>
                    <p
                      className={`pl-[30px] body1 ${
                        activeText === location ? "text-active" : "hidden"
                      }`}
                    >
                      {locations[location].description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="location-content flex justify-end">
              <div
                className="image-container w-[700px] h-[400px] md:w-[400px] lg:h-[500px]  xl:w-[648px]   xl:h-[666px] 
            rounded-md  md:rounded-r-none"
              >
                <video
                  src={locations[selectedLocation]?.video}
                  ref={videoRef} // Asocia la referencia al video principal
                  autoPlay
                  preload="auto"
                  muted
                  loop={false} // Cambia a false para habilitar el evento onEnded
                  playsInline
                  onEnded={handleVideoEnd} // Evento al terminar el video
                  onPlay={handlePlay} // Oculta el placeholder
                  className={`location-image ${exiting ? "exiting" : ""}`}
                />
                {nextLocation && (
                  <video
                    ref={nextVideoRef} // Asocia la referencia al video principal
                    src={locations[nextLocation].video}
                    autoPlay={false}
                    muted
                    loop
                    playsInline
                    className="location-image next"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="h-130vh]"></div> */}
    </>
  );
}

export default Locations;
