import React from "react";

const GridSection = () => {
  return (
    <>
      <div className="px-6 md:px-16 lg:px-28 max-w-screen-2xl mx-auto flex flex-col">
        <div className="w-full flex flex-row h-[440px] gap-5">
          <div className="w-1/3 rounded-[20px] bg-red-300"></div>
          <div className="w-1/3 rounded-[20px] bg-green-300"></div>
          <div className="w-1/3 rounded-[20px] bg-orange-500"></div>
        </div>
        <div className="w-full flex flex-row h-[440px] gap-5 mt-5">
          <div className="w-[25%] rounded-[20px] bg-blue-500"></div>
          <div className="w-3/5 rounded-[20px] bg-violet-800"></div>
          <div className="w-[25%] rounded-[20px] bg-yellow-900"></div>
        </div>
      </div>
    </>
  );
};

export default GridSection;
