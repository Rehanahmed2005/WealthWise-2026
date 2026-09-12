import { useEffect, useRef } from "react";
import { colors } from "../styles/tokens.js";
import { hexToRgba } from "../utils/color.js";

const LINK_DISTANCE = 130;
const MOUSE_REPEL_DISTANCE = 120;
const MOUSE_LINK_DISTANCE = 180;

/**
 * Draws a drifting node network on the given canvas ref, connecting nearby
 * nodes and linking to the cursor. Attaches its listeners to the canvas's
 * parent element so hover/leave tracking matches the visible container.
 * Respects prefers-reduced-motion by freezing node movement.
 */
export function useNetworkCanvas(canvasRef) {
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let nodes = [];
    let width = 0;
    let height = 0;
    let rafId;

    function resize() {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const targetCount = Math.round((width * height) / 26000);
      nodes = Array.from({
        length: Math.max(18, Math.min(60, targetCount)),
      }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() < 0.12 ? 2.4 : 1.4,
        gold: Math.random() < 0.14,
      }));
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    function step() {
      const mouse = mouseRef.current;

      for (const n of nodes) {
        if (reduceMotion) continue;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_REPEL_DISTANCE) {
          n.x += (dx / d) * 0.6;
          n.y += (dy / d) * 0.6;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = hexToRgba(colors.green, 0.16 * (1 - d / LINK_DISTANCE));
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const dMouse = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
        if (dMouse < MOUSE_LINK_DISTANCE) {
          ctx.strokeStyle = hexToRgba(colors.gold, 0.22 * (1 - dMouse / MOUSE_LINK_DISTANCE));
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.gold
          ? hexToRgba(colors.gold, 0.85)
          : hexToRgba(colors.green, 0.7);
        ctx.fill();
      }
    }

    function loop() {
      step();
      draw();
      rafId = requestAnimationFrame(loop);
    }

    resize();
    loop();

    window.addEventListener("resize", resize);
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [canvasRef]);
}
