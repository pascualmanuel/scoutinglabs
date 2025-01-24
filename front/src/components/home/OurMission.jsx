import React, { useState, useEffect, useRef } from "react";
import SPlay from "../../assets/ScoutingPlay.mp4";
import VeoCam from "../../assets/VeoCam3.mp4";
import SplayImg from "../../assets/play-img.png";
import VeoImg from "../../assets/veo-img.png";
import Button from "../Button";
function Locations() {
  const locations = {
    VeoCam3: {
      title: "Veo Cam 3",
      media: VeoCam,
      subtitle:
        "Graba tus partidos y entrenamientos y luego analiza las jugadas para mejorar tu rendimiento.",
      link: "Link",
    },
    ScoutingPlay: {
      title: "Scouting Play",
      subtitle:
        "Envianos tus mejores jugadas (o burradas) y forma parte de la comunidad más apasionada del deporte.",
      media: SPlay,
      link: "link",
    },
    // ScoutinPuto: {
    //   title: "Scouting Play2",
    //   subtitle:
    //     "Envianos tus mejores jugadas (o burradas) y forma parte de la comunidad más apasionada del deporte.",
    //   media: VeoCam,
    //   link: "link",
    // },
  };

  const locationKeys = Object.keys(locations); // Obtener las claves para iterar
  const [selectedLocation, setSelectedLocation] = useState("VeoCam3");
  const [nextLocation, setNextLocation] = useState("");
  const [activeText, setActiveText] = useState("VeoCam3");
  const [exiting, setExiting] = useState(false);
  const [borderPosition, setBorderPosition] = useState(0);

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

  // Pre-carga de imágenes (sin cambios)
  const [imagesLoaded, setImagesLoaded] = useState(false);
  useEffect(() => {
    const imagePaths = Object.values(locations).map(
      (location) => location.media
    );
    const loadImages = imagePaths.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(loadImages)
      .then(() => setImagesLoaded(true))
      .catch((error) => console.error("Error al cargar las imágenes", error));
  }, []);

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

  console.log(isVisible);

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

  // display: flex
  // ;
  //     flex-direction: column;
  //     justify-content: space-between;
  return (
    <>
      <div
        className=" bg-white pb-24 pl-6 pr-6  md:pr-0 lm:pl-16 xl:pl-[112px]"
        id=""
      >
        <h2 className="py-[60px] lg:py-[100px] grotzec text-[64px] leading-[51px] tracking-[-2%] lg:text-[110px] lg:leading-[110px] lg:tracking-[-3%] text-black uppercase mb-5 lg:mb-0">
          juega y entrena
          <br /> como profesional
        </h2>

        <div
          className="locations-container flex flex-col  md:flex-row llg:justify-between max-w-[] mx-auto"
          ref={sectionRef}
        >
          <div className="flex flex-col justify-between mr-[30px] mg:mr-[80px]">
            <div>
              <p className="text-black w-[390px] mg:w-[460px] body0 ">
                <span className=" text-[34px] grotzec text-skyBlue">[</span>
                <span className="text-skyBlue grotzec font-bold">
                  {" "}
                  &nbsp; NUESTRA MISION &nbsp;
                </span>
                <span className="text-[34px] grotzec text-skyBlue ">
                  ]
                </span>{" "}
                Impulsar deportistas y entrenadores a sentirse profesionales, y
                generar una comunidad que revolucione el deporte amateur.
              </p>
              <div className="mt-[47px]">
                <Button
                  link="/contacto"
                  text="Contactanos"
                  bg="#0584F5"
                  textColor="#fff"
                  width="w-[175px] "
                >
                  Conoce VeoCam3
                </Button>
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
                    {locations[location].subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* width: 648px; */}
          {/* height: 666px; */}

          <div className="location-content flex justify-end">
            <div
              className="image-container w-[] lg:h-[500px]  xl:w-[648px]   xl:h-[666px] 
            rounded-md  md:rounded-r-none"
            >
              <video
                src={locations[selectedLocation].media}
                ref={videoRef} // Asocia la referencia al video principal
                autoPlay
                muted
                loop={false} // Cambia a false para habilitar el evento onEnded
                playsInline
                onEnded={handleVideoEnd} // Evento al terminar el video
                className={`location-image ${exiting ? "exiting" : ""}`}
              />
              {nextLocation && (
                <video
                  ref={nextVideoRef} // Asocia la referencia al video principal
                  src={locations[nextLocation].media}
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
      <div className="h-[30vh]"></div>
    </>
  );
}

export default Locations;
