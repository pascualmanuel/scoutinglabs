// src/components/Layout.js
import React from "react";
import WhiteLogo from "../assets/white-logo.svg";
import Button from "./Button";
import Test from "../assets/home/veo-transparent.webp";
import Pablo from "../assets/pablo.png";
import Pablo2 from "../assets/pablo2.jpg";
import { Link } from "gatsby";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 Scouting Labs</p>
      </footer>
    </>
  );
};

export default Layout;
