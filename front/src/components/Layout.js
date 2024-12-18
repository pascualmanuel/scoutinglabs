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
      <footer className="bg-iBlue shadow-[0px_-6px_64px_rgba(0,_0,_0,_0.25)] mt-[-2px]">
        <div className="max-w-[550px] mx-auto ms:max-w-[700px] llg:max-w-[840px] mg:max-w-[1450px] mg:mx-[140px] ">
          <div className="llg:flex llg:flex-row llg:justify-between">
            <div className="mx-5">
              <div className="border-b border-[#ffffff35] py-6 llg:py-[0px] llg:border-none">
                <img src={WhiteLogo} />
              </div>
              <div className="pt-6 pb-10">
                <p className="body1 text-grey4 ssm:w-[340px] llg:w-[280px] lg:w-[350px]">
                  Distribuímos tecnología deportiva y ofrecemos oportunidades en
                  el exterior que impulsan el crecimiento del deporte amateur en
                  Latam.
                </p>
              </div>
            </div>
            {/* <div></div> */}
            <div className="mx-5 ssm:flex ssm:justify-between border-b border-[#ffffff35] llg:w-[450px] llg:border-none">
              <div>
                <p className="body3 uppercase text-grey1">SOLUCIONES</p>
                <Link to={"/"} target="_blank">
                  <p className="body2 text-grey4 py-3 ">Veo Cam 3</p>
                </Link>
                <Link to={"/"} target="_blank">
                  <p className="body2 text-grey4">Becas universitarias</p>
                </Link>
                <Link to={"/"} target="_blank">
                  <p className="body2 text-grey4 py-3 ">Scouting Play</p>
                </Link>
                <Link to={"/"} target="_blank">
                  <p className="body2 text-grey4">Precios</p>
                </Link>
              </div>
              <div className="mt-[30px] ssm:mt-0">
                <p className="body3 uppercase text-grey1">COMPANY</p>
                <Link to={"/"} target="_blank">
                  <p className="body2 text-grey4 py-3 ">Precios</p>
                </Link>
                <Link to={"/"} target="_blank">
                  <p className="body2 text-grey4">Nosotros</p>
                </Link>
                <Link to={"/"} target="_blank">
                  <p className="body2 text-grey4 py-3 ">Contacto</p>
                </Link>
                <Link to={"/"} target="_blank">
                  <p className="body2 text-grey4">Blog</p>
                </Link>
              </div>
              <div className="mt-[30px] ssm:mt-0 pb-10">
                <p className="body3 uppercase text-grey1">Contacto</p>
                <p className="body2 text-grey4 pt-4"> T: +54 9 11 7327 1069</p>
                <p className="body2 text-grey4 ">E: hello@scouting.labs</p>
                <p className="body2 text-grey4 pt-4">
                  {" "}
                  Buenos Aires, Argentina
                </p>

                <p className="body2 text-grey4 pt-4"> T: +54 9 11 7327 1069</p>
                <p className="body2 text-grey4 ">E: hello@scouting.labs</p>
                <p className="body2 text-grey4 pt-4"> Madrid, Spain</p>
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
                <div className="w-[250px] flex flex-row justify-between text-[#64626A] text-xs font-thin aenoik llg:ml-8">
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
            <div>
              <div className=" flex-row justify-center my-10 hidden llg:flex">
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
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
