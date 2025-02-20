import React from "react";
import { graphql } from "gatsby";
import { useStaticQuery } from "gatsby";
const TeamsCarousel = () => {
  const { strapiHome } = useStaticQuery(graphql`
    query {
      strapiHome {
        logos {
          url
        }
      }
    }
  `);

  console.log(strapiHome.logos);
  // Split original array into two halves
  const midPoint = Math.ceil(strapiHome.logos.length / 2);
  const firstHalfOriginal = strapiHome.logos.slice(0, midPoint);
  const secondHalfOriginal = strapiHome.logos.slice(midPoint);

  // Duplicate each half separately
  const loopingFirst = [...firstHalfOriginal, ...firstHalfOriginal];
  const loopingSecond = [...secondHalfOriginal, ...secondHalfOriginal];

  return (
    <>
      <div className="!overflow-hidden">
        {/* Top Slider */}
        <div className="slider w-[100vw] llg:w-[960px]">
          <div className="slide-track">
            {loopingFirst.map((image, index) => (
              <div className="slide" key={`top-${index}`}>
                <img src={`${process.env.REACT_APP_API_URL}/${image.url}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Slider */}
        <div className="slider w-[100vw] llg:w-[960px]">
          <div className="slide-track-2">
            {loopingSecond.map((image, index) => (
              <div className="slide" key={`bottom-${index}`}>
                <img src={`${process.env.REACT_APP_API_URL}/${image.url}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamsCarousel;
