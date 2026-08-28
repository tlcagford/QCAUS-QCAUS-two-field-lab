/** Shared constants. Planck 2018 TT,TE,EE+lowE+lensing baseline where noted. */

export const H0 = 67.4; // km s⁻¹ Mpc⁻¹
export const H = 0.674;
export const OMEGA_M = 0.315;
export const OMEGA_L = 0.685;
export const NS = 0.965;
export const SIGMA8_PLANCK = 0.811;
export const AS_PIVOT = 0.05; // Mpc⁻¹

/** Illustrative survey windows used as measurement rulers, not catalog limits. */
export const SURVEYS = {
  desi: { kMin: 0.02, kMax: 0.4, label: "DESI / Euclid galaxy P(k)" },
  lya: { kMin: 0.2, kMax: 5, label: "Lyman-α forest" },
  cmb: { kMin: 1e-3, kMax: 0.15, label: "Planck / ACT CMB" },
  weakLensing: { kMin: 0.01, kMax: 1.0, label: "KiDS / DES / HSC S₈" },
} as const;

export const INSTRUMENTS = {
  jwst: { resKpc: 0.12, label: "JWST NIRCam at cluster redshift" },
  hst: { resKpc: 0.25, label: "HST ACS strong lensing" },
  keck: { resKpc: 0.08, label: "Keck / VLT dwarf kinematics" },
  rubin: { resKpc: 0.6, label: "Rubin wide-field imaging" },
} as const;

export const M22_MIN = 0.4;
export const M22_MAX = 16;
export const M22_DEFAULT = 2.5;
export const OMEGA_DEFAULT = 0.35;
export const LOG_EPS_DEFAULT = -10;
export const HALO_LOG_DEFAULT = 11.2;
export const Z_DEFAULT = 0.3;
