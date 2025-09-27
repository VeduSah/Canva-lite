import { useState, useCallback } from 'react';
import { fabric } from 'fabric-pure-browser';

const useCanvas = () => {
  const [canvas, setCanvas] = useState(null);

  const initCanvas = useCallback((canvasElement) => {
    const fabricCanvas = new fabric.Canvas(canvasElement, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff'
    });
    setCanvas(fabricCanvas);
    return fabricCanvas;
  }, []);

  const addRect = useCallback(() => {
    if (!canvas) return;
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'blue',
      width: 100,
      height: 100
    });
    canvas.add(rect);
  }, [canvas]);

  const addCircle = useCallback(() => {
    if (!canvas) return;
    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      radius: 50,
      fill: 'green'
    });
    canvas.add(circle);
  }, [canvas]);

  const addText = useCallback(() => {
    if (!canvas) return;
    const text = new fabric.IText('Hello World', {
      left: 200,
      top: 200,
      fill: 'black'
    });
    canvas.add(text);
  }, [canvas]);

  return {
    canvas,
    initCanvas,
    addRect,
    addCircle,
    addText
  };
};

export default useCanvas;