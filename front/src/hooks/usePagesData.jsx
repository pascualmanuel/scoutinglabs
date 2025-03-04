import { useStaticQuery, graphql } from "gatsby";

const usePagesData = () => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiVeoCam {
        nodes {
          locale
          title
          subtitle
          buttons {
            link
            text
          }
          description {
            data {
              description
            }
          }
          boxes {
            title
            description
          }
          second_section_buttons {
            link
            text
          }
          second_section_bg {
            url
          }
          second_section_title
          second_section_subtitle

          suscription_title

          suscription_description {
            data {
              suscription_description
            }
          }
          slider {
            bg_image {
              url
            }
            deporte
            description
          }
          localizations {
            locale
            title
            subtitle

            buttons {
              link
              text
            }
            second_section_buttons {
              link
              text
            }
            description
            boxes {
              title
              description
            }

            slider {
              bg_image {
                url
              }
              deporte
              description
            }
          }
        }
      }
      allStrapiScoutingPlay {
        nodes {
          locale
          logo {
            url
          }
          title
          buttons {
            icon {
              url
            }
            link
            text
          }
          datos {
            title
            subtitle
          }
          localizations {
            locale
            logo {
              url
            }
            title
            buttons {
              icon {
                url
              }
              link
              text
            }
            datos {
              title
              subtitle
            }
          }
        }
      }

      allStrapiNosotros {
        nodes {
          locale
          left_title
          right_title
          paragraph {
            data {
              paragraph
            }
          }
          boxes {
            title
            description
            media {
              url
            }
          }
          paises_title
          paises {
            country_name
            country_code
          }
          localizations {
            locale
            left_title
            right_title
            paragraph
            boxes {
              title
              description
              media {
                url
              }
            }
            paises_title
            paises {
              country_name
              country_code
            }
          }
        }
      }

      allStrapiAccessorie {
        nodes {
          locale
          title
          description
          image {
            url
          }
          localizations {
            locale
            title
            description
            image {
              url
            }
          }
        }
      }
      allStrapiSubscriptionPlan {
        nodes {
          locale
          title
          desc {
            data {
              desc
            }
          }
          mensualPrice
          semestralPrice
          annualPrice
          featuredCard
          whatInclude {
            data {
              whatInclude
            }
          }
          addon {
            id
            title
            description
            mensual_price
            semestral_price
            annual_price
          }
          localizations {
            locale
            title
            desc
            mensualPrice
            semestralPrice
            annualPrice
            featuredCard
            whatInclude
            addon {
              id
              title
              description
              mensual_price
              semestral_price
              annual_price
            }
          }
        }
      }
    }
  `);

  return {
    veoCamPage: data.allStrapiVeoCam.nodes[0],
    scoutingPlayPage: data.allStrapiScoutingPlay.nodes[0],
    accessoriesData: data.allStrapiAccessorie.nodes,
    nosotrosData: data.allStrapiNosotros.nodes[0],
    subsData: data.allStrapiSubscriptionPlan.nodes,
  };
};

export default usePagesData;
