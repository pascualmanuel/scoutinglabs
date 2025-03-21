// WhatsAppPopup.jsx
import React from "react";
import Modal from "./Modal";

import CotizacionForm from "./CotizacionForm";

import { useLanguage } from "../../hooks/LanguageContext";
const WhatsAppPopup = ({
  plan,
  selectedPlanType,
  onClose,
  whatsappWindowRef,
  addons,
}) => {
  const { locale } = useLanguage();
  const handleFormSuccess = (formData) => {
    if (!formData.phone) {
      console.error(
        "❌ Error: El número de teléfono está vacío o es inválido."
      );
      return;
    }
    const periodicidadMap = {
      anual: locale === "EN" ? "Annual" : "Anual",
      semestral: locale === "EN" ? "Semi-annual" : "Semestral",
      mensual: locale === "EN" ? "Monthly" : "Mensual",
    };

    const planPrice =
      selectedPlanType === "mensual"
        ? parseFloat(plan.mensualPrice.replace(/[^0-9.-]+/g, ""))
        : selectedPlanType === "semestral"
        ? parseFloat(plan.semestralPrice.replace(/[^0-9.-]+/g, ""))
        : parseFloat(plan.annualPrice.replace(/[^0-9.-]+/g, ""));

    const mensaje =
      locale === "EN"
        ? `Hello, I want to subscribe to the *${plan?.title} (${
            periodicidadMap[selectedPlanType]
          })* plan for USD *${planPrice.toFixed(
            2
          )}/month*.\n\nContact:\n- Name: ${formData.name}\n- Email: ${
            formData.email
          }\n- Phone: ${formData.phone}`
        : `Hola, quiero suscribirme al plan *${plan?.title} (${
            periodicidadMap[selectedPlanType]
          })* por USD *${planPrice.toFixed(2)}/mes*.\n\nContacto:\n- Nombre: ${
            formData.name
          }\n- Email: ${formData.email}\n- Teléfono: ${formData.phone}`;

    const url = `https://wa.me/5491151632960?text=${encodeURIComponent(
      mensaje
    )}`;

    // Verificar si la ventana ya está abierta
    if (whatsappWindowRef?.current && !whatsappWindowRef.current.closed) {
      whatsappWindowRef.current.location = url;
    } else {
      whatsappWindowRef.current = window.open(url, "_blank");
    }

    // Cerrar el modal
    onClose();
  };

  let selectedPlan = plan.title;
  //   let selectedAddon =

  return (
    <Modal onClose={onClose}>
      <h2 className="subH mb-4">
        {locale === "ES"
          ? "Completa el formulario y recibe tu cotizacion"
          : "Fill out the form and receive your quote."}
      </h2>
      <CotizacionForm
        onSuccess={handleFormSuccess}
        selectedPlanType={selectedPlanType}
        selectedPlan={selectedPlan}
        addons={addons}
        showMessage={false}
      />
    </Modal>
  );
};

export default WhatsAppPopup;
