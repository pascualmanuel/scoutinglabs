import React from "react";
import Layout from "../components/Layout";
import ContactForm from "../components/contact/ContactForm.jsx";
import TickContact from "../assets/icons/tick-contact.svg";
import ContactCircles from "../components/contact/ContactCircles.js";
const Contacto = () => {
  return (
    <>
      {" "}
      <Layout>
        <div className="px-4 ssm:px-6 sm:px-16 lg:h-[750px] lg:flex lg:flex-row lg:items-center lg:justify-center mt-[-40px]">
          <div className="mb-10">
            <ContactCircles />
            <h2 className="h1Title mg:text-[110px] mg:leading-[102px] mg:tracking-[-0.03em] mb-8 lg:max-w-[550px]">
              GET IN TOUCH WITH OUR SALES TEAM
            </h2>
            <div className="flex flex-row items-center">
              <img src={TickContact} />
              <p className="ml-2 body1 text-grey3">
                Access to dedicated product specialists
              </p>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contacto;
