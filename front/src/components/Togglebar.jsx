import React from "react";
import { useState, useEffect, useRef } from "react";

const ToggleBar = ({
  options = [],
  value: externalValue,
  onChange,
  containerClassName = "",
  buttonClassName = "",
  activeButtonClassName = "",
  thumbClassName = "",
}) => {
  const [internalValue, setInternalValue] = useState(options[0]?.value || "");
  const buttonsRef = useRef([]);
  const [thumbPosition, setThumbPosition] = useState({
    width: 0,
    left: 0,
  });
  console.log(externalValue);
  // Determinar si es controlado
  const isControlled = externalValue !== undefined;
  const currentValue = isControlled ? externalValue : internalValue;

  // Actualizar posición del thumb
  useEffect(() => {
    const index = options.findIndex((opt) => opt.value === currentValue);
    const button = buttonsRef.current[index];

    if (button) {
      setThumbPosition({
        width: button.offsetWidth,
        left: button.offsetLeft,
      });
    }
  }, [currentValue, options]);

  // Manejar clics
  const handleClick = (value) => {
    if (!isControlled) setInternalValue(value);
    if (onChange) onChange(value);
  };

  // Validaciones en desarrollo
  if (process.env.NODE_ENV !== "production") {
    if (options.length === 0) console.warn("ToggleBar: No options provided");
    if (isControlled && !options.some((opt) => opt.value === externalValue)) {
      console.warn("ToggleBar: Initial value not found in options");
    }
  }

  return (
    <div
      className={`relative flex rounded-[45px] ${containerClassName}`}
      role="group"
    >
      {/* Thumb animado */}
      <div
        className={`absolute top-1 h-[calc(100%-8px)] rounded-[40px] transition-all duration-300 ease-out ${thumbClassName}`}
        style={{
          width: thumbPosition.width,
          left: thumbPosition.left,
        }}
      />

      {/* Botones */}
      {options.map((option, index) => (
        <button
          key={option.value}
          ref={(el) => (buttonsRef.current[index] = el)}
          onClick={() => handleClick(option.value)}
          className={`relative flex-1 rounded-[40px] z-10 transition-colors duration-300 ${buttonClassName} ${
            currentValue === option.value ? activeButtonClassName : ""
          }`}
          aria-checked={currentValue === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleBar;
