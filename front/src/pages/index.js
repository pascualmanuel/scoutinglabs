import React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout"; // Si tienes un layout común
import "../styles/Layout.css";
import "../styles/Home.css";
import HomeHero from "../components/home/HomeHero.js";
import HomeVeo from "../components/home/HomeVeo.jsx";
import OurMission from "../components/home/OurMission.jsx";
import Popup from "../components/home/Popup.js";
import PreLoadVeoCam from "../assets/veocam-bg.webp";
import PreLoadSL from "../assets/scoutingplay/splay-bg.webp";
import PreLoadNosotros from "../assets/nosotros/nosotros-bg.webp";
import PreLoadSuscripciones from "../assets/suscripciones/susc2.webp";
//

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the popup has already been closed before
    const hasPopupClosed = localStorage.getItem("popupClosed");

    if (!hasPopupClosed) {
      // Show the popup after 3 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5700);

      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem("popupClosed", "true"); // Store in localStorage
  };

  return (
    <>
      <img src={PreLoadVeoCam} className="hidden" />
      <img src={PreLoadSL} className="hidden" />
      <img src={PreLoadNosotros} className="hidden" />
      <img src={PreLoadSuscripciones} className="hidden" />
      <Layout>
        <HomeHero playVideo />
        {showPopup && <Popup onClose={handleClosePopup} />}

        <OurMission />
        <HomeVeo />
      </Layout>
    </>
  );
};

export default HomePage;

export { default as Head } from "../components/Seo";
