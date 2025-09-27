import React from 'react';

const ExportButton = ({ onExport }) => {
  return (
    <button onClick={onExport} className="export-button">
💾 Export PNG
    </button>
  );
};

export default ExportButton;