import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fabric } from "fabric-pure-browser";
import CanvasEditor from "../components/CanvasEditor";
import Toolbar from "../components/Toolbar";
import ColorPicker from "../components/ColorPicker";
import ShareButton from "../components/ShareButton";
import ExportButton from "../components/ExportButton.jsx";
import useFirestore from "../hooks/useFirestore";
import useDebounce from "../hooks/useDebounce";
import useUndoRedo from "../hooks/useUndoRedo";

const CanvasPage = () => {
  const { id } = useParams();
  const { saveScene, loadScene } = useFirestore();
  const { saveState, undo, redo, pointer, history } = useUndoRedo();
  const [canvas, setCanvas] = useState(null);
  const [isPenActive, setIsPenActive] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const canvasState = useRef(null);

  const onReady = useCallback((canvasInstance) => {
    setCanvas(canvasInstance);
    loadCanvas(canvasInstance);

    canvasInstance.on("object:added", () => saveCanvasState(canvasInstance));
    canvasInstance.on("object:modified", () => saveCanvasState(canvasInstance));
    canvasInstance.on("path:created", () => saveCanvasState(canvasInstance));

    canvasInstance.on("selection:created", (e) => setSelectedObject(e.selected[0]));
    canvasInstance.on("selection:updated", (e) => setSelectedObject(e.selected[0]));
    canvasInstance.on("selection:cleared", () => setSelectedObject(null));
  }, [id]); // Add id as dependency

  const saveCanvasState = useCallback((canvasInstance) => {
    const json = JSON.stringify(canvasInstance.toJSON());
    canvasState.current = json;
    saveState(json);
    setCanUndo(pointer.current > 0);
    setCanRedo(false); // No redo available after new action
  }, [saveState, pointer]);

  useDebounce(
    () => {
      if (canvasState.current) {
        saveScene(id, canvasState.current);
      }
    },
    1000,
    [id, canvasState.current]
  );

  const loadCanvas = useCallback(async (canvasInstance) => {
    try {
      const sceneData = await loadScene(id);
      if (sceneData) {
        canvasInstance.loadFromJSON(JSON.parse(sceneData), () => {
          canvasInstance.renderAll();
          saveCanvasState(canvasInstance);
        });
      }
    } catch (error) {
      console.warn('Failed to load scene:', error.message);
      // Continue with empty canvas if loading fails
    }
  }, [id, loadScene]);

  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "blue",
      width: 100,
      height: 100,
    });
    canvas.add(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      radius: 50,
      fill: "green",
    });
    canvas.add(circle);
  };

  const addText = () => {
    const text = new fabric.IText("Hello, World!", {
      left: 200,
      top: 200,
      fill: "red",
    });
    canvas.add(text);
  };

  const deleteSelected = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      saveCanvasState(canvas);
    }
  };

  const togglePen = () => {
    if (canvas) {
      canvas.isDrawingMode = !canvas.isDrawingMode;
      setIsPenActive(canvas.isDrawingMode);
    }
  };

  const changeColor = (color) => {
    if (selectedObject) {
      selectedObject.set("fill", color);
      canvas.renderAll();
      saveCanvasState(canvas);
    }
  };

  const handleUndo = () => {
    const prevState = undo();
    if (prevState) {
      canvas.loadFromJSON(JSON.parse(prevState), () => {
        canvas.renderAll();
      });
    }
    setCanUndo(pointer.current > 0);
    setCanRedo(pointer.current < history.current.length - 1);
  };

  const handleRedo = () => {
    const nextState = redo();
    if (nextState) {
      canvas.loadFromJSON(JSON.parse(nextState), () => {
        canvas.renderAll();
      });
    }
    setCanRedo(pointer.current < history.current.length - 1);
    setCanUndo(pointer.current > 0);
  };

  const exportCanvas = () => {
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas.png";
    link.click();
  };

  const shareLink = window.location.href;

  return (
    <div>
      <Toolbar
        onAddRect={addRectangle}
        onAddCircle={addCircle}
        onAddText={addText}
        onDelete={deleteSelected}
        onTogglePen={togglePen}
        isPenActive={isPenActive}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      {selectedObject && <ColorPicker onChange={changeColor} />}
      <ShareButton link={shareLink} />
      <ExportButton onExport={exportCanvas} />
      <CanvasEditor sceneId={id} onReady={onReady} />
    </div>
  );
};

export default CanvasPage;
