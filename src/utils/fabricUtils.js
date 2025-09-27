export const exportCanvasAsJSON = (canvas) => {
  return JSON.stringify(canvas.toJSON());
};

export const importCanvasFromJSON = (canvas, jsonData) => {
  return new Promise((resolve) => {
    canvas.loadFromJSON(jsonData, () => {
      canvas.renderAll();
      resolve();
    });
  });
};

export const exportCanvasAsImage = (canvas, format = 'png', quality = 1) => {
  return canvas.toDataURL({
    format,
    quality,
    multiplier: 1
  });
};

export const clearCanvas = (canvas) => {
  canvas.clear();
  canvas.backgroundColor = '#ffffff';
  canvas.renderAll();
};