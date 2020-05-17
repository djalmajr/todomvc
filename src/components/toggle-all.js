import React from "react";
import "./toggle-all.css";

export const ToggleAll = ({ allDone, isEmpty, onChange }) => {
  if (isEmpty) {
    return null;
  }

  return (
    <>
      <input
        id="toggle-all"
        type="checkbox"
        className={`toggle-all ${allDone && "toggle-all--checked"}`}
        checked={allDone}
        onChange={onChange}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
