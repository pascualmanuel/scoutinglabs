import React, { useState, useEffect } from "react";
import Pablo from "../../assets/pablo.png";
import Pablo2 from "../../assets/veocam-bg.webp";

function Locations() {
  const locations = {
    Belgrano: {
      title:
        "Nuestro primer local en Juramento y Vidal. Abrimos en agosto 2020 ofreciendo una nueva experiencia, que fue elegida rápidamente por la gente del barrio y alrededores. Nuestra propuesta fue ofrecer un café distinto al conocido hasta ese momento, resaltando la materia prima de alta calidad y una pastelería de excelencia.",
      //   image: Belgrano,
      media: Pablo,
      subtitle: "Av. Juramento 2800",
      link: "https://maps.app.goo.gl/b7nNBRmyJovJCX9T9",
    },
    Palermo: {
      text: "En agosto 2022 de la mano de Cande Molfese (Actriz y cantante), llegó nuestro segundo local con una propuesta y una ubicación única, en Palermo frente al Ecoparque. Gracias a la repercusión en el barrio y en los medios de comunicación, logramos posicionar la marca y consolidarnos. Con una nueva impronta, vegetariana pero siempre con el café como protagonista, logramos instalar nuevas opciones y prácticas basadas en el cuidado del medio ambiente y la conciencia sustentable (leches vegetales y agua filtrada sin costo adicional, descuentos en el take away para quienes traen su taza, más productos gluten free, eco mixers compostables, local pet friendly, entre otros).",
      //   image: Palermo,
      media: Pablo2,
      locationText: "República de la India 2895",
      link: "https://maps.app.goo.gl/R8XvW1ew8KDyXEZg9",
    },
    Recoleta: {
      text: "Con tres años de experiencia y siendo una marca reconocida, llegó nuestro tercer local en julio 2023. Logramos plasmar todo lo aprendido para brindar una propuesta superadora para un barrio icónico de la Ciudad de Buenos Aires.",
      //   image: Recoleta,
      media: "",
      locationText: "Av. Juncal 2303",
      link: "https://maps.app.goo.gl/UC2mkh2YGrJgCwrC7",
    },
    Valencia: {
      text: "SIN FRONTERAS. Luego de mucho esfuerzo cumplimos un sueño impensado, pasar de ser una pequeña cafetería de especialidad en Belgrano, a abrir nuestra primera sucursal en el exterior en 2024. En pleno auge y crecimiento del concepto “Specialty Coffee” en España llegamos para replicar nuestra esencia en el mercado internacional.",
      //   image: Valencia,
      media: "",
      locationText: "Vicente Beltrán Grimal, 23",
      link: "https://maps.app.goo.gl/UyFfNgSmSrNqNF5v8",
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
      Hola
      {/* <img src={Valencia} className="hidden" />
      <img src={Belgrano} className="hidden" />
      <img src={Palermo} className="hidden" />
      <img src={Recoleta} className="hidden" />
      <img src={SpeCoffee} className="hidden" /> */}
      <div id="donde-estamos"></div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="px-[30px]" id="">
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
              <img
                src={locations[selectedLocation].media}
                alt={selectedLocation}
                className={`location-image ${exiting ? "exiting" : ""}`} // Aplicar clase 'exiting' solo si estamos saliendo
              />
              {nextLocation && (
                <img
                  src={locations[nextLocation].media}
                  alt={nextLocation}
                  className="location-image next" // Siempre está detrás
                />
              )}
            </div>

            <div className="location-text">
              <p className="leading-6 text-lg	">
                {locations[selectedLocation].text}
              </p>
              <div className="">
                <p className="text-2xl leading-10 font-normal mb-2">
                  {locations[selectedLocation].locationText}
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
