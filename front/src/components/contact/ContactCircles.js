import React from "react";
import Pablo from "../../assets/nosotros/pablo-img.webp";
import Pato from "../../assets/nosotros/pato-img.webp";
import Peter from "../../assets/nosotros/peter-img.webp";
import Ro from "../../assets/nosotros/ro-img.webp";
import Juan from "../../assets/nosotros/juan-img.webp";
const ContactCircles = () => {
  const items = [
    {
      name: "Pedro Martinez",
      position: "co founder",
      img: Peter,
    },
    {
      name: "Rodrigo Etchart",
      position: "co founder",
      img: Ro,
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

  return (
    <>
      <div className="flex flex-row ml-2 mt-4 mb-8 ">
        {items?.map((item) => (
          <div className="w-[55px] h-[55px] border-grey4 border rounded-full ml-[-6px]">
            <img
              src={item.img}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactCircles;
