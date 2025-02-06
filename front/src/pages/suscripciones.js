import React from "react";
import Layout from "../components/Layout";
import PricingTable from "../components/prices/PriceComparation";
import PlanComparation from "../components/prices/PlanComparation";
import VeoCamImg from "../assets/home/veo-transparent3.webp";
import VeoLogo from "../assets/icons/veo-logo.svg";
import Button from "../components/Button";
const Suscripciones = () => {
  return (
    <>
      <Layout>
        <div className="susc-bg h-[800px] flex flex-col justify-center items-center px-5 lg:px-28">
          <div className="ssm:w-[500px] md:w-full md:flex md:flex-row md:justify-evenly md:items-center lg:justify-between ">
            <div className=" mb-8">
              <div className=" mb-7 lg:mb-8 max-w-[280px]">
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
              <h2 className="h1Title w-[300px] mg:w-[400px]">
                PRECIOS
                <span className="text-skyBlue"> EXCLUSIVOS PARA LATAM</span>
              </h2>
              <div className="mt-6">
                <Button
                  text={"Contactanos"}
                  width="w-[155px]"
                  height="h-[48px]"
                  link={"/"}
                />
              </div>
            </div>
            <div
              className="h-[310px] rounded-[20px] border border-grey4 whtie-50-op md:h-[490px]
              
              "
              style={{
                background:
                  "linear-gradient(142deg, rgba(5, 132, 245, 0.9), rgba(5, 132, 245, 0) 90%)",
              }}
            >
              <div className="flex flex-col justify-end h-full relative overflow-hidden px-5 lg:h-[490px] lg:w-[500px] xxl:w-[620px] xxl:px-10">
                <img
                  src={VeoCamImg}
                  className="absolute top-5 right-5 lg:right-20  w-auto h-[80px] ssm:h-[120px] md:h-[160px] xxl:h-[200px] xxl:right-[37px] xxl:top-[65px]"
                />
                <h2 className="grotzec  w-[225px] text-[]">
                  <span className="line-through text-[45px]">USD1199</span>{" "}
                  <br /> <span className="text-[64px] leading-8">USD800</span>
                  <br />
                  <span className="text-[45px] leading-10">UN SOLO PAGO</span>
                </h2>
                <p className="body1 !text-xs sm:!text-base text-grey1 pt-4 pb-8 max-w-[340px] lg:max-w-none">
                  La cámara necesita de una suscripción para su funcionamiento.
                  Renueva tu suscripción cada 1, 6 o 12 meses para mantener la
                  cámara activa.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#ffff]">
          <PlanComparation />
        </div>
        <div className="bg-white">
          <PricingTable />
        </div>
      </Layout>
    </>
  );
};

export default Suscripciones;
