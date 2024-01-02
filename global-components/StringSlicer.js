import React, { useState } from "react";

const TruncateText = ({ text, maxLength }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const truncatedText = showFullText
    ? text
    : `${text.slice(0, maxLength)}  ${text?.length > maxLength ? "..." : ""}`;

  return (
    <span>
      {truncatedText}
      <br />
      {!showFullText && text?.length > maxLength && (
        <span
          style={{ color: "#b695f8", cursor: "pointer" }}
          onClick={toggleShowFullText}
        >
          Read more
        </span>
      )}
      {showFullText && (
        <span
          style={{ color: "#b695f8", cursor: "pointer" }}
          onClick={toggleShowFullText}
        >
          Read less
        </span>
      )}
    </span>
  );
};

export default TruncateText;
