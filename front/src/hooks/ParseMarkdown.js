import React from "react";

export const ParseMarkdown = ({ text }) => {
  if (!text) return null;

  // Detectamos si el texto tiene formato de bullets (líneas que empiezan con "- ")
  const hasBullets = text.includes("- ");

  // Procesamos cada línea del texto
  return text.split("\n").map((line, lineIndex) => {
    // Convertimos bullets de "- " a "• "
    let processedLine = hasBullets ? line.replace(/^- /, "• ") : line;

    // Dividimos la línea en segmentos con formato
    const segments = processedLine.split(
      /(\*\*.*?\*\*|_.*?_|<u>.*?<\/u>|\[.*?\]\(.*?\))/g
    );

    return (
      <span key={lineIndex} className={hasBullets ? "block" : ""}>
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
          // Enlaces
          if (
            segment.startsWith("[") &&
            segment.includes("](") &&
            segment.endsWith(")")
          ) {
            const [text, url] = segment.slice(1, -1).split("](");
            return (
              <span>
                &nbsp;
                <a
                  key={segmentIndex}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" !underline "
                  style={{ textDecoration: "underline" }}
                >
                  {text}
                </a>
              </span>
            );
          }
          // Texto normal
          return segment;
        })}
      </span>
    );
  });
};
