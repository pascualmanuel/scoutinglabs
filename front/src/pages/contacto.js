import React from "react";
import Layout from "../components/Layout";
import ContactForm from "../components/contact/ContactForm.jsx";
import TickContact from "../assets/icons/tick-contact.svg";
import ContactCircles from "../components/contact/ContactCircles.js";

import usePagesData from "../hooks/usePagesData";
import { useLanguage } from "../hooks/LanguageContext";
import { ParseMarkdown } from "../hooks/ParseMarkdown";

const Contacto = () => {
  const { contactData } = usePagesData();
  const { locale } = useLanguage();
  const localizedData =
    contactData?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || contactData;

  return (
    <>
      {" "}
      <Layout>
        <div className="px-4 ssm:px-6 sm:px-16 lg:h-[750px] lg:flex lg:flex-row lg:items-center lg:justify-center lg:mt-[-40px]">
          <div className="mb-10">
            <ContactCircles />
            <h1 className="h1Title mg:text-[110px] mg:leading-[102px] mg:tracking-[-0.03em] mb-8 lg:max-w-[550px]">
              {localizedData?.title}
            </h1>
            <div className="flex flex-row items-center">
              <img src={TickContact} />
              <p className="ml-2 body1 text-grey3">
                {localizedData?.bullet_point_subtitle}
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

export { default as Head } from "../components/Seo";
