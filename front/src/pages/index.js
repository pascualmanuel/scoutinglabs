import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout"; // Si tienes un layout común
import Seo from "../components/Seo.js"; // Si estás usando SEO dinámico
import "../styles/Layout.css";
import "../styles/Home.css";
import HomeHero from "../components/home/HomeHero.js";
import HomeVeo from "../components/home/HomeVeo.jsx";
import OurMission from "../components/home/OurMission.jsx";

const HomePage = ({ data }) => {
  return (
    <Layout>
      <Seo title="Scouting Labs" description="Scouting Labs home" />
      <HomeHero />
      <HomeVeo />
      <OurMission />
    </Layout>
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
