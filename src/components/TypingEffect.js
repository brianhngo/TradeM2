import React, { useState, useEffect } from "react";

export default function TypingEffect({ text }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 80); 
    }
  }, [currentIndex, text]);

  return <p className="lead fs-3">{currentText}</p>;
}
