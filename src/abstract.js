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
    context.fillStyle = "#000";
    context.fill();

    const points = [];
    const step = size / 10;
    const offset = size / 2;
    for (let x = 0; x <= size; x += step) {
      const rate = x / size;
      const y = offset + Math.sin(rate * 2 * Math.PI) * 40;
      points.push({x, y});
    }

    points.forEach(point => {
      context.beginPath();
      const randomRadius = 3 + Math.random() * 10;
      context.arc(point.x, point.y, randomRadius, 0, 2 * Math.PI);
      context.strokeStyle = "#fff";
      context.stroke();
    });

  }, []);

  return (
    <div>
      <p>Sinusoidal circles</p>
      <Frame>
        <StyledCanvas ref={canvasEl}></StyledCanvas>
      </Frame>
    </div>
  );
};
