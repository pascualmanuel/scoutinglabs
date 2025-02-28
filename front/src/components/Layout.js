// src/components/Layout.js
import React from "react";
import { Link, useLocation } from "@reach/router";

import WhiteLogo from "../assets/white-logo.svg";
import Button from "./Button";
import Test from "../assets/home/veo-transparent.webp";
import Pablo from "../assets/pablo.png";
import Pablo2 from "../assets/pablo2.jpg";
import Navbar from "./Navbar";

import PreFooter from "./PreFooter";
import Social1 from "../assets/icons/fb-icon.svg";
import Social2 from "../assets/icons/x-icon.svg";
import Social3 from "../assets/icons/instagram-icon.svg";
import Social4 from "../assets/icons/linkedin-icon.svg";
import Social5 from "../assets/icons/tiktok-icon.svg";
import useLayoutData from "../hooks/useLayoutData";
import { useLanguage } from "../hooks/LanguageContext";
import LangLink from "../hooks/LangLink";

const Layout = ({ children }) => {
  const location = useLocation(); // Obtiene la URL actual

  const { footer } = useLayoutData();
  const { locale, changeLanguage } = useLanguage();

  const localizedData =
    footer?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || footer;

  // Define la URL en la que quieres ocultar la sección
  const hideSectionUrl = "/contacto/";

  return (
    <>
      <header className="h-[70px]">
        <Navbar />
      </header>
      <main>{children}</main>
      {location.pathname !== hideSectionUrl && <PreFooter />}
      <footer className="bg-iBlue shadow-[0px_-6px_64px_rgba(0,_0,_0,_0.25)] mt-[-2px]">
        <div className=" mx-auto xl:mx-28 ">
          <div className="llg:flex llg:flex-row llg:justify-between max-w-screen-2xl mx-auto">
            <div className="mx-6 lm:mx-16 xl:mx-0 ">
              <div className="border-b border-[#ffffff35] py-6 llg:py-[0px] llg:border-none">
                <LangLink to={"/"}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${localizedData.logo.url}`}
                  />
                </LangLink>
              </div>
              <div className="pt-6 pb-10">
                <p className="body1 text-grey4 ssm:w-[340px] llg:w-[280px] lg:w-[350px]">
                  {localizedData?.description}
                </p>
              </div>
            </div>

            <div className="mx-6 lm:mx-16 xl:mx-0 ssm:flex ssm:justify-between border-b border-[#ffffff35] llg:w-[450px] llg:border-none">
              <div>
                <p className="body3 uppercase text-grey1 pb-3">
                  {localizedData?.first_col_title}
                </p>

                {localizedData?.first_col_list?.map((item, index) => (
                  <LangLink to={item.link} target="_blank">
                    <p
                      key={index}
                      className={`body2 text-grey4 capitalize  pb-3`}
                    >
                      {item.text}
                    </p>
                  </LangLink>
                ))}
              </div>
              <div className="">
                <p className="body3 uppercase text-grey1 pb-3">
                  {localizedData?.second_col_title}
                </p>

                <p className="body3 uppercase text-grey1"> </p>
                {/* <LangLink to={"/"} target="_blank">
                  <p className="body2 text-grey4 py-3 ">Precios</p>
                </LangLink>
                <LangLink to={"/"} target="_blank">
                  <p className="body2 text-grey4">Nosotros</p>
                </LangLink>
                <LangLink to={"/contacto"} target="_blank">
                  <p className="body2 text-grey4 py-3 ">Contacto</p>
                </LangLink>
                <LangLink to={"/"} target="_blank">
                  <p className="body2 text-grey4">Blog</p>
                </LangLink> */}
                {localizedData?.second_col_list?.map((item, index) => (
                  <LangLink to={item.link} target="_blank">
                    <p
                      key={index}
                      className={`body2 text-grey4 capitalize  pb-3`}
                    >
                      {item.text}
                    </p>
                  </LangLink>
                ))}
              </div>
              <div className="mt-[30px] ssm:mt-0 pb-10">
                <p className="body3 uppercase text-grey1 pb-3">
                  {localizedData?.third_col_title}
                </p>
                {localizedData?.third_col_list?.map((item, index) => (
                  <p
                    key={index}
                    className={`body2 text-grey4 pb-2 ${
                      index % 3 === 0 ? "" : ""
                    }`}
                  >
                    {item.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="llg:flex llg:items-center llg:justify-between llg:mt-24 border-t border-[#ffffff35]">
            <div className="llg:flex">
              <p className="text-[#64626A] text-xs font-thin mt-4 flex justify-center  aenoik llg:mt-0	">
                © 2024 SCOUTING LABS
              </p>
              <div className="flex flex-row justify-center my-10 llg:hidden">
                <div className="w-[220px] flex flex-row justify-between ">
                  {localizedData?.social_network?.map((item, index) => (
                    <a href={item?.link} target="_blank">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${item?.icon?.url}`}
                      />
                    </a>
                  ))}
                  {/*                 
                  <LangLink to={"/"} target="_blank">
                    <img src={Social1} />
                  </LangLink>
                  <LangLink to={"/"} target="_blank">
                    <img src={Social2} />
                  </LangLink>
                  <LangLink to={"/"} target="_blank">
                    <img src={Social3} />
                  </LangLink>
                  <LangLink to={"/"} target="_blank">
                    <img src={Social4} />
                  </LangLink>
                  <LangLink to={"/"} target="_blank">
                    <img src={Social5} />
                  </LangLink> */}
                </div>
              </div>
              <div className="flex flex-row justify-center ">
                <div className="w-[250px] flex flex-row justify-between text-[#64626A] text-xs font-thin aenoik llg:ml-8">
                  <LangLink to={"/"}>
                    <p>Privacidad</p>
                  </LangLink>
                  <LangLink to={"/"}>
                    <p>Terminos y condiciones</p>
                  </LangLink>
                  <LangLink to={"/"}>
                    <p>Cookies</p>
                  </LangLink>
                </div>
              </div>
            </div>
            <div>
              <div className=" flex-row justify-center my-10 hidden llg:flex">
                <div className="w-[220px] flex flex-row justify-between ">
                  {localizedData?.social_network?.map((item, index) => (
                    <a href={item.link} target="_blank">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${item?.icon?.url}`}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
