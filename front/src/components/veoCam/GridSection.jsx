import React from "react";

const GridSection = () => {
  return (
    <>
      <div className="px-6 md:px-16 lg:px-28 max-w-screen-2xl mx-auto flex flex-col">
        <div className="w-full flex flex-row">
          <div className="w-1/3 bg-red-300"></div>
          <div className="w-1/3 bg-green-300"></div>
          <div className="w-1/3 bg-orange-500"></div>
        </div>
        <div>
          <div className="w-1/5 bg-blue-500"></div>
          <div className="w-3/5 bg-violet-800"></div>
          <div className="w-1/5 bg-yellow-900"></div>
        </div>
      </div>
    </>
  );
};

export default GridSection;
