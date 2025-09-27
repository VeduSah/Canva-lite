import { useRef } from "react";

const useUndoRedo = () => {
  const history = useRef([]);
  const pointer = useRef(-1);

  const saveState = (json) => {
    // Remove any future history when saving new state
    history.current = history.current.slice(0, pointer.current + 1);
    history.current.push(json);
    pointer.current = history.current.length - 1;
  };

  const undo = () => {
    if (pointer.current > 0) {
      pointer.current--;
      return history.current[pointer.current];
    }
    return null;
  };

  const redo = () => {
    if (pointer.current < history.current.length - 1) {
      pointer.current++;
      return history.current[pointer.current];
    }
    return null;
  };

  return { saveState, undo, redo, pointer, history };
};

export default useUndoRedo;
