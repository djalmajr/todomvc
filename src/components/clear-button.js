import React from "react";
import "./clear-button.css";

export const ClearButton = ({ isEmpty, onClick }) => {
  if (isEmpty) {
    return null;
  }

  return (
    <button className="clear-button" onClick={onClick}>
      Clear completed
    </button>
  );
};
