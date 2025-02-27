import React from "react";

export const ParseMarkdown = ({ text }) => {
  if (!text) return null;

  // Dividimos el texto por saltos de línea reales (\n)
  return text.split("\n").map((originalLine, lineIndex) => {
    // Verificamos si la línea tiene un bullet (comienza con "- ")
    const hasBulletInLine = originalLine.trim().startsWith("- ");

    // Convertimos bullets de "- " a "• " solo en esta línea
    let processedLine = hasBulletInLine
      ? originalLine.replace(/^- /, "• ")
      : originalLine;

    // Dividimos los segmentos con formato
    const segments = processedLine.split(
      /(\*\*.*?\*\*|_.*?_|<u>.*?<\/u>|\[.*?\]\(.*?\)|<sBlue>.*?<sBlue>)/g
    );

    return (
      <div
        key={lineIndex}
        className={hasBulletInLine ? "block ml-4" : ""} // Margen para bullets
      >
        {segments.map((segment, segmentIndex) => {
          // Negrita
          if (segment.startsWith("**") && segment.endsWith("**")) {
            return <strong key={segmentIndex}>{segment.slice(2, -2)}</strong>;
          }
          // Cursiva
          if (segment.startsWith("_") && segment.endsWith("_")) {
            return <em key={segmentIndex}>{segment.slice(1, -1)}</em>;
          }
          // Subrayado
          if (segment.startsWith("<u>") && segment.endsWith("</u>")) {
            return <u key={segmentIndex}>{segment.slice(3, -4)}</u>;
          }
          // Color Azul (sBlue)
          if (segment.startsWith("<sBlue>") && segment.endsWith("<sBlue>")) {
            return (
              <span key={segmentIndex} className="text-clearBlue">
                {segment.slice(7, -7)}
              </span>
            );
          }
          // Enlaces
          if (
            segment.startsWith("[") &&
            segment.includes("](") &&
            segment.endsWith(")")
          ) {
            const [text, url] = segment.slice(1, -1).split("](");
            return (
              <a
                key={segmentIndex}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="!underline"
              >
                {text}
              </a>
            );
          }
          // Texto normal
          return segment;
        })}
      </div>
    );
  });
};
