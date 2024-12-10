import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout"; // Si tienes un layout común
import Seo from "../components/Seo.js"; // Si estás usando SEO dinámico

const HomePage = ({ data }) => {
  return (
    <Layout>
      <Seo title="Inicio" description="Bienvenido a Scouting Labs" />
      <div>
        {/* Aquí irá el contenido del Home */}
        <h1>Bienvenido a Scouting Labs</h1>
        <p>Plataforma para scouting y gestión de talentos.</p>
      </div>
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
