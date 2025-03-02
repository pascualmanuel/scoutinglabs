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
    }
  `);

  return {
    veoCamPage: data.allStrapiVeoCam.nodes[0],
    scoutingPlayPage: data.allStrapiScoutingPlay.nodes[0],
    accessoriesData: data.allStrapiAccessorie.nodes,
  };
};

export default usePagesData;
