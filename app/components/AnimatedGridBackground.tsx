"use client";

import { useEffect, useRef } from "react";

interface Beam {
  type: "h" | "v";
  linePos: number; // Y coordinate for 'h', X coordinate for 'v'
  currentPos: number; // X for 'h', Y for 'v'
  length: number;
  speed: number;
  direction: 1 | -1;
  opacity: number;
}

export default function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const cellSize = 50; // Larger squares (60px)
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const beams: Beam[] = [];
    const maxBeams = 7;

    const spawnBeam = () => {
      const isHorizontal = Math.random() > 0.5;
      const direction = Math.random() > 0.5 ? 1 : -1;

      if (isHorizontal) {
        const totalRows = Math.floor(height / cellSize);
        const row = Math.floor(Math.random() * totalRows);
        const y = row * cellSize;

        beams.push({
          type: "h",
          linePos: y,
          currentPos: direction === 1 ? -150 : width + 150,
          length: Math.random() * 70 + 50, // 50-120px
          speed: (Math.random() * 0.8 + 0.7) * direction, // Slower chase speed
          direction,
          opacity: Math.random() * 0.35 + 0.55,
        });
      } else {
        const totalCols = Math.floor(width / cellSize);
        const col = Math.floor(Math.random() * totalCols);
        const x = col * cellSize;

        beams.push({
          type: "v",
          linePos: x,
          currentPos: direction === 1 ? -150 : height + 150,
          length: Math.random() * 70 + 50,
          speed: (Math.random() * 0.8 + 0.7) * direction, // Slower chase speed
          direction,
          opacity: Math.random() * 0.35 + 0.55,
        });
      }
    };

    // Initial beams
    for (let i = 0; i < 4; i++) {
      spawnBeam();
    }

    let lastSpawn = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw static grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.shadowBlur = 0;

      // Vertical lines
      ctx.beginPath();
      for (let x = 0; x <= width; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal lines
      for (let y = 0; y <= height; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Intersection points
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      for (let x = 0; x <= width; x += cellSize) {
        for (let y = 0; y <= height; y += cellSize) {
          ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
        }
      }

      // 2. Spawn new beams randomly
      const now = Date.now();
      if (beams.length < maxBeams && now - lastSpawn > 800 && Math.random() > 0.4) {
        spawnBeam();
        lastSpawn = now;
      }

      // 3. Update & Draw running Volt beams
      for (let i = beams.length - 1; i >= 0; i--) {
        const b = beams[i];
        b.currentPos += b.speed;

        ctx.save();
        ctx.lineWidth = 0.8; // Thinner, sharper beam
        ctx.shadowColor = "#aaff00";
        ctx.shadowBlur = 6;

        if (b.type === "h") {
          const startX = b.currentPos;
          const endX = b.currentPos - b.length * b.direction;

          const grad = ctx.createLinearGradient(endX, b.linePos, startX, b.linePos);
          grad.addColorStop(0, "rgba(170, 255, 0, 0)");
          grad.addColorStop(0.7, `rgba(170, 255, 0, ${b.opacity * 0.6})`);
          grad.addColorStop(1, `rgba(210, 255, 100, ${b.opacity})`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(endX, b.linePos);
          ctx.lineTo(startX, b.linePos);
          ctx.stroke();

          // Delicate smaller leading head dot
          ctx.fillStyle = "rgba(245, 255, 220, 0.9)";
          ctx.beginPath();
          ctx.arc(startX, b.linePos, 0.75, 0, Math.PI * 2);
          ctx.fill();

          // Remove off-screen
          if (
            (b.direction === 1 && startX > width + 200) ||
            (b.direction === -1 && startX < -200)
          ) {
            beams.splice(i, 1);
          }
        } else {
          const startY = b.currentPos;
          const endY = b.currentPos - b.length * b.direction;

          const grad = ctx.createLinearGradient(b.linePos, endY, b.linePos, startY);
          grad.addColorStop(0, "rgba(170, 255, 0, 0)");
          grad.addColorStop(0.7, `rgba(170, 255, 0, ${b.opacity * 0.6})`);
          grad.addColorStop(1, `rgba(210, 255, 100, ${b.opacity})`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(b.linePos, endY);
          ctx.lineTo(b.linePos, startY);
          ctx.stroke();

          // Delicate smaller leading head dot
          ctx.fillStyle = "rgba(245, 255, 220, 0.9)";
          ctx.beginPath();
          ctx.arc(b.linePos, startY, 0.75, 0, Math.PI * 2);
          ctx.fill();

          // Remove off-screen
          if (
            (b.direction === 1 && startY > height + 200) ||
            (b.direction === -1 && startY < -200)
          ) {
            beams.splice(i, 1);
          }
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
