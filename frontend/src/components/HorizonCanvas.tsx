import React, { useRef, useEffect, useState, useCallback } from "react";

// This canvas component was heavily authored by Gemini 3 Pro

interface HorizonCanvasProps {
  value?: string; // string with length 360*90 (32400) of '0' and '1'
  onChange?: (newMask: string) => void;
  width?: number;
  height?: number;
}

export const HorizonCanvas: React.FC<HorizonCanvasProps> = ({
  value,
  onChange,
  width = 400,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // internal: flat array 360 * 90
  // index = (elevation_index * 360) + azimuth_index
  // Elevation Index: 0 (horizon) -> 89 (zenith)
  // Azimuth Index: 0 -> 359
  const maskRef = useRef<Uint8Array>(new Uint8Array(360 * 90));

  // --- Drawing Logic ---

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, width, height);

    // 1. Draw Polar Grid
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;

    const radius = Math.min(width, height) / 2 - 20; // margin
    const centerX = width / 2;
    const centerY = height / 2;

    // Circles (0, 30, 60 degrees)
    [0, 30, 60].forEach((deg) => {
      ctx.beginPath();
      // Elevation is mapped so that 0 is the edge, 90 is the center

      const r = radius * (1 - deg / 90);
      ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
      ctx.stroke();

      // Text labels
      ctx.fillStyle = "#999";
      ctx.font = "10px Arial";
      ctx.fillText(`${deg}°`, centerX + 2, centerY - r - 2);
    });

    // Cardinal direction lines (N, E, S, W)
    const dirs = ["N", "E", "S", "W"];
    for (let i = 0; i < 4; i++) {
      const angle = (i * 90 - 90) * (Math.PI / 180); // N is -90deg in Canvas coordinate system
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      ctx.stroke();

      // Labels
      ctx.fillStyle = "#000";
      ctx.font = "bold 12px Arial";
      // Small offset for centering
      const textX = centerX + Math.cos(angle) * (radius + 15);
      const textY = centerY + Math.sin(angle) * (radius + 15);
      ctx.fillText(dirs[i], textX - 5, textY + 4);
    }

    // 2. Draw Obstacles (masking areas)
    // This is a bit heavy to draw point by point, but for 32k points it's manageable (or we use ImageData)
    // For simplicity, we draw small circles only where it's 1
    ctx.fillStyle = "rgba(255, 0, 0, 0.7)"; // Semi-transparent red

    // Optimization: Draw with ImageData (pixels) for instant speed
    // But since the canvas is 400x400 and the mask is polar, it's easier geometrically

    for (let el = 0; el < 90; el++) {
      for (let az = 0; az < 360; az++) {
        const idx = el * 360 + az;
        if (maskRef.current[idx] === 1) {
          // Convert back to X/Y
          const r = radius * (1 - el / 90);
          // Azimuth 0 is North (Up), Canvas 0 is Right.
          // Formula: angle = (az - 90) * deg2rad
          const angle = (az - 90) * (Math.PI / 180);

          const x = centerX + r * Math.cos(angle);
          const y = centerY + r * Math.sin(angle);

          // Draw a small point (TODO: ability to increase the size for a "thicker brush")
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
  }, [width, height]);

  // 1. Initialization on prop "value" change
  useEffect(() => {
    if (value && value.length === 360 * 90) {
      for (let i = 0; i < value.length; i++) {
        maskRef.current[i] = value[i] === "1" ? 1 : 0;
      }
    } else {
      maskRef.current.fill(0);
    }
    draw();
  }, [value, draw]);

  const radius = Math.min(width, height) / 2 - 20; // Leave some margin
  const centerX = width / 2;
  const centerY = height / 2;

  // --- Interaction Logic ---

  const paint = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Convert X/Y to Az/El
    const dx = x - centerX;
    const dy = y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Ignore if outside the horizon circle
    if (dist > radius) return;

    // Elevation: 0 at radius, 90 at center
    const el = Math.round(90 * (1 - dist / radius));

    // Azimuth: atan2(dy, dx) gives radians from -PI to PI relative to East
    // We need 0 at North (Up), clockwise
    const angle = Math.atan2(dy, dx) * (180 / Math.PI); // -180 to 180
    // Rotate so -90 (North) becomes 0
    let az = Math.round(angle + 90);
    if (az < 0) az += 360;
    if (az >= 360) az -= 360;

    // Brush Size
    // const brushSize = 5;

    // Simple painting: Set a block of Az/El
    for (let dEl = -2; dEl <= 2; dEl++) {
      for (let dAz = -2; dAz <= 2; dAz++) {
        let targetEl = el + dEl;
        let targetAz = az + dAz;

        if (targetEl < 0) targetEl = 0;
        if (targetEl >= 90) targetEl = 89;

        if (targetAz < 0) targetAz += 360;
        if (targetAz >= 360) targetAz -= 360;

        const idx = targetEl * 360 + targetAz;
        maskRef.current[idx] = 1; // 1 = Obstacle
      }
    }

    // Redraw immediately
    draw();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    paint(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    paint(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    // Export string back to parent
    const str = Array.from(maskRef.current).join("");
    if (onChange) onChange(str);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        cursor: "crosshair",
        border: "1px solid #ddd",
        borderRadius: "50%",
      }}
    />
  );
};

export default HorizonCanvas;