// src/components/Layout.js
import React from "react";
import WhiteLogo from "../assets/white-logo.svg";
import Button from "./Button";
import Test from "../assets/home/veo-transparent.webp";
import Pablo from "../assets/pablo.png";
import Pablo2 from "../assets/pablo2.jpg";
import { Link } from "gatsby";
import Navbar from "./Navbar";
import Navbardos from "./navbardos";
import PreFooter from "./PreFooter";
import Social1 from "../assets/icons/fb-icon.svg";
import Social2 from "../assets/icons/x-icon.svg";
import Social3 from "../assets/icons/instagram-icon.svg";
import Social4 from "../assets/icons/linkedin-icon.svg";
import Social5 from "../assets/icons/tiktok-icon.svg";
const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <PreFooter />
      <footer className="bg-iBlue shadow-[0px_-6px_64px_rgba(0,_0,_0,_0.25)] h-[1057px]">
        <div className="mx-5">
          <div className="border-b border-[#ffffff35]  py-6">
            <img src={WhiteLogo} />
          </div>
          <div className="pt-6 pb-10">
            <p className="body1 text-grey4 ">
              Distribuímos tecnología deportiva y ofrecemos oportunidades en el
              exterior que impulsan el crecimiento del deporte amateur en Latam.
            </p>
          </div>
        </div>
        <div className="mx-5">
          <div>
            <p className="body3 uppercase text-grey1">SOLUCIONES</p>
            <p className="body2 text-grey4 py-3">Veo Cam 3</p>
            <p className="body2 text-grey4">Becas universitarias</p>
            <p className="body2 text-grey4 py-3">Scouting Play</p>
            <p className="body2 text-grey4">Precios</p>
          </div>
          <div className="mt-[30px]">
            <p className="body3 uppercase text-grey1">COMPANY</p>
            <p className="body2 text-grey4 py-3">Precios</p>
            <p className="body2 text-grey4">Nosotros</p>
            <p className="body2 text-grey4 py-3">Contacto</p>
            <p className="body2 text-grey4">Blog</p>
          </div>
          <div className="mt-[30px] border-b border-[#ffffff35] pb-10">
            <p className="body3 uppercase text-grey1">Contacto</p>
            <p className="body2 text-grey4 pt-4"> T: +54 9 11 7327 1069</p>
            <p className="body2 text-grey4 ">E: hello@scouting.labs</p>
            <p className="body2 text-grey4 pt-4"> Buenos Aires, Argentina</p>

            <p className="body2 text-grey4 pt-4"> T: +54 9 11 7327 1069</p>
            <p className="body2 text-grey4 ">E: hello@scouting.labs</p>
            <p className="body2 text-grey4 pt-4"> Madrid, Spain</p>
          </div>
        </div>
        <div>
          <p className="text-[#64626A] text-xs font-thin mt-4 flex justify-center  aenoik	">
            © 2024 SCOUTING LABS
          </p>
          <div className="flex flex-row justify-center my-10">
            <div className="w-[220px] flex flex-row justify-between ">
              <Link to={"/"} target="_blank">
                <img src={Social1} />
              </Link>
              <Link to={"/"} target="_blank">
                <img src={Social2} />
              </Link>
              <Link to={"/"} target="_blank">
                <img src={Social3} />
              </Link>
              <Link to={"/"} target="_blank">
                <img src={Social4} />
              </Link>
              <Link to={"/"} target="_blank">
                <img src={Social5} />
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-center ">
            <div className="w-[250px] flex flex-row justify-between text-[#64626A] text-xs font-thin aenoik">
              <Link to={"/"}>
                <p>Privacidad</p>
              </Link>
              <Link to={"/"}>
                <p>Terminos y condiciones</p>
              </Link>
              <Link to={"/"}>
                <p>Cookies</p>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
