import React, { useState, useEffect, useRef } from "react";
import SPlay from "../../assets/ScoutingPlay.mp4";
import VeoCam from "../../assets/VeoCam3.mp4";
import SplayImg from "../../assets/play-img.png";
import VeoImg from "../../assets/veo-img.png";

function Locations() {
  const locations = {
    VeoCam3: {
      title: "Veo Cam 3",
      media: VeoCam,
      subtitle: "Av. Juramento 2800",
      link: "https://maps.app.goo.gl/b7nNBRmyJovJCX9T9",
    },
    ScoutingPlay: {
      title: "Scouting Play",
      subtitle: "República de la India 2895",
      media: SPlay,
      link: "https://maps.app.goo.gl/R8XvW1ew8KDyXEZg9",
    },
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

  return (
    <>
      <div className="py-[30px] bg-white" id="">
        <div className="max-w-[] mx-auto mb-20">
          <h2 className="bH1 text-white">Dónde estamos</h2>
        </div>
        <div className="locations-container max-w-[] mx-auto">
          <div className="location">
            <div
              className=""
              style={{
                position: "absolute",
                left: 0,
                top: borderPosition,
                height: "60px",
                borderLeft: "solid #212121 4px",
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
                  className={`pl-[30px] text-location ${
                    activeText === location ? "text-active" : ""
                  }`}
                >
                  {locations[location].title}
                </h2>
              </div>
            ))}
          </div>

          <div className="location-content flex justify-end">
            <div className="image-container h-[350px] xl:h-[500px]">
              <video
                src={locations[selectedLocation].media}
                autoPlay
                muted
                loop={false} // Cambia a false para habilitar el evento onEnded
                playsInline
                onEnded={handleVideoEnd} // Evento al terminar el video
                className={`location-image ${exiting ? "exiting" : ""}`}
              />
              {nextLocation && (
                <video
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
