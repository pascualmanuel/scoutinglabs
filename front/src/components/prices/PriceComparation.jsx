import React from "react";
// import { CheckCircle } from "lucide-react";
import Tick from "../../assets/icons/tick.svg";
import Cross from "../../assets/icons/cross.svg";
const plans = [
  {
    name: "Starter",
    price: "$20",
    categories: {
      Equipos: "1 equipo por cámara",
      Usuarios: "30 usuarios por cámara",
      Almacenamiento: "12 meses",
      "Horas de grabación": "40 horas por cámara",
    },
    features: [
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
    ],
    extras: [
      "Disponible como complemento",
      "Disponible como complemento",
      "Disponible como complemento",
      "Puede",
    ],
  },
  {
    name: "Team",
    price: "$39",
    categories: {
      Equipos: "5 equipos por cámara",
      Usuarios: "150 usuarios por cámara",
      Almacenamiento: "12 meses",
      "Horas de grabación": "Sin límite",
      "Horas de soporte": "10 horas",
    },
    features: [
      false,
      true,
      false,
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
    extras: [
      "Disponible como complemento",
      "Disponible como complemento",
      "Disponible como complemento",
      "haber",
    ],
  },
  {
    name: "Club",
    price: "$59",
    categories: {
      Equipos: "20 equipos por cámara",
      Usuarios: "600 usuarios por cámara",
      Almacenamiento: "12 meses",
      "Horas de grabación": "Sin límite",
      "Horas de soporte": "24 horas",
    },
    features: [
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
    ],
    extras: [
      "Disponible como complemento",
      "Disponible como complemento",
      "Disponible como complemento",
      "Diferentes",
    ],
  },
];

const featuresList = [
  "Vista de cámara de seguimiento",
  "Vista interactiva",
  "Vista panorámica",
  "Crea clips",
  "Comenta y etiqueta a jugadores",
  "Descarga momentos destacados",
  "Cronología de eventos",
  "Comparte en redes sociales",
  "Perfil del jugador",
  "Descargar partido",
  "Detección automática de momentos destacados",
  "Diario",
  "Herramientas de dibujo",
];

const extrasList = [
  "Veo Live",
  "Veo Analytics",
  "Destacados del Jugador",
  "Tripode (5,2 m o 7,4m)",
];

const PricingTable = () => {
  return (
    <div className="container mx-auto px-4 llg:px-10 xll:px-28 py-10 text-iBlue aeonik max-w-screen-2xl ">
      <div className="overflow-x-auto bg-[#ffff] ">
        <table className=" sm:w-full ">
          <thead>
            <tr className="">
              <th className="p-4 text-left h-[230px] !w-[250px] lm:!w-[310px] llg:w-[350px]">
                <h2 className="text-2xl aeonik font-bold  mb-4">
                  Compara los planes
                </h2>
                <p className=" body2 text-grey2 mb-6 llg:w-[275px]">
                  Compara nuestros diferentes planes para encontrar cuál se
                  ajusta a tus necesidades
                </p>
              </th>
              {plans.map((plan, index) => (
                <th
                  key={index}
                  className="p-4 text-center font-bold text-2xl w-[175px] md:w-auto"
                >
                  <p className="mb-4 w-[110px] ms:w-auto">{plan.name}</p>
                  <span className="text-[40px] ">{plan.price}</span>
                  <span className="text-grey2 text-sm font-normal"> /mes</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(plans[0].categories).map((category, rowIndex) => (
              <tr key={rowIndex} className="">
                <td className="p-4 font-medium ">{category}</td>
                {plans.map((plan, colIndex) => (
                  <td key={colIndex} className="p-4 text-sm  text-center">
                    {plan.categories[category]}
                  </td>
                ))}
              </tr>
            ))}

            {featuresList.map((feature, rowIndex) => (
              <tr key={rowIndex} className="">
                <td className="p-4 font-medium ">{feature}</td>
                {plans.map((plan, colIndex) => (
                  <td key={colIndex} className="p-4 text-center">
                    <img
                      src={plan.features[rowIndex] ? Tick : Cross}
                      className="m-auto"
                      width={20}
                    />
                  </td>
                ))}
              </tr>
            ))}
            {extrasList.map((extra, rowIndex) => (
              <tr key={rowIndex} className=" ">
                <td className="p-4 font-medium ">{extra}</td>
                {plans.map((plan, colIndex) => (
                  <td key={colIndex} className="p-4 text-center text-sm">
                    {plan.extras[rowIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;
