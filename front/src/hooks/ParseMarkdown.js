import React from "react";

export const ParseMarkdown = ({ text }) => {
  if (!text) return null;

  return text.split("\n").map((originalLine, lineIndex) => {
    // If the line is empty, return a <br> to render the break
    if (originalLine.trim() === "") {
      return <br key={`br-${lineIndex}`} />;
    }

    const hasBulletInLine = originalLine.trim().startsWith("- ");
    let processedLine = hasBulletInLine
      ? originalLine.replace(/^- /, "• ")
      : originalLine;

    const segments = processedLine.split(
      /(\*\*.*?\*\*|_.*?_|<u>.*?<\/u>|\[.*?\]\(.*?\)|<sBlue>.*?<sBlue>|<blue>.*?<blue>|-.*?-)/g
    );

    // Se usa también dentro de párrafos y headings, que no admiten divs.
    return (
      <span key={lineIndex} className={hasBulletInLine ? "block ml-4" : "block"}>
        {segments.map((segment, segmentIndex) => {
          if (segment.startsWith("**") && segment.endsWith("**")) {
            return <strong key={segmentIndex}>{segment.slice(2, -2)}</strong>;
          }
          if (segment.startsWith("_") && segment.endsWith("_")) {
            return <em key={segmentIndex}>{segment.slice(1, -1)}</em>;
          }
          if (segment.startsWith("<u>") && segment.endsWith("</u>")) {
            return <u key={segmentIndex}>{segment.slice(3, -4)}</u>;
          }
          if (segment.startsWith("<sBlue>") && segment.endsWith("<sBlue>")) {
            return (
              <span key={segmentIndex} className="text-clearBlue">
                {segment.slice(7, -7)}
              </span>
            );
          }
          if (segment.startsWith("<blue>") && segment.endsWith("<blue>")) {
            return (
              <span key={segmentIndex} className="text-skyBlue">
                {segment.slice(6, -6)}
              </span>
            );
          }
          if (segment.startsWith("-") && segment.endsWith("-")) {
            return (
              <span
                key={segmentIndex}
                style={{ textDecoration: "line-through" }}
              >
                {segment.slice(1, -1)}
              </span>
            );
          }
          if (
            segment.startsWith("[") &&
            segment.includes("](") &&
            segment.endsWith(")")
          ) {
            const [linkText, url] = segment.slice(1, -1).split("](");
            return (
              <a
                key={segmentIndex}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="!underline"
              >
                {linkText}
              </a>
            );
          }
          return segment;
        })}
      </span>
    );
  });
};
