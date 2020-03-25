import React, { useRef, useEffect } from 'react';
import { StyledCanvas } from './StyledCanvas';
import { Frame } from './Frame';

export default () => {
  const canvasEl = useRef();

  useEffect(() => {
    const canvas = canvasEl.current;
    const context = canvas.getContext('2d');

    const size = 320;
    const dpr = window.devicePixelRatio;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    context.scale(dpr, dpr);

    context.beginPath();
    context.rect(0, 0, size, size);
    context.fillStyle = "#ee068e";
    context.fill();

    const points = [];
    const step = size / 10;
    const offset = 50;
    for (let x = 0; x <= size; x += step) {
      const rate = x / size;
      const y = offset + Math.sin(rate * 2 * Math.PI) * 40;
      points.push({x, y});
    }

    const diagonalLinesCount = 10;
    const diagonalLines = [];
    for(let i=0; i < diagonalLinesCount; i++) {
      const x1 = Math.random() * size;
      const y1 = Math.random() * size;
      const x2 = Math.random() * size;
      const y2 = Math.random() * size;

      diagonalLines.push({
        x1: x1 < y1 ? 0 : x1,
        y1: y1 < x1 ? 0 : y1,
        x2: x2 > y2 ? size : x2,
        y2: y2 > x2 ? size : y2,
      });
    }

    points.forEach(point => {
      context.beginPath();
      context.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      context.fillStyle = "#fff";
      context.strokeStyle = "#fff";
      context.fill();
      context.stroke();

      context.beginPath();
      context.moveTo(point.x, point.y);
      context.lineTo(point.x, size);
      context.stroke();
    });

    diagonalLines.forEach(linePoints => {
      context.beginPath();
      context.moveTo(linePoints.x1, linePoints.y1);
      context.lineTo(linePoints.x2, linePoints.y2);
      context.strokeStyle = Math.random() < 0.5 ? "black" : "white";
      context.stroke();
    });
  }, []);

  return (
    <div>
      <p>Abstract</p>
      <Frame>
        <StyledCanvas ref={canvasEl}></StyledCanvas>
      </Frame>
    </div>
  );
};
