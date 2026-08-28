import { H, NS, OMEGA_M, SIGMA8_PLANCK, SURVEYS } from "./constants";
import { fdmTransfer, kHalfMode, twoFieldTransfer, vonNeumannEntropy } from "./two-field";
import type { LabParams } from "./two-field";

/** BBKS transfer, k in h Mpc⁻¹. Shape-level; not a Boltzmann solver. */
function bbksT(kH: number): number {
  const q = kH / (OMEGA_M * H);
  if (q <= 0) return 1;
  const ln = Math.log(1 + 2.34 * q) / (2.34 * q);
  const p =
    1 +
    3.89 * q +
    (16.1 * q) ** 2 +
    (5.46 * q) ** 3 +
    (6.71 * q) ** 4;
  return ln * p ** -0.25;
}

export type SpectrumPoint = {
  k: number;
  lcdm: number;
  fdm: number;
  twoField: number;
};

export function matterSpectrum(params: LabParams, n = 96): SpectrumPoint[] {
  const out: SpectrumPoint[] = [];
  const kMin = 3e-3;
  const kMax = 12;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const k = kMin * Math.pow(kMax / kMin, t);
    const tBbks = bbksT(k);
    const pLcdm = k ** NS * tBbks * tBbks * 1.8e3;
    const tf = fdmTransfer(k * H, params.m22);
    const t2 = twoFieldTransfer(k * H, params.m22, params.omega);
    out.push({
      k,
      lcdm: Math.max(pLcdm, 1e-8),
      fdm: Math.max(pLcdm * tf * tf, 1e-8),
      twoField: Math.max(pLcdm * t2 * t2, 1e-8),
    });
  }
  return out;
}

function topHatW(x: number): number {
  if (x < 1e-5) return 1;
  return (3 * (Math.sin(x) - x * Math.cos(x))) / x ** 3;
}

/** Relative σ₈ from a discrete P(k). Illustrative, not CAMB. */
export function sigma8Ratio(params: LabParams): { fdm: number; twoField: number } {
  const spec = matterSpectrum(params, 160);
  let iLcdm = 0;
  let iFdm = 0;
  let iTwo = 0;
  for (let i = 1; i < spec.length; i++) {
    const a = spec[i - 1]!;
    const b = spec[i]!;
    const kMid = 0.5 * (a.k + b.k);
    const dk = b.k - a.k;
    const w = topHatW(kMid * 8);
    const kern = kMid * kMid * w * w * dk;
    iLcdm += 0.5 * (a.lcdm + b.lcdm) * kern;
    iFdm += 0.5 * (a.fdm + b.fdm) * kern;
    iTwo += 0.5 * (a.twoField + b.twoField) * kern;
  }
  const sLcdm = Math.sqrt(Math.max(iLcdm, 1e-30));
  return {
    fdm: SIGMA8_PLANCK * Math.sqrt(Math.max(iFdm, 1e-30)) / sLcdm,
    twoField: SIGMA8_PLANCK * Math.sqrt(Math.max(iTwo, 1e-30)) / sLcdm,
  };
}

export function hubble(z: number): number {
  const e = Math.sqrt(OMEGA_M * (1 + z) ** 3 + (1 - OMEGA_M));
  return 67.4 * e;
}

export type EntropyPoint = { z: number; s: number };

export function entropyHistory(params: LabParams, n = 48): EntropyPoint[] {
  const out: EntropyPoint[] = [];
  for (let i = 0; i < n; i++) {
    const z = 30 * (i / (n - 1));
    out.push({ z, s: vonNeumannEntropy(params.omega, z) });
  }
  return out;
}

export type Reach = "yes" | "marginal" | "no";

export function clusteringReach(m22: number): {
  kHalf: number;
  desi: Reach;
  lya: Reach;
} {
  const kHalf = kHalfMode(m22);
  const bin = (win: { kMin: number; kMax: number }): Reach => {
    if (kHalf > win.kMin * 1.2 && kHalf < win.kMax * 0.8) return "yes";
    if (kHalf > win.kMin * 0.6 && kHalf < win.kMax * 1.4) return "marginal";
    return "no";
  };
  return { kHalf, desi: bin(SURVEYS.desi), lya: bin(SURVEYS.lya) };
}

export function s8TensionNote(s8: number): string {
  const kids = 0.76;
  if (s8 < kids + 0.015) {
    return "Falls toward the weak-lensing S₈ side of the Planck–lensing tension.";
  }
  if (s8 > SIGMA8_PLANCK - 0.01) {
    return "Stays on the Planck CMB clustering amplitude. This m₂₂ does not move S₈.";
  }
  return "Partial shift toward weak-lensing S₈, still degenerate with baryonic feedback.";
}
