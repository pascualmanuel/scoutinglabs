import React from "react";

const TeamsCarousel = () => {
  const images = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  // Duplicate the array to create an infinite loop effect
  const loopingImages = [...images, ...images];

  return (
    <>
      <div className="slider">
        <div className="slide-track">
          {loopingImages.map((image, index) => (
            <div className="slide " key={index}>
              {/* <img src={image} alt={`Slide ${index + 1}`} /> */}
              <h1 className="h1Title">{image} </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="slider">
        <div className="slide-track-2">
          {loopingImages.map((image, index) => (
            <div className="slide" key={index}>
              {/* <img src={image} alt={`Slide ${index + 1}`} /> */}
              <h1 className="h1Title">{image} </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamsCarousel;
