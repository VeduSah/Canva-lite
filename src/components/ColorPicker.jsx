import React from "react";

const ColorPicker = ({ onChange }) => {
  return <input type="color" onChange={(e) => onChange(e.target.value)} />;
};

export default ColorPicker;
