// src/components/Layout.js
import React from "react";


const Layout = ({ children }) => {
  return (
    <>
      <header>
        <nav>
          {/* Navegación */}
          <a href="/">Inicio</a>
          <a href="/about">Sobre Nosotros</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 Scouting Labs</p>
      </footer>
    </>
  );
};

export default Layout;
