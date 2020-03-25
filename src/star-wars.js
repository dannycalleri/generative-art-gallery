import React, { useRef, useEffect } from 'react';
import { StyledCanvas } from './StyledCanvas';
import { Frame } from './Frame';

function vectorLength(p) {
  return Math.sqrt(p.x*p.x + p.y*p.y + p.z*p.z);
}

function dotProduct(p0, p1) {
  return p0.x * p1.x + p0.y * p1.y + p0.z * p1.z;
}

function scaleVector(v, s) {
  return {
    x: v.x * s,
    y: v.y * s,
    z: v.z * s,
  };
}

function addVectors(v0, v1) {
  return {
    x: v0.x + v1.x,
    y: v0.y + v1.y,
    z: v0.z + v1.z,
  };
}

function normalizeVector(v) {
  return {
    x: v.x / vectorLength(v),
    y: v.y / vectorLength(v),
    z: v.z / vectorLength(v),
  };
}

function slerpUnitVectors(p0, p1, t) {
  const dot = dotProduct(p0, p1);
  const omega = Math.acos(dot);
  console.log(p0);
  console.log(p1);
  console.log(`dot = ${dot}`);
  console.log(`omega = ${omega}`);
  const d = Math.sin(omega);
  const s0 = Math.sin((1 - t) * omega);
  const s1 = Math.sin(t * omega);
  const p0Scaled = scaleVector(p0, s0);
  const p1Scaled = scaleVector(p1, s1);
  return scaleVector(addVectors(p0Scaled, p1Scaled), 1/d);
}

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
    context.fillStyle = "#fdfbed";
    context.fill();

    const radius = 100;
    context.beginPath();
    context.arc(size / 2, size / 2, radius, 0, 2 * Math.PI);
    context.stroke();

    function generateHorizontalLineAt(angle) {
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return [
        {x, y},
        {x: -x, y}
      ];
    }

    function drawHorizontalLineAt(p1, p2) {
      context.beginPath();
      context.moveTo(size / 2 + p1.x, size / 2 + p1.y);
      context.lineTo(size / 2 + p2.x, size / 2 + p2.y);
      context.stroke();
    }

    const anglesForHorizontalLines = [
      Math.PI / 40,
      -Math.PI / 40,
      Math.PI / 1000,
      -Math.PI / 1000,
      Math.PI / 6,
      -Math.PI / 6,
      Math.PI / 4,
      -Math.PI / 4,
    ];
    const horizontalLines = anglesForHorizontalLines.map(
      angle => generateHorizontalLineAt(angle),
    );

    horizontalLines.forEach(line => {
      drawHorizontalLineAt(line[0], line[1]);

      const segments = Math.floor(Math.random() * 5);
      for(let i = 0; i < segments; i++) {
        const xPoint = Math.random() * line[1].x * (Math.random() < 0.5 ? -1 : 1);
        const yPoint = line[0].y;
        const point1 = {
          x: xPoint,
          y: yPoint,
          z: 25,
        };
        const point2 = {
          x: xPoint,
          y: yPoint + 10,
          z: 25,
        };

        const totalPoints = 20;
        const point = slerpUnitVectors(normalizeVector(point1), normalizeVector(point2), 0);
        context.beginPath();
        context.moveTo(size/2 + point.x * radius, size/2 + point.y * radius);
        for(let i = 1; i <= totalPoints; i++) {
          const rate = i / totalPoints;
          const point = slerpUnitVectors(normalizeVector(point1), normalizeVector(point2), rate);
          context.lineTo(size/2 + point.x * radius, size/2 + point.y * radius);
        }
        context.stroke();
      }
    });

    function drawOblo(x) {
      context.beginPath();
      context.arc(size / 2 + x, size / 2 - 45, radius/3, 0, 2 * Math.PI);
      context.fillStyle = "#fdfbed";
      context.fill();
      context.stroke();

      context.beginPath();
      context.arc(size / 2 + x, size / 2 - 45, radius/3.2, 0, 2 * Math.PI);
      context.stroke();

      context.beginPath();
      context.arc(size / 2 + x, size / 2 - 45, radius/4, 0, 2 * Math.PI);
      context.stroke();

      context.beginPath();
      context.arc(size / 2 + x, size / 2 - 45, radius/6, 0, 2 * Math.PI);
      context.stroke();

      context.beginPath();
      context.arc(size / 2 + x, size / 2 - 45, radius/50, 0, 2 * Math.PI);
      context.stroke();
    }

    drawOblo(-20 + Math.random() * 40);

  }, []);

  return (
    <div>
      <p>Death Star</p>
      <Frame>
        <StyledCanvas ref={canvasEl}></StyledCanvas>
      </Frame>
    </div>
  );
};
