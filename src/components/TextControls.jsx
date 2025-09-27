import React from "react";

const TextControls = ({ onChangeFont, onChangeSize }) => {
  return (
    <div>
      <select onChange={(e) => onChangeFont(e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Times New Roman">Times</option>
      </select>
      <input
        type="number"
        placeholder="Font Size"
        onChange={(e) => onChangeSize(parseInt(e.target.value))}
      />
    </div>
  );
};

export default TextControls;
