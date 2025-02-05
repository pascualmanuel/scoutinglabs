import React from "react";
import Button from "../Button";
import WhatsAppIcon from "../../assets/icons/WhatsApp.svg";
import WhatsAppDarkIcon from "../../assets/icons/wapp_black.svg";
import { useEffect, useState } from "react";
import axios from "axios";
const PlanComparation = () => {
  // const suscriptions = [
  //   {
  //     title: "Starter",
  //     desc: "Ideal para padres y jugadores amateur comprometidos a potenciar su nivel.",
  //     price: "$20",
  //     cta: "Seleccionar Starter",
  //     starred: false,
  //   },
  //   {
  //     title: "Team",
  //     desc: "Diseñado para coaches, equipos de amigos, y ligas amateur.",
  //     price: "$59",
  //     cta: "Seleccionar Team",
  //     starred: true,
  //   },
  //   {
  //     title: "Club",
  //     desc: "Enfocado en clubes de nivel profesional que buscan mejorar el rendimiento de su equipo.",
  //     price: "$90",
  //     cta: "Seleccionar Club",
  //     starred: false,
  //   },
  //   {
  //     title: "Club",
  //     desc: "Enfocado en clubes de nivel profesional que buscan mejorar el rendimiento de su equipo.",
  //     price: "$90",
  //     cta: "Seleccionar Club",
  //     starred: false,
  //   },
  // ];

  const [suscriptions, setSuscriptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("anual"); // Estado para gestionar el toggle de suscripción
  const [totalPrice, setTotalPrice] = useState(0); // Inicializamos el total a 0
  const [selectedAddons, setSelectedAddons] = useState([]); // Lista de addons seleccionados

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
      .get("http://localhost:1337/api/subscription-plans?populate=*") // Ajusta la URL según tu configuración de Strapi
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
    console.log("Addons seleccionados:", selectedAddons);
    console.log("Total actual:", totalPrice);
  }, [selectedAddons, totalPrice]);

  console.log(totalPrice);
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

      <div className="mt-5">
        <label htmlFor="subscription-plan">
          Selecciona el tipo de suscripción:
        </label>
        <select
          id="subscription-plan"
          value={selectedPlan}
          onChange={handlePlanChange}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="mensual">Mensual</option>
          <option value="semestral">Semestral</option>
          <option value="anual">Anual</option>
        </select>
      </div>

      <div className="mb-[80px] md:mb-[180px] md:max-w-[1536px] md:mx-6 lm:mx-16 xl:mx-28 2xl:mx-auto 2xl:px-28 mt-14 md:mt-[100px]">
        <div className="overflow-x-auto md:overflow-visible relative">
          <div className="mt-10 flex flex-row gap-4 llg:gap-6 justify-between max-w-screen-2xl m-auto w-fit md:w-[auto] px-6 md:px-0">
            {suscriptions.map((item, index) => (
              <div
                key={index}
                className={`relative box-sc flex flex-col items-center justify-evenly w-[310px] sm:w-[40vw] h-[283px] md:w-[250px] md:h-[600px] lg:w-[310px] rounded-lg bg-white text-black transition-all duration-300 px-4
                ${item.featuredCard ? "l-gradient-starred text-white" : ""}
                ${
                  item.featuredCard
                    ? "order-1 md:order-2"
                    : "order-2 md:order-2"
                } `}
              >
                {item.featuredCard && (
                  <div className="absolute top-[-25px] z-[1] w-[82%] h-[25px] bg-white rounded-t-lg flex items-center justify-center text-iBlue text-[10px] aeonik">
                    Más popular
                  </div>
                )}
                <div className="flex items-center flex-col justify-between">
                  <p
                    className={`group flex items-center justify-between ${
                      item.featuredCard ? "h2Title" : "subH"
                    }`}
                  >
                    {item?.title}
                  </p>
                  <p className="body2 text-center">{item?.desc}</p>
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
                  <p className="text-xs">{item?.whatInclude}</p>
                </div>
                <div className="">
                  {item.plan_addons?.map((addon) => (
                    <div
                      key={addon.id}
                      onClick={() =>
                        handleAddonClick(item.id, addon.id, addon.addonPrice)
                      } // item.id es el ID del plan padre
                      className={`add-on text-xs w-[262px] h-[65px] flex flex-row justify-between  rounded-lg mb-2 cursor-pointer
                      ${item.featuredCard ? "bg-[#ffffff1a]" : "bg-[#96979b1a]"}
                      ${
                        selectedAddons.includes(`${item.id}-${addon.id}`)
                          ? "bg-gray-300"
                          : ""
                      }
                    `}
                    >
                      <div className="flex flex-col justify-around px-2">
                        <span className="title">{addon.addonName}</span>
                      </div>
                      <div className="flex flex-col justify-around px-2">
                        <span>{addon.addonPrice}</span>
                        <span> Radiocheck</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  border={
                    item.featuredCard ? "solid 1px white" : "solid 1px #434652"
                  }
                  textColor={item.featuredCard ? "white" : "black"}
                  bg={item.featuredCard ? "transparent" : "white"}
                  text={
                    <>
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
                    </>
                  }
                  width={"w-[262px]"}
                  height={""}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="mb-[80px] md:mb-[180px] md:max-w-[1536px]  md:mx-6 lm:mx-16 xl:mx-28 2xl:mx-auto 2xl:px-28 mt-14 md:mt-[100px] ">
        <div className="overflow-x-auto md:overflow-visible relative ">
          <div
            className="mt-10  flex flex-row gap-4 llg:gap-6 justify-between 
            max-w-screen-2xl m-auto w-fit md:w-[auto] px-6 md:px-0"
          >
            {suscriptions.map((item, index) => (
              <div
                key={index}
                className={`relative box-sc flex flex-col items-center justify-evenly w-[310px] sm:w-[40vw] h-[283px]  md:w-[250px] md:h-[600px] lg:w-[310px] 
               rounded-lg bg-white text-black transition-all duration-300  px-4
              ${item.starred ? "l-gradient-starred text-white" : ""}
              ${item.starred ? "order-1 md:order-2" : "order-2 md:order-2"} 
        `}
              >
                {item.starred && (
                  <div className=" absolute top-[-25px] z-[1]  w-[82%] h-[25px] bg-white rounded-t-lg flex items-center justify-center text-iBlue text-[10px] aeonik">
                    Más popular
                  </div>
                )}

                <a
                  href="#"
                  className={` group flex items-center justify-between ${
                    item.starred ? "h2Title" : "subH"
                  }`}
                >
                  {item?.title}
                </a>
                <p className="body2  text-center">{item?.desc}</p>
                <p className="aeonik font-thin text-base">
                  desde&nbsp;
                  <span className="font-bold text-3xl">{item?.price}</span>
                  &nbsp;/mes
                </p>
                <div className="w-full px-4">
                  <span className="pb-2 text-sm"> Incluye:</span>
                  <p className="text-xs">
                    •5 carpetas de guardado <br />
                    •200 horas de grabación al mes
                  </p>
                </div>
                <div className="add-on text-xs w-[262px] h-[65px] flex flex-row justify-between bg-[#ffffff1a] rounded-lg">
                  <div className="flex flex-col justify-around px-2">
                    <span className="title">Veo Live</span>
                    <span className="description">Lorem ipmsum dolor</span>
                  </div>
                  <div className="flex flex-col justify-around px-2">
                    <span>price</span>
                    <span> Radiocheck</span>
                  </div>
                </div>

                <Button
                  border={
                    item.starred ? "solid 1px white" : "solid 1px #434652"
                  }
                  textColor={item.starred ? "white" : "black"}
                  bg={item.starred ? "transparent" : "white"}
                  text={
                    <>
                      <div className="flex flex-row items-center px-2">
                        <img
                          src={WhatsAppIcon}
                          alt="whattsapp"
                          className="w-6 h-6"
                        />
                        <p className="buttonText ml-4">{item?.cta}</p>
                      </div>
                    </>
                  }
                  width={"w-[262px]"}
                  height={""}
                />
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PlanComparation;
