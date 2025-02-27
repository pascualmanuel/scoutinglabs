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
    }
  `);

  return {
    veoCamPage: data.allStrapiVeoCam.nodes[0],
    scoutingPlayPage: data.allStrapiScoutingPlay.nodes[0],
  };
};

export default usePagesData;
