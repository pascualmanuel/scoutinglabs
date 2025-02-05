import React from "react";
import Layout from "../components/Layout";
import PricingTable from "../components/prices/PriceComparation";
const Suscripciones = () => {
  return (
    <>
      <Layout>
        <div className="h-[20vh]">Suscripciones</div>
        <div className="bg-white">
          <PricingTable />
        </div>
      </Layout>
    </>
  );
};

export default Suscripciones;
