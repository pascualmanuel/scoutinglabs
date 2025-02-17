import React, { useEffect } from "react";

const Loader = ({ fadeOut }) => {
  useEffect(() => {
    // Deshabilitar el scroll mientras el loader está visible
    document.body.style.overflow = fadeOut ? "auto" : "hidden";

    // Limpiar el estilo de overflow cuando se complete el fadeOut
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [fadeOut]);

  return (
    <div
      className={`bg-skyBlue loader ${fadeOut ? "fade-out" : ""} cursor-none`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <h1 className="loaderFont">[10%]</h1>
    </div>
  );
};

export default Loader;
