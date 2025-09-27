import React, { useEffect, useRef } from "react";
import { fabric } from "fabric-pure-browser";

const CanvasEditor = ({ onReady }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const onReadyRef = useRef(onReady);

  // Update the ref when onReady changes
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (!canvasRef.current || fabricCanvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight - 100,
      backgroundColor: "#f0f0f0",
    });
    fabricCanvasRef.current = canvas;
    
    if (onReadyRef.current) {
      onReadyRef.current(canvas);
    }

    return () => {
      if (fabricCanvasRef.current) {
        try {
          fabricCanvasRef.current.clear();
          fabricCanvasRef.current.dispose();
        } catch (error) {
          console.warn('Canvas disposal error:', error);
        }
        fabricCanvasRef.current = null;
      }
    };
  }, []); // Empty dependency array to run only once

  return <canvas ref={canvasRef} />;
};

export default CanvasEditor;
