import React, { useState, useRef, useEffect } from "react";
// import "./FAQ.css"; // Add your styles here
import ToggleBar from "../Togglebar";
const FAQItem = ({ number, title, answer, mediaSrc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const answerRef = useRef(null); // Reference to the answer div
  useEffect(() => {
    document.title = "Scouting Labs - Ayuda";
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return "";

    // YouTube - formato largo: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // YouTube - formato corto: https://youtu.be/VIDEO_ID
    if (url.includes("youtu.be/")) {
      const parts = url.split("/");
      const videoId = parts[parts.length - 1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Vimeo: https://vimeo.com/VIDEO_ID
    if (url.includes("vimeo.com/")) {
      const parts = url.split("/");
      const videoId = parts[parts.length - 1];
      return `https://player.vimeo.com/video/${videoId}`;
    }

    // Si el link no es de YouTube ni Vimeo, se devuelve tal cual
    return url;
  };

  // console.log(answerRef.current.scrollHeight + 50);

  return (
    <>
      {/* mb-[80px] md:mb-[180px]  mt-14 md:mt-[100px] */}
      <div
        className="faq-item select-none p-6 xll:pb-10 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="faq-header xll:!mb-[-20px]  ">
          <div className="faq-left">
            {/* <div className="faq-number subH">{number}</div> */}
            <div className="faq-title subH w-[260px] sm:w-auto lg:max-w-[400px] mg:max-w-[500px]">
              {title}
            </div>
          </div>
          <div className="faq-right">
            <div
              style={{
                transform: isOpen ? `rotate(45deg)` : "",
                transition: "transform 0.3s ease",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 1V15" stroke="#F6F6F6" strokeWidth="2" />
                <path d="M15 8H0.999999" stroke="#F6F6F6" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        <div
          ref={answerRef}
          className="faq-answer"
          style={{
            maxHeight: isOpen ? `${answerRef.current.scrollHeight}px` : "0px",
          }}
        >
          <div className="faq-answer-content flex flex-col  justify-between lg:flex-row">
            <p className="body2 text-grey2 lg:max-w-[400px] mg:max-w-[420px] mt-11 mb-8">
              {answer}
            </p>
            <div>
              {mediaSrc && mediaSrc.trim() !== "" && (
                <div
                  className=" w-[100%] h-[auto] max-w-[415px] ssm:h-[235px] m-auto 
                lg:mr-[160px] xl:mr-10 xl:w-[415px] xl:h-[235px] "
                >
                  <iframe
                    src={getEmbedUrl(mediaSrc)}
                    frameBorder="0"
                    allow=""
                    allowFullScreen
                    className="object-fit w-full h-full rounded-lg"
                    title={`Video: ${title}`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);

  const [selectedOption, setSelectedOption] = useState("VeoCam3");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/faqs?populate=*`
        ); // Reemplaza con tu URL real
        const json = await response.json();
        // Se asume que la respuesta tiene una propiedad "data" que contiene el array de FAQs
        setFaqs(json.data);
      } catch (error) {
        console.error("Error al obtener los FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  // Filtramos los FAQs según la categoría seleccionada
  const filteredFaqs = faqs.filter((faq) => faq.category === selectedOption);

  // console.log(selectedOption);
  console.log(filteredFaqs);
  //
  return (
    <div className="faq-page max-w-[1360px] m-auto">
      <div className="flex justify-center my-24">
        <ToggleBar
          options={[
            { label: "VeoCam3", value: "VeoCam3" },
            { label: "Plataforma", value: "Plataforma" },
            { label: "Suscripciones", value: "Suscripciones" },
          ]}
          value={selectedOption}
          onChange={(value) => setSelectedOption(value)}
          containerClassName="bg-[#373737] p-1 w-[380px]"
          buttonClassName="py-2 px-4 text-sm"
          activeButtonClassName="text-black"
          thumbClassName="bg-white"
        />
      </div>

      {loading ? (
        <p>Cargando FAQs...</p>
      ) : (
        filteredFaqs.map((faq) => (
          <FAQItem
            key={faq.id}
            title={faq.title}
            answer={faq.description}
            mediaSrc={faq.link} // Aquí usamos el campo "link" para mostrar la imagen o el medio
          />
        ))
      )}
    </div>
  );
};

export default FAQPage;
