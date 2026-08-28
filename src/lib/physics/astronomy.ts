import { INSTRUMENTS } from "./constants";
import {
  fringeScaleKpc,
  interferenceDensity,
  photonResidualContrast,
  type LabParams,
} from "./two-field";
import type { Reach } from "./cosmology";

const PI = Math.PI;
const RHO_CRIT = 277.2;

export function haloMass(params: LabParams): number {
  return 10 ** params.haloMassLog;
}

export function rVirKpc(mHalo: number): number {
  const rho = 200 * RHO_CRIT;
  return Math.cbrt((3 * mHalo) / (4 * PI * rho));
}

export function nfwConcentration(mHalo: number): number {
  return 10 * Math.pow(mHalo / 1e12, -0.1);
}

/** Schive, Chiueh & Broadhurst (2014) soliton–halo relation, kpc.
 *  r_c = 1.6 kpc × m₂₂⁻¹ × (M_sol / 10⁹ M_⊙)⁻¹/³
 */
export function solitonCoreKpc(m22: number, mHalo: number): number {
  const mSol = solitonMass(m22, mHalo);
  return (1.6 / Math.max(m22, 0.15)) * Math.pow(Math.max(mSol / 1e9, 1e-6), -1 / 3);
}

export function solitonMass(m22: number, mHalo: number): number {
  return (1.25e9 / Math.max(m22, 0.15)) * Math.pow(mHalo / 1e12, 1 / 3);
}

function nfwAlpha(c: number): number {
  return Math.log(1 + c) - c / (1 + c);
}

export function nfwDensity(r: number, mHalo: number): number {
  const rvir = rVirKpc(mHalo);
  const c = nfwConcentration(mHalo);
  const rs = rvir / c;
  const rhoS = mHalo / (4 * PI * rs ** 3 * nfwAlpha(c));
  const x = Math.max(r, 1e-4) / rs;
  return rhoS / (x * (1 + x) ** 2);
}

/** Schive soliton fitting function. */
export function solitonDensity(r: number, m22: number, mHalo: number): number {
  const rc = solitonCoreKpc(m22, mHalo);
  const ms = solitonMass(m22, mHalo);
  const rho0 = ms / ((4 / 3) * PI * (2.2 * rc) ** 3);
  const x = Math.max(r, 0) / Math.max(rc, 1e-4);
  return rho0 / (1 + 0.091 * x * x) ** 8;
}

/**
 * Two-field density from the NR reduction:
 * split the soliton envelope into ψ_t, ψ_d, then add the interference term.
 * ρ = |ψ_t|² + |ψ_d|² + 2 Ω Re(ψ_t* ψ_d e^{iΔφ})
 */
export function twoFieldDensity(r: number, params: LabParams): number {
  const mHalo = haloMass(params);
  const base = solitonDensity(r, params.m22, mHalo);
  const ampT = Math.sqrt(Math.max(base * 0.5, 0));
  const ampD = Math.sqrt(Math.max(base * 0.5, 0));
  const lam = fringeScaleKpc(params.m22, params.omega);
  const deltaPhi = (2 * PI * r) / Math.max(lam, 0.05);
  return Math.max(interferenceDensity(ampT, ampD, deltaPhi, params.omega), 0);
}

export type ProfilePoint = {
  r: number;
  nfw: number;
  fdm: number;
  twoField: number;
  vNfw: number;
  vTwo: number;
};

function enclosed(
  densityAt: (r: number) => number,
  r: number,
  steps = 24,
): number {
  let m = 0;
  const dr = r / steps;
  for (let i = 0; i < steps; i++) {
    const ri = (i + 0.5) * dr;
    m += 4 * PI * ri * ri * densityAt(ri) * dr;
  }
  return m;
}

function vCirc(mEnc: number, r: number): number {
  if (r <= 0) return 0;
  return Math.sqrt(Math.max((4.3e-3 * mEnc) / r, 0));
}

export function radialProfile(params: LabParams, n = 64): ProfilePoint[] {
  const mHalo = haloMass(params);
  const rvir = rVirKpc(mHalo);
  const rMax = Math.max(8, rvir * 0.45);
  const out: ProfilePoint[] = [];
  for (let i = 0; i < n; i++) {
    const r =
      Math.exp(Math.log(0.04) + (Math.log(rMax) - Math.log(0.04)) * (i / (n - 1)));
    const nfw = nfwDensity(r, mHalo);
    const fdm = solitonDensity(r, params.m22, mHalo);
    const two = twoFieldDensity(r, params);
    const mNfw = enclosed((x) => nfwDensity(x, mHalo), r);
    const mTwo = enclosed((x) => twoFieldDensity(x, params), r);
    out.push({
      r,
      nfw,
      fdm,
      twoField: two,
      vNfw: vCirc(mNfw, r),
      vTwo: vCirc(mTwo, r),
    });
  }
  return out;
}

export function innerSlope(
  densityAt: (r: number) => number,
  r0: number,
): number {
  const r1 = r0 * 0.7;
  const r2 = r0 * 1.4;
  const d1 = Math.max(densityAt(r1), 1e-12);
  const d2 = Math.max(densityAt(r2), 1e-12);
  return Math.log(d2 / d1) / Math.log(r2 / r1);
}

export function coreReach(params: LabParams): {
  rc: number;
  fringe: number;
  keck: Reach;
  jwst: Reach;
  contrast: number;
} {
  const mHalo = haloMass(params);
  const rc = solitonCoreKpc(params.m22, mHalo);
  const fringe = fringeScaleKpc(params.m22, params.omega);
  const bin = (res: number, scale: number): Reach => {
    if (scale > res * 4) return "yes";
    if (scale > res * 1.4) return "marginal";
    return "no";
  };
  return {
    rc,
    fringe,
    keck: bin(INSTRUMENTS.keck.resKpc, rc),
    jwst: bin(INSTRUMENTS.jwst.resKpc, Math.min(rc, fringe)),
    contrast: photonResidualContrast(params.omega, params.logEpsilon),
  };
}

export function blueHaloHint(params: LabParams): number {
  return photonResidualContrast(params.omega, params.logEpsilon);
}
