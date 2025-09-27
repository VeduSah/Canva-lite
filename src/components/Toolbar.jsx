import React from "react";

const Toolbar = ({
  onAddRect,
  onAddCircle,
  onAddText,
  onDelete,
  onTogglePen,
  isPenActive,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  return (
    <div className="toolbar" style={{width: '100%', display: 'flex', gap: '10px', padding: '10px', backgroundColor: '#f5f5f5'}}>
      <button onClick={onAddRect}>⬜ Rectangle</button>
      <button onClick={onAddCircle}>⭕ Circle</button>
      <button onClick={onAddText}>📝 Text</button>
      <button onClick={onDelete}>🗑️ Delete</button>
      <button onClick={onTogglePen} className={isPenActive ? "active" : ""}>
        ✏️ Pen
      </button>
      <button onClick={onUndo} disabled={!canUndo}>
        ↶ Undo
      </button>
      <button onClick={onRedo} disabled={!canRedo}>
        ↷ Redo
      </button>
    </div>
  );
};

export default Toolbar;
