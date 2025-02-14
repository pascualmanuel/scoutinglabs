// WhatsAppPopup.jsx
import React from "react";
import Modal from "./Modal";
import ContactForm from "../contact/ContactForm";

const WhatsAppPopup = ({
  plan,
  selectedPlanType,
  onClose,
  whatsappWindowRef,
  addons,
}) => {
  console.log(addons, "selectedAddons");
  const handleFormSuccess = (formData) => {
    console.log("Formulario enviado:", formData);

    const periodicidadMap = {
      anual: "Anual",
      semestral: "Semestral",
      mensual: "Mensual",
    };

    // Calcula el precio según el plan seleccionado (ajusta si es necesario)
    const planPrice =
      selectedPlanType === "mensual"
        ? parseFloat(plan.mensualPrice.replace(/[^0-9.-]+/g, ""))
        : selectedPlanType === "semestral"
        ? parseFloat(plan.semestralPrice.replace(/[^0-9.-]+/g, ""))
        : parseFloat(plan.annualPrice.replace(/[^0-9.-]+/g, ""));

    const mensaje = `Hola, quiero suscribirme al plan *${plan?.title} (${
      periodicidadMap[selectedPlanType]
    })* por USD *${planPrice.toFixed(2)}/mes*.\n\nContacto:\n- Nombre: ${
      formData.name
    }\n- Email: ${formData.email}\n- Teléfono: ${formData.phone}`;

    const url = `https://wa.me/5491151632960?text=${encodeURIComponent(
      mensaje
    )}`;

    // Actualizamos la ventana abierta si existe
    if (whatsappWindowRef.current) {
      whatsappWindowRef.current.location = url;
    } else {
      // Fallback: abre una nueva ventana
      window.open(url, "_blank");
    }

    // Cierra el modal
    onClose();
  };

  let selectedPlan = plan.title;

  //   let selectedAddon =

  return (
    <Modal onClose={onClose}>
      <h2 className="subH mb-4">
        Completa el formulario y recibe tu cotizacion
      </h2>
      <ContactForm
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
