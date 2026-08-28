/**
 * Laboratory analog of the two-field + PDP filter as a link.
 * This is not Holdom conversion and not a dark-photon modem.
 * Ω is still mode coherence. Isolation is a lab analog of leakage,
 * not cosmological ε (~10⁻¹⁰), which cannot carry a message.
 */

export type MediumId = "laser" | "fiber" | "radio";

export type Medium = {
  id: MediumId;
  label: string;
  carrier: string;
  how: string[];
  limits: string[];
  killer: string;
  rangeMin: number;
  rangeMax: number;
  rangeDefault: number;
  /** km at which turbulence / PMD / multipath cuts Ω by 1/e. */
  coherenceKm: number;
  snr1kmDb: number;
  pathExp: number;
};

export const MEDIA: Medium[] = [
  {
    id: "laser",
    label: "Laser (free space)",
    carrier: "1550 nm split DFB, bits on Δφ, T on the aperture, D local or orthogonal pol",
    how: [
      "Split one 1550 nm DFB. Phase-modulate the relative arm (Δφ = 0 or π for BPSK).",
      "Send T with a noise-like envelope so |ψ_t|² is not the message. Keep D as the other polarization, or regenerate D at the receiver from a shared PRN seed.",
      "Receive with a 90° optical hybrid and balanced photodiodes: that product is Re(ψ_t* ψ_d e^{iΔφ}).",
      "PDP is DSP: PLL + a Wiener/Kalman update on the off-diagonal of ρ̂ over many symbols. That is the healing loop.",
    ],
    limits: [
      "Turbulence and scintillation kill Ω on a few km in daytime. Fog and rain kill SNR. Pointing jitter looks like extra phase noise.",
      "Eye-safety and beam control. Daylight background on the photodiodes.",
      "If an eavesdropper has the LO seed and a telescope in the beam, stealth is gone. Intensity-only taps see little if isolation is high.",
    ],
    killer: "Atmospheric coherence, not laser power.",
    rangeMin: 0.2,
    rangeMax: 40,
    rangeDefault: 4,
    coherenceKm: 3.5,
    snr1kmDb: 28,
    pathExp: 2,
  },
  {
    id: "fiber",
    label: "Fiber",
    carrier: "Same two modes on polarization or two DWDM λ, 1550 nm",
    how: [
      "Same split laser. Put T and D on H/V polarization, or on two dense wavelengths.",
      "Standard EDFA span. Receiver is a coherent DSP stack (the telecom 90° hybrid already computes the cross term).",
      "PDP here is PMD/phase tracking: estimate ρ̂ and rotate back onto the interference axis as the fiber wanders.",
      "Do not expect stealth against the fiber owner. They see watts. Stealth is only against a tap that is in the wrong basis.",
    ],
    limits: [
      "Best Ω of the three — the fiber holds optical phase. Polarization-mode dispersion and Kerr mixing are the analog of ε leakage.",
      "A coherent tap in the right basis recovers Δφ. This is not cryptography. Put real encryption on the bits.",
      "Nonlinear crosstalk grows with launch power. Lower power, better isolation, less analog of ε.",
    ],
    killer: "A right-basis tap, not loss.",
    rangeMin: 1,
    rangeMax: 200,
    rangeDefault: 40,
    coherenceKm: 90,
    snr1kmDb: 42,
    pathExp: 0.18,
  },
  {
    id: "radio",
    label: "Radio",
    carrier: "Two locked SDRs. I/Q is ψ_t. Shared LO / PRN is ψ_d",
    how: [
      "Two GPS-disciplined SDRs (USRP or equivalent). Encode bits on the relative RF phase, spread with a PRN so |T|² sits near the noise.",
      "The intended receiver recreates D from the same PRN and mixes. That mix is the interference density.",
      "PDP is a Costas/PLL loop plus a covariance tracker on the I/Q off-diagonal (the radio version of Tr(ρ̂ Ḣ̂)).",
      "This is covert coherent spread-spectrum. GPS already does half of it. The two-field step is: the public intensity is not the message.",
    ],
    limits: [
      "Multipath and Doppler destroy Δφ. Urban Ω falls in a few km. Oscillator phase noise sets a floor even in free space.",
      "Regulators, jamming, and a bigger dish on the other hill. Isolation is image rejection and antenna polarization, typically 25–40 dB.",
      "Below-noise stealth fails if Eve integrates longer than you do, or steals the PRN.",
    ],
    killer: "Multipath and the other oscillator.",
    rangeMin: 0.3,
    rangeMax: 80,
    rangeDefault: 8,
    coherenceKm: 6,
    snr1kmDb: 32,
    pathExp: 2.2,
  },
];

export function getMedium(id: MediumId): Medium {
  return MEDIA.find((m) => m.id === id) ?? MEDIA[0]!;
}

function erfc(x: number): number {
  const z = Math.abs(x);
  const t = 1 / (1 + 0.47047 * z);
  const poly = t * (0.3480242 + t * (-0.0958798 + t * 0.7478556));
  const y = poly * Math.exp(-z * z);
  return x >= 0 ? y : 2 - y;
}

/** BPSK bit-error from linear SNR. */
export function berBpsk(snrLin: number): number {
  if (snrLin <= 0) return 0.5;
  return Math.min(0.5, 0.5 * erfc(Math.sqrt(snrLin)));
}

