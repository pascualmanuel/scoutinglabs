import "./styles.css";
import Favicon from "../extensions/favicon.png";

export default {
  config: {
    locales: ["en"],
    auth: {
      logo: "https://great-hope-45f9424224.media.strapiapp.com/Group_70_1_ebf0a631e8.svg", // URL externa del logo de login
    },
    menu: {
      logo: "https://great-hope-45f9424224.media.strapiapp.com/Group_70_1_ebf0a631e8.svg", // URL externa del logo del menú
    },
    head: {
      title: "Scouting Labs - Strapi", // Nuevo título
      favicon: Favicon, // URL externa
    },
  },
  bootstrap() {},
};
