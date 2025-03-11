import React, { Children } from "react";
import Button from "../Button";
import WhatsAppIcon from "../../assets/icons/WhatsApp.svg";
import WhatsAppDarkIcon from "../../assets/icons/wapp_black.svg";
import { useEffect, useState, useRef } from "react";

import { ParseMarkdown } from "../../hooks/ParseMarkdown";
import WhatsAppPopup from "../contact/WhatsAppPopup";
import { useLocation } from "@reach/router";

import usePagesData from "../../hooks/usePagesData";
import { useLanguage } from "../../hooks/LanguageContext";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const PlanComparation = () => {
  const { subsData, subscriptionPageData } = usePagesData();
  const { locale } = useLanguage();
  const localizedData =
    subsData?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || subsData;
  const dataSubPage =
    subscriptionPageData?.localizations?.find(
      (loc) => loc.locale.toLowerCase() === locale.toLowerCase()
    ) || subscriptionPageData;
  const location = useLocation(); // Obtiene la URL actual

  let subscription = localizedData;

  const [totalPrice, setTotalPrice] = useState(0); // Inicializamos el total a 0
  const [selectedAddons, setSelectedAddons] = useState([]); // Lista de addons seleccionados
  const [selectedPlan, setSelectedPlan] = useState("anual");
  const [thumbPosition, setThumbPosition] = useState({ width: 0, left: 0 });
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [planForWhatsApp, setPlanForWhatsApp] = useState(null);
  // const [selectedPlanType, setSelectedPlanType] = useState("mensual");
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
      plan.addon?.reduce((acc, addon) => {
        const addonKey = `${plan.id}-${addon.id}`;
        if (selectedAddons.includes(addonKey)) {
          // Seleccionamos el precio según el plan actual
          const price =
            selectedPlan === "anual"
              ? addon.annual_price
              : selectedPlan === "mensual"
              ? addon.mensual_price
              : addon.semestral_price;
          return acc + parseFloat(price.replace(/[^0-9.-]+/g, ""));
        }
        return acc;
      }, 0) || 0;

    return basePrice + addonsTotal;
  };

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handleAddonClick = (planId, addonId, addonPrice) => {
    const uniqueAddonKey = `${planId}-${addonId}`;
    console.log(planId, "3");

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
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleWhatsAppClick = (plan) => {
    // Filtramos los addons seleccionados para este plan
    const addonsForPlan =
      plan.addon?.filter((addon) =>
        selectedAddons.includes(`${plan.id}-${addon.id}`)
      ) || [];

    // Creamos un nuevo array con solo el título y el precio correspondiente
    const simplifiedAddons = addonsForPlan.map((addon) => ({
      title: addon.title,
      price:
        selectedPlan === "anual"
          ? addon.annual_price
          : selectedPlan === "mensual"
          ? addon.mensual_price
          : addon.semestral_price,
    }));

    // Calculamos el total usando la función ya definida
    const total = calculatePlanTotal(plan);

    // Armamos el objeto de selección
    const selectedOrder = {
      planId: plan.id,
      planTitle: plan.title,
      paymentMode: selectedPlan, // "anual", "mensual" o "semestral"
      basePrice:
        selectedPlan === "mensual"
          ? plan.mensualPrice
          : selectedPlan === "semestral"
          ? plan.semestralPrice
          : plan.annualPrice,
      addons: simplifiedAddons, // Solo el título y el precio seleccionado
      total,
    };

    // Guardamos en el array (se puede agregar o reemplazar según la lógica que necesites)
    setSelectedOrders((prev) => [...prev, selectedOrder]);

    setAddonsForWhatsApp(simplifiedAddons);
    setPlanForWhatsApp(plan);
    setShowWhatsAppPopup(true);
  };

  const veoCamUrl = "/veo-cam/";

  const isVeoCam = window.location.pathname === veoCamUrl;

  return (
    <>
      {location.pathname !== veoCamUrl && (
        <div className=" text-center text-iBlue px-6 md:px-16 lg:px-28 max-w-screen-2xl mx-auto">
          <h2 className="h1Title pb-10 pt-16 lg:pt-20  ">
            {dataSubPage?.planes_title}
          </h2>
          <p className=" opacity-50 ">
            <ParseMarkdown
              text={
                locale === "EN"
                  ? dataSubPage?.planes_subtitle
                  : dataSubPage?.planes_subtitle?.data?.planes_subtitle
              }
            />
          </p>
        </div>
      )}
      <div className="m-auto pt-12 max-w-[340px] sm:max-w-[400px] md:max-w-[450px]">
        <div
          className={`relative flex ${
            isVeoCam ? "bg-grey0" : "bg-iBlue"
          } rounded-[45px] p-1`}
        >
          <div
            className={`absolute top-1 h-[calc(100%-8px)] ${
              isVeoCam ? "bg-iBlue" : "bg-grey0"
            } rounded-[40px] transition-all duration-300 ease-out shadow-sm`}
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
                  ? isVeoCam
                    ? "text-gray0" // Si es veoCam, usa text-gray0 en lugar de text-black
                    : "text-black"
                  : isVeoCam
                  ? "text-black hover:text-gray-800" // Si es veoCam, invierte los colores de los botones no seleccionados
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
            {subscription.map((item, index) => (
              <div
                key={index}
                className={`relative  flex flex-col items-center  min-h-[650px] w-[300px] mg:w-[275px] xl:w-[290px]  xll:w-[310px] rounded-lg bg-white text-black transition-all duration-300 px-4
                ${item.featuredCard ? "l-gradient-starred text-white" : ""}
                 ${
                   item.featuredCard
                     ? "l-gradient-starred text-white order-1 md:order-4"
                     : `order-4 md:order-${index + 2}`
                 } `}
              >
                {item.featuredCard && (
                  <div className="absolute top-[-25px] z-[1] w-[82%] h-[25px] bg-white rounded-t-lg flex items-center justify-center text-iBlue text-[10px] aeonik">
                    Más popular
                  </div>
                )}
                <div>
                  <div className="flex items-center flex-col justify-evenly h-[230px]">
                    <p
                      className={`group flex items-center justify-between ${
                        item.featuredCard ? "h2Title" : "subH"
                      }`}
                    >
                      {item?.title}
                    </p>
                    <p className="body2 text-center">
                      <ParseMarkdown text={item?.desc?.data?.desc} />
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
                      <ParseMarkdown
                        text={item?.whatInclude?.data?.whatInclude}
                      />
                    </p>
                  </div>
                  <div className="mt-5 select-none">
                    {item.addon?.map((addon) => (
                      <div
                        key={addon.id}
                        onClick={() =>
                          handleAddonClick(item.id, addon.id, addon)
                        }
                        className={`add-on text-xs xll:w-[100%] h-[65px] flex flex-row justify-between rounded-lg mb-2 cursor-pointer
                                ${
                                  item.featuredCard
                                    ? "bg-[#ffffff1a]"
                                    : "bg-[#96979b1a]"
                                }
                                ${
                                  selectedAddons.includes(
                                    `${item.id}-${addon.id}`
                                  )
                                    ? ""
                                    : ""
                                }`}
                      >
                        <div className="flex flex-col justify-around px-2 select-none">
                          <span className="title">{addon?.title}</span>
                          <span
                            className="underline cursor-pointer"
                            data-tooltip-id={`tooltip-${addon?.id}`}
                            data-tooltip-content={addon?.description}
                          >
                            Saber más
                          </span>
                          <Tooltip
                            id={`tooltip-${addon?.id}`}
                            place="top"
                            effect="solid"
                            className="max-w-xs bg-gray-800 text-white  p-2 rounded- z-50  body1"
                          />
                        </div>
                        <div className="flex flex-col justify-around px-2 select-none items-end">
                          <span>
                            + USD{" "}
                            {selectedPlan === "anual"
                              ? addon.annual_price
                              : selectedPlan === "mensual"
                              ? addon.mensual_price
                              : addon.semestral_price}
                            /mes
                          </span>
                          <div
                            className={`w-[17px] h-[17px] border-2 rounded-full flex items-center justify-center transition-all ${
                              selectedAddons.includes(`${item.id}-${addon.id}`)
                                ? item.featuredCard
                                  ? "border-white"
                                  : "border-skyBlue"
                                : ""
                            } ${
                              item.featuredCard
                                ? "border-grey0"
                                : "border-grey1"
                            }`}
                          >
                            <span
                              className={`w-[9px] h-[9px] rounded-full transition-all ${
                                selectedAddons.includes(
                                  `${item.id}-${addon.id}`
                                )
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
                </div>
                <div
                  className="my-5  h-full flex items-end"
                  onClick={() => handleWhatsAppClick(item)}
                >
                  <div
                    className={`flex justify-center border items-center p-4 gap-[10px] w-[262px] mg:w-[248px] xll:w-[262px] rounded-lg ${
                      item.featuredCard
                        ? "bg-transparent text-white border border-white"
                        : "bg-[#ffff] text-black border border-black"
                    }`}
                  >
                    <div className="flex flex-row items-center px-2">
                      <img
                        src={
                          item.featuredCard ? WhatsAppIcon : WhatsAppDarkIcon
                        }
                        alt="whattsapp"
                        className="w-6 h-6"
                      />
                      <p className="buttonText ml-4 capitalize">
                        Seleccionar {item?.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {showWhatsAppPopup && planForWhatsApp && (
              <WhatsAppPopup
                plan={planForWhatsApp}
                addons={addonsForWhatsApp}
                selectedPlanType={selectedPlan}
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
