import React, { useRef, useEffect } from 'react';
import { StyledCanvas } from './StyledCanvas';
import { Frame } from './Frame';

function Sinusoidal() {
  const canvasEl = useRef();

  useEffect(() => {
    const canvas = canvasEl.current;
    const context = canvas.getContext('2d');

    const size = 320;
    const dpr = window.devicePixelRatio;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    context.scale(dpr, dpr);

    context.lineWidth = 1;
    context.lineCap = "round";
    context.lineJoin = "round";

    for(let line = 0; line < 20; line++) {
      const step = size / 100; //(10 * (line + 1));
      const offsetY = -10 + (size / 20) * line;
      let prevX = 0;
      let prevY = offsetY;

      context.beginPath();
      const gray = (255 - (line / 20) * 200).toString(16);
      context.strokeStyle = '#' + gray + gray + gray;
      context.moveTo(prevX, prevY);

      for(var x=0; x <= size; x += step) {
        const rate = x / size;
        const func = line % 2 === 0 ? Math.sin : Math.cos;
        const y = offsetY + func(rate*Math.PI*2 * 8) * (Math.random() * 11); // * (line / 20) * 2;

        context.lineTo(x, y);

        prevX = x;
        prevY = y;
      }

      context.save();
      context.globalCompositeOperation = 'destination-out';
      context.fill();
      context.restore();

      context.stroke();
    }
  }, []);

  return (
    <div>
      <p>Sinusoidal</p>
      <Frame>
        <StyledCanvas ref={canvasEl}></StyledCanvas>
      </Frame>
    </div>
  );
}

export default Sinusoidal;
