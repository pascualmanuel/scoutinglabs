import React from "react";
import Pablo from "../../assets/nosotros/pablo-img.webp";
import Pato from "../../assets/nosotros/pato-img.webp";
import Peter from "../../assets/nosotros/peter-img.webp";
import Ro from "../../assets/nosotros/ro-img.webp";
import Juan from "../../assets/nosotros/juan-img.webp";
const OurCarousel = () => {
  const items = [
    {
      name: "Pablo Matera",
      position: "Brand Ambassador",
      img: Pablo,
    },
    {
      name: "Rodrigo Etchart",
      position: "co founder",
      img: Ro,
    },
    {
      name: "Pedro Martinez",
      position: "co founder",
      img: Peter,
    },
    {
      name: "Patricio Rolon",
      position: "co founder",
      img: Pato,
    },
    {
      name: "jUAN REY",
      position: "co founder",
      img: Juan,
    },
  ];
  // display: flex
  // ;
  //     flex-wrap: wrap;
  //     max-width: 960px;
  //     gap: 20px;
  //     justify-content: center;
  return (
    <>
      <div>
        <div className="flex flex-wrap justify-center max-w-[960px] gap-5 m-auto pt-40">
          {items?.map((item) => (
            <div key={item.name} className="w-[305px] h-[405px] mt-16">
              <img
                src={item.img}
                className="w-full h-[305px] rounded-lg object-cover"
              />
              <p className="subH2 text-grey4 mt-10 mb-1">{item.position}</p>
              <h4 className="subH">{item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurCarousel;
