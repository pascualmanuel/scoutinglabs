import React from "react";
import Team1 from "../assets/teams/Logos/team-1.png";
import Team2 from "../assets/teams/Logos/team-2.png";
// import Team3 from "../assets/teams/Logos/team-3.jpg";
import Team4 from "../assets/teams/Logos/team-4.png";
import Team5 from "../assets/teams/Logos/team-5.png";
import Team6 from "../assets/teams/Logos/team-6.png";
import Team7 from "../assets/teams/Logos/team-7.png";
import Team8 from "../assets/teams/Logos/team-8.png";
import Team9 from "../assets/teams/Logos/team-9.png";
import Team10 from "../assets/teams/Logos/team-10.png";
import Team12 from "../assets/teams/Logos/team-12.png";
import Team13 from "../assets/teams/Logos/team-13.png";
import Team14 from "../assets/teams/Logos/team-14.png";
import Team15 from "../assets/teams/Logos/team-15.png";
import Team16 from "../assets/teams/Logos/team-16.png";
import Team17 from "../assets/teams/Logos/team-17.png";
import Team18 from "../assets/teams/Logos/team-18.png";
import Team19 from "../assets/teams/Logos/team-19.png";
import Team20 from "../assets/teams/Logos/team-20.png";
import Team21 from "../assets/teams/Logos/team-21.png";
import Team22 from "../assets/teams/Logos/team-22.png";
import Team23 from "../assets/teams/Logos/team-23.png";
import Team24 from "../assets/teams/Logos/team-24.png";
// import Team25 from "../assets/teams/Logos/team-25.png";
import Team26 from "../assets/teams/Logos/team-26.png";
import Team27 from "../assets/teams/Logos/team-27.png";
import Team28 from "../assets/teams/Logos/team-28.png";
import Team29 from "../assets/teams/Logos/team-29.png";
import Team30 from "../assets/teams/Logos/team-30.png";
import Team31 from "../assets/teams/Logos/team-31.png";
import Team32 from "../assets/teams/Logos/team-32.png";
import Team33 from "../assets/teams/Logos/team-33.png";
import Team34 from "../assets/teams/Logos/team-34.png";
import Team35 from "../assets/teams/Logos/team-35.png";

const TeamsCarousel = () => {
  const images = [
    Team1,
    Team2,
    /* Team3, */ Team4,
    Team5,
    Team6,
    Team7,
    Team8,
    Team9,
    Team10,
    Team12,
    Team13,
    Team14,
    Team15,
    Team16,
    Team17,
    Team18,
    Team19,
    Team20,
    Team21,
    Team22,
    Team23,
    Team24,
    /* Team25, */ Team26,
    Team27,
    Team28,
    Team29,
    Team30,
    Team31,
    Team32,
    Team33,
    Team34,
    Team35,
  ];

  // Split original array into two halves
  const midPoint = Math.ceil(images.length / 2);
  const firstHalfOriginal = images.slice(0, midPoint);
  const secondHalfOriginal = images.slice(midPoint);

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
                <img src={image} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Slider */}
        <div className="slider w-[100vw] llg:w-[960px]">
          <div className="slide-track-2">
            {loopingSecond.map((image, index) => (
              <div className="slide" key={`bottom-${index}`}>
                <img src={image} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamsCarousel;
