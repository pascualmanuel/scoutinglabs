import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout"; // Si tienes un layout común
import Seo from "../components/Seo.js"; // Si estás usando SEO dinámico

const HomePage = ({ data }) => {
  return (
    <Layout>
      <Seo title="Style Guide" description="Guía de estilos" />

      <div>
        <h1 className="h1Title">H1 - Desktop</h1>
        <p className="body1">
          Esta es una muestra de cuerpo de texto con la fuente{" "}
          <strong>Aeonik TRIAL</strong> para la clase body1.
        </p>
        <h2 className="h2Title">H2 - Desktop (&MOB)</h2>
        <p className="body2">
          Esta es una muestra de cuerpo de texto con la fuente{" "}
          <strong>Aeonik</strong> para la clase body2.
        </p>
        <button className="buttonText">Botón de texto</button>
        <p className="subH">Subheading Especial</p>
        <p className="body3">Texto en la clase body3 con fuente Aeonik.</p>
        <div className="loaderFont">20%</div>
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
