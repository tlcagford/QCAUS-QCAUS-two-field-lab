/** Ford 2026 master Lagrangian and the reductions used in this lab. */

export const MASTER_L = {
  name: "Master Lagrangian",
  latex:
    "ℒ = −¼ Fμν Fμν − ¼ F′μν F′μν − (ε/2) Fμν F′μν + |∂μφ|² − m²|φ|² − V(|φ|) + ℒ_gravity",
  note: "Photon + dark-photon kinetic mixing, complex ultralight scalar (FDM), gravity. V(|φ|) may extend the quadratic mass term; the NR dynamics below are unchanged.",
};

export const RELATIVISTIC_SCALAR = {
  name: "Relativistic scalar (real form, equivalent NR dynamics)",
  latex:
    "S = ∫ d⁴x √−g [ ½ gμν ∂μφ ∂νφ − ½ m² φ² ] + S_gravity",
};

export const PDP_L = {
  name: "PDPBioGen extension",
  latex:
    "ℒ_PDP = ∫ dt [ Tr(ρ̂ Ḣ̂) + Re(ψ_t* ψ_d e^{iΔφ}) ] + ℒ_filter",
  note: "Von Neumann evolution of the mixed photon state plus the two-field interference density. ℒ_filter is the PDP Quantum Filter: coherence in, noise out. This edition uses it as a photon-channel residual, not a stellar laboratory.",
};

export type DerivationId = "master" | "kg" | "sp" | "twoField" | "pdp";

export type DerivationStep = {
  id: DerivationId;
  label: string;
  latex: string;
  body: string;
};

export const DERIVATION: DerivationStep[] = [
  {
    id: "master",
    label: "ℒ",
    latex: MASTER_L.latex,
    body: "Two U(1) field strengths with Holdom mixing ε, plus a complex scalar of mass m. Gravity is Einstein plus the two-field stress-energy. Nothing else is added to Gμν.",
  },
  {
    id: "kg",
    label: "KG",
    latex: "□φ + m² φ = 0,   φ = (ψ e^{−i m t} + ψ* e^{i m t}) / √(2m)",
    body: "Klein–Gordon from the quadratic scalar. The envelope ψ is the non-relativistic field after factoring the rest-mass oscillation. Identical to the QCAUS notes (ℏ = 1 there; restored in the Schrödinger step).",
  },
  {
    id: "sp",
    label: "SP",
    latex: "i ℏ ∂t ψ = −(ℏ²/2m) ∇²ψ + m Φ ψ,   ∇²Φ = 4π G m |ψ|²",
    body: "Schrödinger–Poisson. Self-gravity uses the consistent mass density ρ = m |ψ|². Soliton cores with ρ_c ∝ m²/G and kpc de Broglie wavelengths at m ∼ 10⁻²² eV follow from this pair, not from a new force.",
  },
  {
    id: "twoField",
    label: "2F",
    latex:
      "i ∂t ψ_t = −∇²ψ_t / (2 m_t) + (Φ_t + ε Φ_d) ψ_t    and    t ↔ d",
    body: "Two-field FDM: the NR limit of the same Lagrangian with both envelopes. Weak ε mixes the gravitational potentials. The measurable density is ρ = |ψ_t|² + |ψ_d|² + 2 Re(ψ_t* ψ_d e^{iΔφ}). Ω in this lab is the coherence of that cross term.",
  },
  {
    id: "pdp",
    label: "PDP",
    latex: PDP_L.latex,
    body: "PDPBioGen: von Neumann evolution of the mixed photon–dark-photon density matrix, plus the interference density as a reconstruction term. The photon-channel residual in the astronomical panel is this witness, not a magnetar conversion probability.",
  },
];
