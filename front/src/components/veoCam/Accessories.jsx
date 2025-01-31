import React from "react";

const Accessories = () => {
  const data = [
    {
      title: "somos Distribuidores oficiales",
      description:
        "Te recomendaremos la suscripción que mejor se adapte a lo que necesitas.",
      //   imgSrc: VeoGreen, // Aquí puedes agregar la URL de la imagen
    },
    {
      title: "ENTREGA INMEDIATA",
      description: "Llevamos tu cámara y la configuramos donde quieras. ",
      //   imgSrc: Box, // Aquí puedes agregar la URL de la imagen
    },
    {
      title: "CAPACITACION personalizada",
      description:
        "Te enseñamos a sacarle el jugo a los datos y mejorar tu nivel con la Veo Cam 3.",
      //   imgSrc: Person, // Aquí puedes agregar la URL de la imagen
    },
    // {
    //   title: "soporte exclusivo",
    //   description: "Estamos conectados para resolver tus inquietudes.",
    //   imgSrc: Crown, // Aquí puedes agregar la URL de la imagen
    // },
  ];

  return (
    <>
      <div className="mb-[80px] md:mb-[180px] max-w-[1536px] mx-6 lm:mx-16 xl:mx-28 2xl:mx-auto 2xl:px-28 mt-14 md:mt-[100px] bg-white">
        <div className="flex flex-col md:flex-row md:gap-6 justify-between max-w-[970px] m-auto">
          {data.map((item, index) => (
            <p>{item?.title}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Accessories;
