/**
 * Ford 2026 two-field reduction of the master Lagrangian.
 *
 * Photons Aμ and dark photons A′μ mix by ε (Holdom).
 * The ultralight scalar φ → NR envelope ψ (FDM).
 * Two envelopes ψ_t, ψ_d are the light–dark duality.
 * Ω is the coherence of Re(ψ_t* ψ_d e^{iΔφ}), i.e. the off-diagonal of ρ̂.
 *
 * Stellar / magnetar B² L² conversion is out of this edition.
 * Cosmological and astronomical measurements only.
 */

export type LabParams = {
  m22: number;
  omega: number;
  logEpsilon: number;
  haloMassLog: number;
  redshift: number;
};

export function epsilonFromLog(logEpsilon: number): number {
  return 10 ** logEpsilon;
}

/** Hu, Barkana, Gruzinov (2000) Jeans wavenumber at equality, Mpc⁻¹. */
export function kJeansEq(m22: number): number {
  return 9 * Math.sqrt(Math.max(m22, 1e-6));
}

/** Half-mode of the FDM transfer, h Mpc⁻¹. */
export function kHalfMode(m22: number): number {
  return 4.5 * Math.pow(Math.max(m22, 1e-6), 4 / 9);
}

/**
 * kpc-scale de Broglie wavelength at v ~ 200 km/s.
 * λ = h/(m v) ≈ 0.48 kpc × m₂₂⁻¹ at that speed.
 */
export function deBroglieKpc(m22: number, vKms = 200): number {
  return (0.48 / Math.max(m22, 0.05)) * (200 / vKms);
}

export function fdmTransfer(kMpc: number, m22: number): number {
  const kJ = kJeansEq(m22);
  const x = 1.61 * Math.pow(Math.max(m22, 1e-6), 1 / 18) * (kMpc / kJ);
  return Math.cos(x ** 3) / (1 + x ** 8);
}

/**
 * Two-field beat on P(k) from the interference density.
 * Ω = 0 recovers single-field FDM. ε does not move P(k) at realistic values.
 */
export function twoFieldTransfer(kMpc: number, m22: number, omega: number): number {
  const t = fdmTransfer(kMpc, m22);
  const kBeat = 0.28 * Math.sqrt(Math.max(m22, 1e-6)) * (0.6 + 1.8 * omega);
  const beat = 1 - 0.42 * omega * Math.sin(kMpc / Math.max(kBeat, 1e-4)) ** 2;
  return t * beat;
}

/** Spatial period of Re(ψ_t* ψ_d e^{iΔφ}), kpc. */
export function fringeScaleKpc(m22: number, omega: number): number {
  return (0.85 / Math.max(m22, 0.2)) * (1.1 - 0.35 * omega);
}

/**
 * Interference density from the two-field NR reduction:
 * ρ = |ψ_t|² + |ψ_d|² + 2 Ω Re(ψ_t* ψ_d e^{iΔφ})
 * Amplitudes here are real; phase is Δφ.
 */
export function interferenceDensity(
  ampT: number,
  ampD: number,
  deltaPhi: number,
  omega: number,
): number {
  return ampT * ampT + ampD * ampD + 2 * omega * ampT * ampD * Math.cos(deltaPhi);
}

/** Weak-mixing photon residual (no B-field). Contrast, not a mass component. */
export function photonResidualContrast(omega: number, logEpsilon: number): number {
  const eps = epsilonFromLog(logEpsilon);
  return Math.min(1, omega * Math.pow(eps / 1e-10, 0.15));
}

/**
 * PDPBioGen witness: Tr(ρ̂ log) entropy plus interference contrast.
 * This is ℒ_PDP evaluated as a number, not a catalog observable.
 */
export function pdpWitness(omega: number, logEpsilon: number, redshift: number): number {
  const s = vonNeumannEntropy(omega, redshift);
  const inter = photonResidualContrast(omega, logEpsilon);
  return Math.min(1, 0.55 * inter + 0.45 * (1 - s));
}

export function vonNeumannEntropy(omega: number, redshift: number): number {
  const damp = Math.exp(-redshift / 18);
  const off = Math.min(0.49, 0.5 * omega * damp);
  const a = 0.5 + off;
  const b = 0.5 - off;
  const slog = (x: number) => (x <= 1e-12 ? 0 : -x * Math.log(x));
  return (slog(a) + slog(b)) / Math.LN2;
}
