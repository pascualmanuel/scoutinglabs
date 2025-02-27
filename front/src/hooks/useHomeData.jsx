import { useStaticQuery, graphql } from "gatsby";

const useHomeData = () => {
  const { strapiHome } = useStaticQuery(graphql`
    query {
      strapiHome {
        locale
        hero_title
        hero_background {
          id
          url
        }
        partner_title
        partner_subtitle
        partner_number
        partner_desc
        partner_cta {
          link
          text
        }
        heroLinks {
          text
          link
        }
        partner_img {
          url
        }
        why_scouting_upTitle
        first_title
        second_title
        box_link {
          title
          subtitle
          link
        }
        veo_first_title
        veo_second_title
        veo_desc
        veo_button {
          text
          link
        }
        confian_first_title
        confian_second_title
        mission_title
        mision_desc
        mision_button {
          text
          link
        }
        slider {
          id
          title
          description
          video {
            url
            name
          }
        }
        localizations {
          locale
          hero_title
          hero_background {
            id
            url
          }
          partner_title
          partner_subtitle
          partner_number
          partner_desc
          partner_cta {
            link
            text
          }
          heroLinks {
            text
            link
          }
          partner_img {
            url
          }
          why_scouting_upTitle
          first_title
          second_title
          box_link {
            title
            subtitle
            link
          }
          veo_first_title
          veo_second_title
          veo_desc
          veo_button {
            text
            link
          }
          confian_first_title
          confian_second_title
          mission_title
          mision_desc
          mision_button {
            text
            link
          }
          slider {
            id
            title
            description
            video {
              url
              name
            }
          }
        }
      }
    }
  `);

  return strapiHome;
};

export default useHomeData;
