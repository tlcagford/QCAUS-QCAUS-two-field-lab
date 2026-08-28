import { useEffect, useRef } from "react";
import { nfwDensity, solitonDensity, twoFieldDensity, haloMass } from "@/lib/physics/astronomy";
import { useLab } from "@/lib/store";

export function DensityMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const m22 = useLab((s) => s.m22);
  const omega = useLab((s) => s.omega);
  const logEpsilon = useLab((s) => s.logEpsilon);
  const haloMassLog = useLab((s) => s.haloMassLog);
  const redshift = useLab((s) => s.redshift);
  const theories = useLab((s) => s.theories);
  const params = { m22, omega, logEpsilon, haloMassLog, redshift };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const n = 88;
    const mHalo = haloMass(params);
    const rMax = 12;
    const logMax = Math.log10(nfwDensity(0.08, mHalo) * 1.4);

    ctx.fillStyle = "#090a0c";
    ctx.fillRect(0, 0, w, h);

    const leftTheory = theories.nfw ? "nfw" : theories.fdm ? "fdm" : "two";
    const rightTheory = theories.twoField ? "two" : theories.fdm ? "fdm" : "nfw";

    const dens = (kind: string, r: number) => {
      if (kind === "nfw") return nfwDensity(r, mHalo);
      if (kind === "fdm") return solitonDensity(r, params.m22, mHalo);
      return twoFieldDensity(r, params);
    };

    const dw = w / n;
    const dh = h / n;
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        const x = (i / n - 0.5) * 2 * rMax;
        const y = (j / n - 0.5) * 2 * rMax;
        const r = Math.hypot(x, y);
        const kind = i < n / 2 ? leftTheory : rightTheory;
        const rho = dens(kind, Math.max(r, 0.05));
        const v = Math.min(1, Math.max(0, (Math.log10(rho + 1e-6) - (logMax - 4.2)) / 4.2));
        const steel = kind === "two";
        const R = Math.round(10 + v * (steel ? 232 : 140));
        const G = Math.round(11 + v * (steel ? 216 : 150));
        const B = Math.round(13 + v * (steel ? 198 : 175));
        ctx.fillStyle = `rgb(${R},${G},${B})`;
        ctx.fillRect(i * dw, j * dh, dw + 0.6, dh + 0.6);
      }
    }

    ctx.strokeStyle = "rgba(236,232,225,0.18)";
    ctx.beginPath();
    ctx.moveTo(w / 2, 8);
    ctx.lineTo(w / 2, h - 8);
    ctx.stroke();

    ctx.font = "500 11px 'IBM Plex Sans', sans-serif";
    ctx.fillStyle = "#9b968c";
    ctx.fillText(leftTheory === "nfw" ? "NFW cusp" : leftTheory === "fdm" ? "FDM soliton" : "Two-field", 10, 18);
    ctx.textAlign = "right";
    ctx.fillText(
      rightTheory === "two" ? "Two-field" : rightTheory === "fdm" ? "FDM soliton" : "NFW cusp",
      w - 10,
      18,
    );
  }, [params, theories]);

  return (
    <canvas
      ref={canvasRef}
      className="h-[200px] w-full rounded-[12px] bg-background md:h-[240px]"
      aria-label="Halo density comparison, NFW on the left and two-field on the right"
    />
  );
}
