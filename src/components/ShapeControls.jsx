import React from "react";

const ShapeControls = ({ onChangeBorder, onChangeFill }) => {
  return (
    <div>
      <input type="color" onChange={(e) => onChangeFill(e.target.value)} />
      <input type="color" onChange={(e) => onChangeBorder(e.target.value)} />
    </div>
  );
};

export default ShapeControls;
