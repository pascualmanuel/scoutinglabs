import React from "react";
import Layout from "../components/Layout";
import Faqs from "../components/Faqs/faqs.js";
const Ayuda = () => {
  return (
    <>
      <Layout>
        <div className="max-w-[1536px] mx-6 lm:mx-16 xl:mx-28 2xl:mx-auto 2xl:px-28">
          <Faqs />
        </div>
      </Layout>
    </>
  );
};

export default Ayuda;
