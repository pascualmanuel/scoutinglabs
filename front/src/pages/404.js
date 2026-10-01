import React from "react";
import { Link } from "gatsby";
import Navbar from "../components/Navbar";
import ArrowIcon from "../assets/icons/arrow.svg";
import "../styles/NotFound.css";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <header className="h-[70px] shrink-0">
        <Navbar />
      </header>
      <main className="not-found__main">
        <div className="not-found__container not-found__content">
          <div className="not-found__message">
            <p className="not-found__eyebrow body3">
              <span className="not-found__dot" aria-hidden="true" />
              Error 404
            </p>
            <h1 className="not-found__title h1Title">
              Página no<br />encontrada.
            </h1>
            <p className="not-found__description body1">
              El enlace puede haber cambiado o la dirección no existe.
              Volvé al inicio para seguir explorando Scouting Labs.
            </p>
            <div className="not-found__actions">
              <Link
                to="/"
                className="not-found__action not-found__action--primary buttonText"
              >
                Volver al inicio
                <img src={ArrowIcon} alt="" width="13" height="13" />
              </Link>
              <Link
                to="/contacto/"
                className="not-found__action not-found__action--secondary buttonText"
              >
                Contactar al equipo
              </Link>
            </div>
          </div>
          <div className="not-found__visual" aria-hidden="true">
            <span className="not-found__number grotzec">404</span>
          </div>
        </div>
      </main>
      <footer className="not-found__footer not-found__container">
        <p className="body3">© {new Date().getFullYear()} Scouting Labs</p>
        <Link to="/veo-cam/" className="body3">Conocé Veo Cam 3</Link>
      </footer>
    </div>
  );
};

export default NotFoundPage;

export const Head = () => (
  <>
    <title>Página no encontrada | Scouting Labs</title>
    <meta id="robots" name="robots" content="noindex, follow" />
  </>
);
