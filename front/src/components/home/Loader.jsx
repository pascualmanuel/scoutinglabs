import React, { useState, useEffect } from "react";

const Loader = ({ fadeOut }) => {
  const [progress, setProgress] = useState(10); // Estado para el porcentaje de progreso

  useEffect(() => {
    // Deshabilitar el scroll mientras el loader está visible
    document.body.style.overflow = fadeOut ? "auto" : "hidden";

    // Limpiar el estilo de overflow cuando se complete el fadeOut
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [fadeOut]);

  useEffect(() => {
    let interval;
    if (!fadeOut && progress < 100) {
      // Si el fadeOut no está activado, incrementamos el progreso hasta llegar a 100
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          }
          clearInterval(interval); // Detenemos el intervalo cuando llega al 100%
          return 100;
        });
      }, 20); // 30ms entre incrementos para que el porcentaje suba más suavemente
    }

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [fadeOut, progress]);

  return (
    <div
      className={`bg-skyBlue text-black loader ${
        fadeOut ? "fade-out" : ""
      } cursor-none`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <h2 className="loaderFont">{`[${progress}%]`}</h2>
    </div>
  );
};

export default Loader;
