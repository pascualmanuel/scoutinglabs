import React from "react";

const WhereWeAre = () => {
  const items = [
    {
      country: "Argentina",
      countryCode: "ar",
    },
    {
      country: "uruguay",
      position: "co founder",
      countryCode: "uy",
    },
    {
      country: "Colombia",
      countryCode: "co",
    },
    {
      country: "Chile",
      countryCode: "cl",
    },
    {
      country: "Ecuador",
      countryCode: "ec",
    },
    {
      country: "Perú",
      countryCode: "pe",
    },
    {
      country: "Bolivia",
      countryCode: "bo",
    },
    {
      country: "Venezuela",
      countryCode: "ve",
    },
    {
      country: "México",
      countryCode: "mx",
    },
    {
      country: "USA",
      countryCode: "us",
    },
    {
      country: "España",
      countryCode: "es",
    },
    {
      country: "Chipre",
      countryCode: "cy",
    },
    {
      country: "Australia",
      countryCode: "au",
    },
    {
      country: "Japon",
      countryCode: "jp",
    },
  ];

  return (
    <>
      <div>
        <h3 className="pb-10 pt-40 h1Title text-center w-full">
          estamos en <span className="text-skyBlue"> + 13 paises</span>
        </h3>

        {/* <img src="https://flagcdn.com/ar.svg" width="30" alt="Ukraine" /> */}
      </div>
      <div className="flex flex-row flex-wrap gap-4 max-w-[630px] lm:max-w-[900px] m-auto justify-center px-4">
        {items?.map((item) => (
          <div
            key={item.name}
            className="w-[95px] h-[85px] rounded-lg bg-[#eaeaea1a] p-4"
          >
            <div className="w-[25px] h-[25px]  rounded-full ">
              <img
                src={`https://flagcdn.com/${item.countryCode}.svg`}
                className="w-full h-full object-cover rounded-full"
                alt="Ukraine"
              />
            </div>
            <p className="body2 mt-3"> {item.country}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WhereWeAre;
