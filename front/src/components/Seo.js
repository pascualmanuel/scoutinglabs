import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import pageMetadata from "../content/seo.json";

const imageDescriptions = {
  camera: "Cámara Veo sobre una tribuna de estadio",
  team: "Análisis de un partido en la plataforma Veo",
  community: "Tribunas azules de un estadio",
};

// Se exporta como Head en cada página para generar metadata en el HTML inicial.
const Seo = ({ location }) => {
  const { site, camera, team, community } = useStaticQuery(graphql`
    query SeoMetadata {
      site {
        siteMetadata {
          siteUrl
          title
        }
      }
      camera: file(relativePath: { eq: "veocam/veo-cam-bg.webp" }) {
        childImageSharp {
          resize(width: 1200, height: 630, quality: 85, toFormat: JPG, cropFocus: CENTER) {
            src
            width
            height
          }
        }
      }
      team: file(relativePath: { eq: "nosotros/nosotros-bg.webp" }) {
        childImageSharp {
          resize(width: 1200, height: 630, quality: 85, toFormat: JPG) {
            src
            width
            height
          }
        }
      }
      community: file(relativePath: { eq: "scoutingplay/splay-bg.webp" }) {
        childImageSharp {
          resize(width: 1200, height: 630, quality: 85, toFormat: JPG) {
            src
            width
            height
          }
        }
      }
    }
  `);

  const pathname = `${location.pathname.replace(/\/+$/, "")}/`;
  const metadata = pageMetadata[pathname];

  // El inglés incompleto, las pruebas y los errores no se promocionan en buscadores.
  if (!metadata) {
    return (
      <>
        <title>{site.siteMetadata.title}</title>
        <meta id="robots" name="robots" content="noindex, follow" />
      </>
    );
  }

  const canonical = new URL(pathname, site.siteMetadata.siteUrl).href;
  const image = { camera, team, community }[metadata.image].childImageSharp.resize;
  const imageUrl = new URL(image.src, site.siteMetadata.siteUrl).href;
  const imageAlt = imageDescriptions[metadata.image];

  return (
    <>
      <title>{metadata.title}</title>
      <meta id="description" name="description" content={metadata.description} />
      <link id="canonical" rel="canonical" href={canonical} />
      <meta id="og-type" property="og:type" content="website" />
      <meta id="og-site-name" property="og:site_name" content={site.siteMetadata.title} />
      <meta id="og-locale" property="og:locale" content="es_AR" />
      <meta id="og-title" property="og:title" content={metadata.title} />
      <meta id="og-description" property="og:description" content={metadata.description} />
      <meta id="og-url" property="og:url" content={canonical} />
      <meta id="og-image" property="og:image" content={imageUrl} />
      <meta id="og-image-type" property="og:image:type" content="image/jpeg" />
      <meta id="og-image-width" property="og:image:width" content={image.width} />
      <meta id="og-image-height" property="og:image:height" content={image.height} />
      <meta id="og-image-alt" property="og:image:alt" content={imageAlt} />
      <meta id="twitter-card" name="twitter:card" content="summary_large_image" />
      <meta id="twitter-title" name="twitter:title" content={metadata.title} />
      <meta id="twitter-description" name="twitter:description" content={metadata.description} />
      <meta id="twitter-image" name="twitter:image" content={imageUrl} />
      <meta id="twitter-image-alt" name="twitter:image:alt" content={imageAlt} />
    </>
  );
};

export default Seo;
