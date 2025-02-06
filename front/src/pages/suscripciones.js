import React from "react";
import Layout from "../components/Layout";
import PricingTable from "../components/prices/PriceComparation";
import PlanComparation from "../components/prices/PlanComparation";
import VeoCamImg from "../assets/home/veo-transparent2.webp";
import VeoLogo from "../assets/icons/veo-logo.svg";

const Suscripciones = () => {
  return (
    <>
      <Layout>
        <div className="susc-bg h-[800px] flex flex-col justify-center">
          <div className="ml-5 mb-8">
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
            <h2 className="h1Title w-[300px]">
              PRECIOS
              <span className="text-skyBlue"> EXCLUSIVOS PARA LATAM</span>
            </h2>
          </div>
          <div
            className="h-[310px] rounded-[20px] border border-grey4 whtie-50-op mx-5"
            style={{
              background:
                "linear-gradient(142deg, rgba(5, 132, 245, 0.9), rgba(5, 132, 245, 0) 90%)",
            }}
          >
            <div className="flex flex-col justify-end h-full relative overflow-hidden px-5">
              <img
                src={VeoCamImg}
                className="absolute top-4 right-0  w-auto h-[80px]"
              />
              <h2 className="h2Title w-[225px]">
                <span className="line-through">USD1199</span> <br /> USD 800
                <br />
                UN SOLO PAGO
              </h2>
              <p className="body1 text-grey1 pt-4 pb-8 ">
                La cámara necesita de una suscripción para su funcionamiento.
                Renueva tu suscripción cada 1, 6 o 12 meses para mantener la
                cámara activa.
              </p>
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
