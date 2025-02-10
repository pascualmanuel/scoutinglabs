import React, { useState, useRef, useEffect } from "react";
// import "./FAQ.css"; // Add your styles here
import ToggleBar from "../Togglebar";
const FAQItem = ({ number, title, answer, mediaSrc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const answerRef = useRef(null); // Reference to the answer div
  useEffect(() => {
    document.title = "Scouting Labs - Ayuda";
  }, []);
  return (
    <>
      <div className="faq-item select-none " onClick={() => setIsOpen(!isOpen)}>
        <div className="faq-header mb-[-20px]  ">
          <div className="faq-left">
            {/* <div className="faq-number subH">{number}</div> */}
            <div className="faq-title subH w-[220px] sm:w-auto">{title}</div>
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
          <div className="faq-answer-content  flex justify-between">
            <p className="body2 text-grey2 w-[500px] mt-11">{answer}</p>
            <div>
              <img className="mr-[100px] mt-" src={mediaSrc} />
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
          "http://localhost:1337/api/faqs?populate=*"
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

  console.log(selectedOption);
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
