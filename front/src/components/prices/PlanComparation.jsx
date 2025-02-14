import React from "react";
import Button from "../Button";
import WhatsAppIcon from "../../assets/icons/WhatsApp.svg";
import WhatsAppDarkIcon from "../../assets/icons/wapp_black.svg";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ParseMarkdown } from "../../hooks/ParseMarkdown";
import WhatsAppPopup from "../contact/WhatsAppPopup";
const PlanComparation = () => {
  const [suscriptions, setSuscriptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Inicializamos el total a 0
  const [selectedAddons, setSelectedAddons] = useState([]); // Lista de addons seleccionados
  const [selectedPlan, setSelectedPlan] = useState("anual");
  const [thumbPosition, setThumbPosition] = useState({ width: 0, left: 0 });
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [planForWhatsApp, setPlanForWhatsApp] = useState(null);
  const [selectedPlanType, setSelectedPlanType] = useState("mensual");
  const [addonsForWhatsApp, setAddonsForWhatsApp] = useState(null);

  const whatsappWindowRef = useRef(null); // Ref para la ventana de WhatsApp

  const buttonsRef = useRef([]);
  // Obtener posición del botón activo
  useEffect(() => {
    const index = ["mensual", "semestral", "anual"].indexOf(selectedPlan);
    const button = buttonsRef.current[index];

    if (button) {
      setThumbPosition({
        width: button.offsetWidth,
        left: button.offsetLeft,
      });
    }
  }, [selectedPlan]);

  const calculatePlanTotal = (plan) => {
    const basePrice = parseFloat(
      selectedPlan === "mensual"
        ? plan.mensualPrice
        : selectedPlan === "semestral"
        ? plan.semestralPrice
        : plan.annualPrice
    );

    const addonsTotal =
      plan.plan_addons?.reduce((acc, addon) => {
        const addonKey = `${plan.id}-${addon.id}`;
        return selectedAddons.includes(addonKey)
          ? acc + parseFloat(addon.addonPrice.replace(/[^0-9.-]+/g, ""))
          : acc;
      }, 0) || 0;

    return basePrice + addonsTotal;
  };

  // Función para obtener datos de Strapi
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/subscription-plans?populate=*`)
      .then((response) => {
        setSuscriptions(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching subscription plans:", error);
      });
  }, []);

  // Función para manejar el cambio del tipo de suscripción (Mensual, Semestral, Anual)
  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handleAddonClick = (planId, addonId, addonPrice) => {
    const uniqueAddonKey = `${planId}-${addonId}`;

    setSelectedAddons((prev) =>
      prev.includes(uniqueAddonKey)
        ? prev.filter((key) => key !== uniqueAddonKey)
        : [...prev, uniqueAddonKey]
    );
  };

  useEffect(() => {
    // console.log("Addons seleccionados:", selectedAddons);
    // console.log("Total actual:", totalPrice);
  }, [selectedAddons, totalPrice]);

  // const handleWhatsAppClick = (plan) => {
  //   // 1. Obtener addons seleccionados para ESTE plan específico
  //   // console.log(plan, "plan");
  //   const addonsForPlan =
  //     plan.plan_addons?.filter((addon) =>
  //       selectedAddons.includes(`${plan.id}-${addon.id}`)
  //     ) || [];

  //   // 2. Mapear periodicidad a formato legible
  //   const periodicidadMap = {
  //     anual: "Anual",
  //     semestral: "Semestral",
  //     mensual: "Mensual",
  //   };

  //   // 3. Construir mensaje
  //   const mensaje = `Hola, quiero suscribirme al plan *${plan?.title} (${
  //     periodicidadMap[selectedPlan]
  //   })* por USD *${calculatePlanTotal(plan).toFixed(
  //     2
  //   )}/mes*.\n\nAddons incluidos: ${
  //     addonsForPlan.length > 0
  //       ? addonsForPlan.map((a) => a.addonName + a.addonPrice).join(", ")
  //       : "Ninguno"
  //   }`;

  //   // 4. Codificar y abrir enlace
  //   const url = `https://wa.me/5491151632960?text=${encodeURIComponent(
  //     mensaje
  //   )}`;
  //   window.open(url, "_blank");
  // };
  const handleWhatsAppClick = (plan) => {
    const addonsForPlan =
      plan.plan_addons?.filter((addon) =>
        selectedAddons.includes(`${plan.id}-${addon.id}`)
      ) || [];

    setAddonsForWhatsApp(addonsForPlan);
    setPlanForWhatsApp(plan);
    setShowWhatsAppPopup(true);
  };

  const sortedSubscriptions = [...suscriptions].sort((a, b) => {
    if (a.featuredCard) return -1; // Featured comes first
    if (b.featuredCard) return 1;
    return 0; // Keep other cards in original order
  });

  return (
    <>
      <div className=" text-center text-iBlue px-6 md:px-16 lg:px-28 max-w-screen-2xl mx-auto">
        <h2 className="h1Title pb-10 pt-16 lg:pt-20  ">
          Planes de suscripción
        </h2>
        <p className=" opacity-50 ">
          Todas las cámaras necesitan de una suscripción para su funcionamiento,
          y cada suscripción aplica solamente para una cámara.
        </p>
        <p className="  opacity-50 ">
          Renueva tu suscripción cada 1, 6 o 12 meses para mantener la cámara
          activa.
        </p>
      </div>

      <div className="m-auto pt-12 max-w-[340px] sm:max-w-[400px] md:max-w-[450px]">
        <div className="relative flex bg-iBlue rounded-[45px] p-1">
          <div
            className="absolute top-1 h-[calc(100%-8px)] bg-grey0 rounded-[40px] transition-all duration-300 ease-out shadow-sm"
            style={{
              width: `${thumbPosition.width}px`,
              left: `${thumbPosition.left}px`,
            }}
          />

          {["mensual", "semestral", "anual"].map((plan, index) => (
            <button
              key={plan}
              ref={(el) => (buttonsRef.current[index] = el)}
              onClick={() => setSelectedPlan(plan)}
              className={`relative flex-1 py-2 px-4 rounded-[40px] text-sm z-10 transition-colors duration-300 ${
                selectedPlan === plan
                  ? "text-black"
                  : "text-gray0 hover:text-gray-200"
              }`}
            >
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-[80px] md:pb-[180px] md:max-w-[1536px]  mt-14 md:mt-[75px] m-auto">
        <div className="overflow-x-auto  relative">
          <div className="mt-10 flex flex-row  justify-evenly max-w-screen-2xl m-auto w-fit mg:w-[auto] px-6 mg:px-0 gap-4 mg:gap-0">
            {sortedSubscriptions.map((item, index) => (
              <div
                key={index}
                className={`relative box-sc flex flex-col items-center  h-[600px] w-[300px] mg:w-[275px] xl:w-[290px]  xll:w-[310px] rounded-lg bg-white text-black transition-all duration-300 px-4
                ${item.featuredCard ? "l-gradient-starred text-white" : ""}
                 ${
                   item.featuredCard
                     ? "l-gradient-starred text-white order-0 md:order-2"
                     : `order-${index + 2}`
                 } `}
              >
                {item.featuredCard && (
                  <div className="absolute top-[-25px] z-[1] w-[82%] h-[25px] bg-white rounded-t-lg flex items-center justify-center text-iBlue text-[10px] aeonik">
                    Más popular
                  </div>
                )}
                <div className="flex items-center flex-col justify-evenly h-[230px]">
                  <p
                    className={`group flex items-center justify-between ${
                      item.featuredCard ? "h2Title" : "subH"
                    }`}
                  >
                    {item?.title}
                  </p>
                  <p className="body2 text-center">
                    <ParseMarkdown text={item?.desc} />
                  </p>

                  <p className="aeonik font-thin text-base">
                    desde USD&nbsp;
                    <span className="font-bold text-[45px]">
                      {calculatePlanTotal(item).toFixed()}
                    </span>
                    &nbsp;/mes
                  </p>
                </div>
                <div className="w-full px-4">
                  <span className="pb-2 text-sm aeonik font-bold">
                    Incluye:
                  </span>
                  <p className="text-xs">
                    <ParseMarkdown text={item?.whatInclude} />
                  </p>
                </div>
                <div className="mt-5 select-none">
                  {item.plan_addons?.map((addon) => (
                    <div
                      key={addon.id}
                      onClick={() =>
                        handleAddonClick(item.id, addon.id, addon.addonPrice)
                      } // item.id es el ID del plan padre
                      className={`add-on text-xs w-[262px] mg:w-[248px] xll:w-[262px]  h-[65px] flex flex-row justify-between  rounded-lg mb-2 cursor-pointer
                      ${item.featuredCard ? "bg-[#ffffff1a]" : "bg-[#96979b1a]"}
                      ${
                        selectedAddons.includes(`${item.id}-${addon.id}`)
                          ? ""
                          : ""
                      }
                    `}
                    >
                      <div className="flex flex-col justify-around px-2 select-none">
                        <span className="title">{addon.addonName}</span>
                      </div>
                      <div className="flex flex-col justify-around px-2 select-none items-end">
                        <span>{addon.addonPrice}</span>
                        <div
                          className={`w-[17px] h-[17px] border-2  rounded-full flex items-center justify-center transition-all ${
                            selectedAddons.includes(`${item.id}-${addon.id}`)
                              ? item.featuredCard
                                ? "border-white"
                                : "border-skyBlue"
                              : ""
                          } 
                               ${
                                 item.featuredCard
                                   ? "border-grey0"
                                   : "border-grey1"
                               }`}
                        >
                          <span
                            className={`w-[9px] h-[9px] rounded-full transition-all ${
                              selectedAddons.includes(`${item.id}-${addon.id}`)
                                ? item.featuredCard
                                  ? "bg-white"
                                  : "bg-skyBlue"
                                : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="my-5"
                  onClick={() => handleWhatsAppClick(item)} // <-- Agrega esta línea
                >
                  <Button
                    border={
                      item.featuredCard
                        ? "solid 1px white"
                        : "solid 1px #434652"
                    }
                    textColor={item.featuredCard ? "white" : "black"}
                    bg={item.featuredCard ? "transparent" : "white"}
                    text={
                      <>
                        <div className="flex flex-row items-center px-2">
                          <img
                            src={
                              item.featuredCard
                                ? WhatsAppIcon
                                : WhatsAppDarkIcon
                            }
                            alt="whattsapp"
                            className="w-6 h-6"
                          />
                          <p className="buttonText ml-4 capitalize">
                            Seleccionar {item?.title}
                          </p>
                        </div>
                      </>
                    }
                    width={"w-[262px] mg:w-[248px] xll:w-[262px]"}
                    height={""}
                  />
                </div>
              </div>
            ))}

            {showWhatsAppPopup && planForWhatsApp && (
              <WhatsAppPopup
                plan={planForWhatsApp}
                addons={addonsForWhatsApp}
                selectedPlanType={selectedPlanType}
                onClose={() => setShowWhatsAppPopup(false)}
                whatsappWindowRef={whatsappWindowRef} // Pasamos el ref al popup
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanComparation;
