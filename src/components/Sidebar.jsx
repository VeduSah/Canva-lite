import React from 'react';

const Sidebar = ({ layers, onLayerSelect, onLayerToggle }) => {
  return (
    <div className="sidebar">
      <h3>Layers</h3>
      {layers.map((layer, index) => (
        <div key={index} className="layer-item">
          <input
            type="checkbox"
            checked={layer.visible}
            onChange={() => onLayerToggle(index)}
          />
          <span onClick={() => onLayerSelect(index)}>{layer.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;