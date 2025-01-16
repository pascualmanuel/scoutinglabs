import React, { useState, useEffect } from "react";
import SPlay from "../../assets/ScoutingPlay.mp4";
import VeoCam from "../../assets/VeoCam3.mp4";
import SplayImg from "../../assets/play-img.png";
import VeoImg from "../../assets/veo-img.png";

function Locations() {
  const locations = {
    Belgrano: {
      title: "Veo Cam 3",
      media: SPlay,
      subtitle: "Av. Juramento 2800",
      link: "https://maps.app.goo.gl/b7nNBRmyJovJCX9T9",
    },
    Palermo: {
      title: "Scouting Play",
      subtitle: "República de la India 2895",
      media: VeoCam,
      link: "https://maps.app.goo.gl/R8XvW1ew8KDyXEZg9",
    },
  };

  const [selectedLocation, setSelectedLocation] = useState("Belgrano");
  const [nextLocation, setNextLocation] = useState("");
  const [activeText, setActiveText] = useState("Belgrano"); // Nuevo estado para el texto activo
  const [exiting, setExiting] = useState(false); // Estado para manejar la salida de la imagen
  const [borderPosition, setBorderPosition] = useState(0); // Estado para la posición del borde

  // Efecto para actualizar la posición del borde cuando cambia la ubicación
  useEffect(() => {
    const index = Object.keys(locations).indexOf(selectedLocation);
    setBorderPosition(index * 60); // Ajusta según la altura de cada item
  }, [selectedLocation, locations]);

  const handleLocationChange = (location) => {
    if (selectedLocation !== location) {
      setExiting(true); // Marca que estamos saliendo de la ubicación actual
      setActiveText(location); // Cambiar el texto activo inmediatamente
      setNextLocation(location); // Establecer la nueva ubicación
      setBorderPosition(Object.keys(locations).indexOf(location) * 60); // Mover el borde inmediatamente

      // Esperamos a que termine la animación para cambiar la imagen
      setTimeout(() => {
        setSelectedLocation(location); // Cambiar a la nueva ubicación
        setNextLocation(""); // Limpiar la próxima ubicación
        setExiting(false); // Reiniciar el estado de salida
      }, 800); // Duración de la animación
    }
  };

  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Pre-cargar todas las imágenes cuando el componente se monta
  useEffect(() => {
    const imagePaths = Object.values(locations).map(
      (location) => location.image
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
      .then(() => {
        setImagesLoaded(true); // Marcar que las imágenes se han cargado
        console.log("Cargó");
      })
      .catch((error) => {
        console.error("Error al cargar las imágenes", error);
      });
  }, []);

  return (
    <>
      <div className="px-[30px] py-[30px] " id="">
        <div className="max-w-[1290px] mx-auto mb-20">
          <h2 className="bH1 text-white">Dónde estamos</h2>
        </div>
        <div className="locations-container max-w-[1290px] mx-auto ">
          <div className="location">
            <div
              className=""
              style={{
                position: "absolute",
                left: 0,
                top: borderPosition,
                height: "60px", // Ajusta según la altura de tus items
                borderLeft: "solid #212121 4px",
                opacity: 1, // Siempre visible
                transition: "top 500ms ease, opacity 500ms ease", // Transición para el movimiento del borde y el fade
              }}
            />
            {Object.keys(locations).map((location) => (
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
                  {location}
                </h2>
              </div>
            ))}
          </div>

          <div className="location-content">
            <div className="image-container h-[350px] xl:h-[500px]">
              <video
                src={locations[selectedLocation].media}
                autoPlay="true"
                mute="true"
                loop="true"
                playsInline="true"
                alt={selectedLocation}
                className={`location-image ${exiting ? "exiting" : ""}`} // Aplicar clase 'exiting' solo si estamos saliendo
              />
              {nextLocation && (
                <video
                  src={locations[nextLocation].media}
                  autoPlay=""
                  mute=""
                  loop=""
                  playsInline=""
                  alt={nextLocation}
                  className="location-image next" // Siempre está detrás
                />
              )}
            </div>

            <div className="location-text">
              <p className="leading-6 text-lg	">
                {locations[selectedLocation].title}
              </p>
              <div className="">
                <p className="text-2xl leading-10 font-normal mb-2">
                  {locations[selectedLocation].subtitle}
                </p>
                <a
                  href={locations[selectedLocation].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className=" justify-center items-center relative overflow-hidden">
                    <div className="flex items-center transition-transform duration-500 ease-in-out transform sm:group-hover:-translate-y-16">
                      <span className="text-xl leading-7">
                        Ver en Google Maps
                      </span>
                    </div>

                    <div className="absolute flex items-center transition-transform duration-500 ease-in-out transform sm:group-hover:translate-y-[-84px]  bottom-[-80px]">
                      <span className="text-xl leading-7">
                        Ver en Google Maps
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[30vh]"></div>
    </>
  );
}

export default Locations;
