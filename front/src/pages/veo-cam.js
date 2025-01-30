import React from "react";
import Layout from "../components/Layout";
import "../styles/Home.css";
import VeoLogo from "../assets/icons/veo-logo.svg";
import Crown from "../assets/icons/crown.svg";
import Person from "../assets/icons/person.svg";
import Box from "../assets/icons/box.svg";
import VeoGreen from "../assets/icons/veo-green-icon.svg";
import Button from "../components/Button";
import VeoCamImg from "../assets/home/veo-transparent.webp";
import VeoCamBg from "../assets/veocam/veo-cam-bg.webp";
import TeamsCarousel from "../components/TeamsCarousel";
const VeoCam = () => {
  const data = [
    {
      title: "somos Distribuidores oficiales",
      description:
        "Te recomendaremos la suscripción que mejor se adapte a lo que necesitas.",
      imgSrc: VeoGreen, // Aquí puedes agregar la URL de la imagen
    },
    {
      title: "ENTREGA INMEDIATA",
      description: "Llevamos tu cámara y la configuramos donde quieras. ",
      imgSrc: Box, // Aquí puedes agregar la URL de la imagen
    },
    {
      title: "CAPACITACION personalizada",
      description:
        "Te enseñamos a sacarle el jugo a los datos y mejorar tu nivel con la Veo Cam 3.",
      imgSrc: Person, // Aquí puedes agregar la URL de la imagen
    },
    {
      title: "soporte exclusivo",
      description: "Estamos conectados para resolver tus inquietudes.",
      imgSrc: Crown, // Aquí puedes agregar la URL de la imagen
    },
  ];

  const suscriptions = [
    {
      title: "Starter",
      desc: "Ideal para padres y jugadores amateur comprometidos a potenciar su nivel.",
      price: "$20",
      cta: "Seleccionar Starter",
      starred: false,
    },
    {
      title: "Team",
      desc: "Diseñado para coaches, equipos de amigos, y ligas amateur.",
      price: "$59",
      cta: "Seleccionar Team",
      starred: true,
    },
    {
      title: "Club",
      desc: "Enfocado en clubes de nivel profesional que buscan mejorar el rendimiento de su equipo.",
      price: "$90",
      cta: "Seleccionar Club",
      starred: false,
    },
  ];
  return (
    <>
      <Layout>
        <div className="veo-bg ">
          <div className="flex flex-col items-center justify-center text-center pt-[120px] ">
            <div className="mb-4 lg:mb-8 max-w-[280px]">
              <span className=" bg-[#faf9f61a] body3 p-1 pr-2 pl-1 rounded-full border border-[#FAF9F64D] flex items-center aeonik">
                <span className="w-[25px] h-[25px] bg-[#0A3D14] rounded-full border border-grey3 inline-block relative mr-2">
                  <img
                    src={VeoLogo}
                    alt="Veo Logo"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[17px] h-[17px]"
                  />
                </span>
                Distribuidor oficial de Veo Technologies
              </span>
            </div>
            <h2 className="h1Title pt-[50px]">
              Obten tu <br className="sm:hidden" />
              veo cam3
            </h2>
            <img src={VeoCamImg} className="my-[-102px] relative w-[300px]" />
            <h2 className="h1Title">
              {/* exclusivo <br className="sm:hidden" />
              latam - $ 1199 */}
              EXCLUSIVO LATAM <span className="line-through">USD1199 </span>
              USD800
            </h2>
            <div className="py-6 flex flex-col sm:flex-row">
              <div className="mr-0 sm:mr-4 pb-[10px] sm:pb-0">
                <Button
                  text={"Conoce Veo Cam 3"}
                  width="w-[90vw] sm:w-[225px]"
                />
              </div>
              <div>
                <Button
                  text={"Recibir cotización"}
                  width="w-[90vw] sm:w-[225px]"
                  bg={"rgba(255, 255, 255, 0.1)"}
                />
              </div>
            </div>
            <p className="body2 px-5 text-grey2 ">
              Todas las cámaras necesitan de una suscripción para su
              funcionamiento, y cada suscripción aplica solamente para una
              cámara.
              <br />
              Renueva tu suscripción cada 1, 6 o 12 meses para mantener la
              cámara activa.
            </p>
          </div>
        </div>
        {/* 
        a
        a
         */}
        <div className="mb-[80px] md:mb-[180px] max-w-[1536px] mx-6 lm:mx-16 xl:mx-28 2xl:mx-auto 2xl:px-28 mt-14 md:mt-[100px]">
          <div className="flex flex-col md:flex-row md:gap-6 justify-between">
            {data.map((item, index) => (
              <div
                key={index}
                className="box-sc border-t border-[#434652] pt-5"
              >
                <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center relative overflow-hidden">
                  <img src={item?.imgSrc} className="" width={24} />
                </div>
                <a
                  href="#"
                  className="group flex items-center justify-between subH  py-2"
                >
                  {item?.title}
                </a>
                <p className="body1 text-grey2 mb-8">{item?.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className=" md:my-28 my-20">
          <TeamsCarousel />
        </div>

        <div
          className="h-screen max-h-[800px] min-h-[800px] sm:min-h-[500px] bg-top bg-contain ssm:bg-cover  sm:bg-right md:bg-center lg:bg-left"
          style={{
            backgroundImage: `linear-gradient(00deg, #03000D 0%, rgba(3, 0, 13, 0) 110.36%), url(${VeoCamBg})`,
          }}
        >
          <div className="relative z-10 flex flex-col justify-end  h-full p-6 md:p-16 lg:px-28 sm:pb-[130px] text-white  max-w-screen-2xl mx-auto">
            <div className="mb-4 lg:mb-8 max-w-[280px]">
              <span className=" bg-[#faf9f61a] body3 p-1 pr-2 pl-1 rounded-full border border-[#FAF9F64D] flex items-center aeonik">
                <span className="w-[25px] h-[25px] bg-[#0A3D14] rounded-full border border-grey3 inline-block relative mr-2">
                  <img
                    src={VeoLogo}
                    alt="Veo Logo"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[17px] h-[17px]"
                  />
                </span>
                Distribuidor oficial de Veo Technologies
              </span>
            </div>

            <h1 className="h1Title mb-6 lg:mb-8 md:w-[550px] 2xl:w-[auto]">
              Impulsa tu juego con ia
            </h1>
            <p className="body0 sm:w-[490px]">
              Graba, analiza, comparte y transmite tus partidos y entrenamientos
              con Veo Cam 3.
            </p>
            <div className="py-6 flex flex-col sm:flex-row">
              <div className="mr-0 sm:mr-4 pb-[10px] sm:pb-0">
                <Button
                  text={"Contactanos"}
                  width="w-[90vw] sm:w-[185px]"
                  height="h-[48px]"
                />
              </div>
              <div>
                <Button
                  text={"Recibir cotización"}
                  width="w-[90vw] sm:w-[220px]"
                  height="h-[48px]"
                  bg={"rgba(255, 255, 255, 0.1)"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 md:px-16 lg:px-28 max-w-screen-2xl mx-auto">
          <h3 className="h1Title">planes de suscripcion</h3>
          <p className="mt-8 body1 opacity-50">
            Todas las cámaras necesitan de una suscripción para su
            funcionamiento, y cada suscripción aplica solamente para una cámara.
            <br />
            Renueva tu suscripción cada 1, 6 o 12 meses para mantener la cámara
            activa.
          </p>
        </div>
        <div className="mb-[80px] md:mb-[180px] max-w-[1536px] mx-6 lm:mx-16 xl:mx-28 2xl:mx-auto 2xl:px-28 mt-14 md:mt-[100px]">
          <div className="flex flex-col md:flex-row md:gap-6 justify-between max-w-[970px] m-auto">
            {suscriptions.map((item, index) => (
              <div
                key={index}
                className="box-sc flex flex-col items-center justify-evenly w-[310px] h-[283px] md:w-[250px] md:h-[270px] lg:w-[310px]  bg-white rounded-lg  "
              >
                <a
                  href="#"
                  className="group flex items-center justify-between subH text-black "
                >
                  {item?.title}
                </a>
                <p className="body2 text-grey4 text-center ">{item?.desc}</p>
                <p className="aeonik font-bold text-3xl text-black">
                  {item?.price}
                </p>
                <Button
                  border={"solid 1px #434652"}
                  textColor={"black"}
                  bg={"transparent"}
                  text={item?.cta}
                  width={"w-[200px]"}
                  height={""}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center mt-[100px]">
            <p className="body1 text-white mb-3 opacity-50">
              ¿Quieres saber mas sobre los planes?
            </p>
            <Button
              text={"Comparar planes "}
              width="w-[90vw] sm:w-[290px]"
              height="h-[50px]"
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default VeoCam;
