import React from "react";
import Layout from "../components/Layout";
import OurCarousel from "../components/nosotros/OurCarousel.jsx";
import WhereWeAre from "../components/nosotros/WhereWeAre.jsx";
const Nosotros = () => {
  return (
    <>
      <Layout>
        <div className="nosotros-bg h-[calc(100vh-70px)] max-h-[620px] sm:max-h-[800px] min-h-[600px] flex flex-col sm:justify-center">
          <div className="mx-6 lm:mx-16 lg:mx-28 max-w-screen-2xl 2xl:mx-auto 2xl:px-28 h-[480px] 2xl:w-full">
            <h3 className="h1Title uppercase text-left mt-[70px]">
              Shaping
              <br /> the Future
            </h3>
            <h3 className=" text-right h1Title  mt-[200px] md:mt-32">
              of amateur <br /> sports
            </h3>
          </div>
        </div>
        <div className="m-auto text-grey2 pt-10">
          <p className="mx-6 lm:mx-16 lg:mx-28 max-w-[1020px] 2xl:mx-auto  body0">
            At Scouting Labs, we’re on a mission to revolutionize amateur sports
            through cutting-edge AI technology. We provide athletes and coaches
            with the tools they need to track performance, identify talent, and
            unlock new opportunities for growth.
            <br />
            <br />
            Founded with the belief that every athlete deserves the chance to
            succeed, we combine the power of data with passion for sports.
            Today, Scouting Labs serves thousands of athletes and teams
            globally, empowering them to dream big, improve their game, and
            achieve their full potential.
          </p>
        </div>
        <OurCarousel />
        <WhereWeAre />
      </Layout>
    </>
  );
};

export default Nosotros;
