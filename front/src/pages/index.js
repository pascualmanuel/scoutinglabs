import React from "react";
import { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout"; // Si tienes un layout común
import Seo from "../components/Seo.js"; // Si estás usando SEO dinámico
import "../styles/Layout.css";
import "../styles/Home.css";
import HomeHero from "../components/home/HomeHero.js";
import HomeVeo from "../components/home/HomeVeo.jsx";
import OurMission from "../components/home/OurMission.jsx";
import Loader from "../components/home/Loader.jsx";
const HomePage = ({ data }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); // Estado para el fade-out

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  useEffect(() => {
    const loaderShown = localStorage.getItem("a");

    const timeout = setTimeout(() => {
      setFadeOut(true); // Activamos el fadeout
      setLoaderVisible(false); // Ocultamos el loader
      localStorage.setItem("loaderShown", "true");
      setVideoPlaying(true); // Iniciamos el video
    }, 3500); // Tiempo de 3.5 segundos para el loader

    if (loaderShown) {
      setFadeOut(true);
      setLoaderVisible(false);
      setVideoPlaying(true);
    }

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setIsChecked(true);
  }, [loaderVisible]);

  if (!isChecked) {
    return null;
  }

  return (
    <>
      {loaderVisible && <Loader fadeOut={fadeOut} />}
      {/* El Loader se mantiene visible hasta 3.5 segundos */}
      <Layout>
        <Seo title="Scouting Labs" description="Scouting Labs home" />
        <HomeHero
          onVideoLoad={handleVideoLoad}
          playVideo={videoPlaying} // Pasamos el estado que controla si el video debe reproducirse
        />
        <OurMission />
        <HomeVeo />
      </Layout>
    </>
  );
};

export default HomePage;

// Consulta GraphQL (puedes dejarla en blanco si todavía no tienes datos)
export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
