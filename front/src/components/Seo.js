// src/components/Seo.js
import React from "react";
import { Helmet } from "react-helmet";

const Seo = ({ title, description, heroVideoUrl, partnerImageUrl }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link
        rel="icon"
        type="image/png"
        href="../assets/favicon/favicon-96x96.png"
        sizes="96x96"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        href="../assets/favicon/favicon.svg"
      />
      <link rel="shortcut icon" href="../assets/favicon/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="../assets/favicon/apple-touch-icon.png"
      />
      <link rel="manifest" href="../assets/favicon/site.webmanifest" />
      {/* Preload recursos críticos para mejorar LCP */}
      {heroVideoUrl && (
        <link rel="preload" as="video" href={heroVideoUrl} />
      )}
      {partnerImageUrl && (
        <link rel="preload" as="image" href={partnerImageUrl} />
      )}
    </Helmet>
  );
};

export default Seo;
