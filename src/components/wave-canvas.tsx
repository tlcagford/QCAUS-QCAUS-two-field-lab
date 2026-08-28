import { useEffect, useRef } from "react";
import { useLab } from "@/lib/store";

/** Horizontal two-mode beat. ImageData, not per-cell fillRect. */
export function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const m22 = useLab((s) => s.m22);
  const omega = useLab((s) => s.omega);
  const paramsRef = useRef({ m22, omega });
  paramsRef.current = { m22, omega };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = Math.max(1, canvas.clientWidth);
      const cssH = Math.max(1, canvas.clientHeight);
      const w = Math.floor(cssW * dpr);
      const h = Math.floor(cssH * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const { m22: m, omega: om } = paramsRef.current;
      const k1 = 10.5 * Math.sqrt(m / 2.5);
      const k2 = k1 * (1.12 + 0.55 * om);
      const img = ctx.createImageData(w, h);
      const data = img.data;

      for (let y = 0; y < h; y++) {
        const yn = (y / h - 0.5) * 2;
        const envY = Math.exp(-yn * yn * 3.4);
        for (let x = 0; x < w; x++) {
          const xn = (x / w) * 2 * Math.PI;
          const p1 = Math.sin(k1 * xn - t);
          const p2 = Math.sin(k2 * xn - t * 0.93);
          const I = (p1 * p1 + p2 * p2 + 2 * om * p1 * p2) * envY;
          const v = Math.min(1, Math.max(0, 0.08 + 0.55 * I));
          const i = (y * w + x) * 4;
          data[i] = Math.round(12 + v * 228);
          data[i + 1] = Math.round(13 + v * 214);
          data[i + 2] = Math.round(16 + v * 198);
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      if (!reduce) {
        t += 0.07;
        raf = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-[72px] w-full rounded-[10px] bg-background md:h-[88px]"
      aria-label="Two-field interference beat"
    />
  );
}