export function channelOmega(medium: Medium, rangeKm: number): number {
  const x = rangeKm / Math.max(medium.coherenceKm, 0.2);
  if (medium.id === "fiber") return Math.exp(-x * x);
  if (medium.id === "laser") return Math.exp(-Math.pow(x, 1.2));
  return 1 / Math.sqrt(1 + x * x);
}

export function snrLin(medium: Medium, rangeKm: number): number {
  const r = Math.max(rangeKm, medium.rangeMin);
  const db = medium.snr1kmDb - 10 * medium.pathExp * Math.log10(r);
  return 10 ** (db / 10);
}

export type LinkResult = {
  omegaTx: number;
  omegaCh: number;
  omegaRx: number;
  omegaPdp: number;
  snr: number;
  leak: number;
  berIntensity: number;
  berTwo: number;
  berPdp: number;
  berEve: number;
  rateFrac: number;
};

/**
 * Intensity receiver sees leaked D only.
 * Two-field uses Ω² × SNR in the cross term.
 * PDP heals a fraction of lost coherence by integrating the off-diagonal.
 */
export function evaluateLink(
  omegaTx: number,
  isolationDb: number,
  medium: Medium,
  rangeKm: number,
): LinkResult {
  const omegaCh = channelOmega(medium, rangeKm);
  const omegaRx = Math.max(0, Math.min(1, omegaTx * omegaCh));
  const snr = snrLin(medium, rangeKm);
  const leak = 10 ** (-isolationDb / 10);
  const heal = snr / (snr + 3.2);
  const omegaPdp = Math.min(1, omegaRx + (1 - omegaRx) * 0.38 * heal);

  const berIntensity = berBpsk(snr * leak);
  const berTwo = berBpsk(snr * omegaRx * omegaRx);
  const berPdp = berBpsk(snr * omegaPdp * omegaPdp);
  const berEve = berBpsk(snr * leak * 0.6);
  const rateFrac = Math.max(0.02, omegaPdp * omegaPdp);

  return {
    omegaTx,
    omegaCh,
    omegaRx,
    omegaPdp,
    snr,
    leak,
    berIntensity,
    berTwo,
    berPdp,
    berEve,
    rateFrac,
  };
}

export function berCurve(
  omegaTx: number,
  isolationDb: number,
  medium: Medium,
  n = 36,
): { r: number; intensity: number; two: number; pdp: number }[] {
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const r =
      medium.rangeMin *
      Math.pow(medium.rangeMax / medium.rangeMin, t);
    const e = evaluateLink(omegaTx, isolationDb, medium, r);
    out.push({
      r,
      intensity: Math.max(e.berIntensity, 1e-8),
      two: Math.max(e.berTwo, 1e-8),
      pdp: Math.max(e.berPdp, 1e-8),
    });
  }
  return out;
}

export type QkdResult = {
  viable: boolean;
  reason: string;
  iBob: number;
  iEve: number;
  iEveApparent: number;
  keyBits: number;
  abort: boolean;
  payloadSafe: boolean;
  healTrap: boolean;
};

/**
 * CV-QKD analog on the same two modes.
 * Key is distilled from the quadratures of Re(ψ_t* ψ_d).
 * Ciphertext may then ride the interference.
 * Healing the key quadratures hides Eve — that is a break, not a feature.
 */
export function evaluateQkd(link: LinkResult, medium: Medium, eveTap: number, healKey: boolean): QkdResult {
  if (medium.id === "radio") {
    return {
      viable: false,
      reason:
        "Thermal occupancy at radio frequencies is huge. Optical CV-QKD does not run on an RF carrier without cryogenics. Use a post-quantum KEM on radio; put QKD on fiber or laser.",
      iBob: 0,
      iEve: 0,
      iEveApparent: 0,
      keyBits: 0,
      abort: true,
      payloadSafe: false,
      healTrap: false,
    };
  }

  const snrB = link.snr * link.omegaRx * link.omegaRx;
  const iBob = 0.5 * Math.log2(1 + Math.max(snrB, 0));
  const eve = Math.min(1, Math.max(0, eveTap));
  const snrE = link.snr * (link.leak + eve * (1 - link.leak));
  const iEve = 0.5 * Math.log2(1 + Math.max(snrE, 0));
  const apparentEve = healKey ? iEve * (1 - 0.55 * link.omegaPdp) : iEve;
  const recon = 0.12;
  const keyBits = Math.max(0, iBob - apparentEve - recon);
  const realKey = Math.max(0, iBob - iEve - recon);
  const abort = apparentEve > iBob * 0.82 || keyBits <= 0;
  const healTrap = healKey && eve > 0.08 && !abort && realKey <= 0;
  const payloadSafe = !abort && realKey > 0 && !healTrap;

  let reason = "Key from the two-mode quadratures. Ciphertext rides the interference.";
  if (abort) reason = "Excess noise in ρ̂ is above the channel model. QKD aborts. No key, no payload.";
  if (healTrap)
    reason =
      "You healed the key quadratures. Apparent noise dropped, so the key looks good — but Eve already copied D. That is a break.";

  return {
    viable: true,
    reason,
    iBob,
    iEve,
    iEveApparent: apparentEve,
    keyBits: healTrap ? keyBits : realKey,
    abort,
    payloadSafe,
    healTrap,
  };
}

