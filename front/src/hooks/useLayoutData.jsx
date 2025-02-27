import { useStaticQuery, graphql } from "gatsby";

const useLayoutData = () => {
  // Consulta GraphQL utilizando useStaticQuery
  const { allStrapiFooter, allStrapiNavbar } = useStaticQuery(graphql`
    query {
      allStrapiFooter {
        nodes {
          locale
          logo {
            url
          }
          description
          first_col_title
          first_col_list {
            text
            link
          }
          second_col_title
          second_col_list {
            text
            link
          }
          third_col_title
          third_col_list {
            text
          }
          preFooter_title
          social_network {
            icon {
              url
            }
            link
          }
          footerCards {
            title
            description
            second_title
            link
          }
          localizations {
            locale
            logo {
              url
            }
            description
            first_col_title
            first_col_list {
              text
              link
            }
            second_col_title
            second_col_list {
              text
              link
            }
            third_col_title
            third_col_list {
              text
            }
            preFooter_title
            social_network {
              icon {
                url
              }
              link
            }
            footerCards {
              title
              description
              second_title
              link
            }
          }
        }
      }
      allStrapiNavbar {
        nodes {
          locale
          logo {
            url
          }
          links {
            text
            link
          }
          button {
            text
            link
          }

          localizations {
            locale
            logo {
              url
            }
            links {
              text
              link
            }
            button {
              text
              link
            }
          }
        }
      }
    }
  `);

  // Devuelve los datos de footer y navbar
  return {
    footer: allStrapiFooter.nodes[0],
    navbar: allStrapiNavbar.nodes[0],
  };
};

export default useLayoutData;
