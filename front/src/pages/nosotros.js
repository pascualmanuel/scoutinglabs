import React from "react";
import Layout from "../components/Layout";
import OurCarousel from "../components/OurCarousel.jsx"
const Becas = () => {
  return (
    <>
      <Layout>
        <div className="nosotros-bg h-[calc(100vh-70px)] max-h-[800px] min-h-[600px] flex flex-col justify-center">
          <div className="mx-6 lm:mx-16 lg:mx-28 max-w-screen-2xl 2xl:mx-auto 2xl:px-28 h-[480px]">
            <h3 className="h1Title uppercase text-left">
              Shaping
              <br /> the Future
            </h3>
            <h3 className=" text-right h1Title mt-6 smallLetter">
              of amateur <br /> sports
            </h3>
          </div>
        </div>
        <div className="m-auto text-grey2 pt-10">
          <p className="mx-6 lm:mx-16 lg:mx-28 max-w-[1020px] 2xl:mx-auto 2xl:px-28 body0">
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
      </Layout>
    </>
  );
};

export default Becas;
