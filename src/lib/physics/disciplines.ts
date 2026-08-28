export type DisciplineId =
  | "particle"
  | "cosmo"
  | "astro"
  | "condensed"
  | "qinfo"
  | "gr";

export type Discipline = {
  id: DisciplineId;
  label: string;
  short: string;
  who: string;
  twoFields: string;
  cosmology: string;
  astronomy: string;
  measure: string;
  equation: string;
  equationName: string;
};

/** Not six cosmologies. Two measurements (cosmo + astro) plus four ways to write the same ℒ. */
export const WHY_SIX =
  "There are not six kinds of cosmology. There are two skies — clustering and halos — and four other physics communities who already have a name for the same objects. Particle physics writes kinetic mixing. Cosmology measures P(k). Astronomy measures r_c and lensing. BEC/AMO writes Schrödinger–Poisson. Quantum information writes ρ̂ and the PDP filter. Relativity writes Tμν and refuses modified gravity. Six dialects. One Lagrangian. The chips above only change the dictionary, not the prediction.";

export const DISCIPLINES: Discipline[] = [
  {
    id: "particle",
    label: "Particle / QFT",
    short: "Particle",
    who: "People who write Lagrangians and mixing angles. Not a sky survey.",
    twoFields:
      "The master ℒ is two U(1)s with Holdom mixing −(ε/2) Fμν F′μν plus a complex scalar. After diagonalization the visible photon oscillates into A′. The scalar’s NR envelope is fuzzy dark matter. Ω is not a new coupling: it is the coherence of the two NR envelopes, the off-diagonal of ρ̂.",
    cosmology:
      "ε is too small to move P(k). You measure m from the quantum Jeans / half-mode, the way you would read a sterile-neutrino mass from a free-streaming cutoff — except the cutoff is ħk/m, not thermal velocity. The two-field beat is the interference density, not a second mass eigenstate in the CMB.",
    astronomy:
      "The soliton is the Bose ground state of φ in the halo potential. Fringes are Re(ψ_t* ψ_d e^{iΔφ}). The photon residual is the PDP witness: mixing ε times that coherence, after the mass profile is known. Magnetar B²L² conversion is a different limit of the same ε, not used here.",
    measure:
      "m₂₂ from k½ and from r_c. Ω from extra oscillations in P(k) and from spatial fringes. ε from the photon residual only.",
    equation: "ℒ ⊃ −(ε/2) Fμν F′μν + |∂φ|² − m²|φ|²",
    equationName: "Kinetic mixing + FDM scalar",
  },
  {
    id: "cosmo",
    label: "Cosmology",
    short: "Cosmology",
    who: "People who measure the universe as a whole: P(k), Lyman-α, S₈. One of the two skies.",
    twoFields:
      "Background expansion is still ΛCDM: after the scalar starts oscillating, w_DM ≈ 0. The test is clustering. Single-field FDM is the Ω → 0 limit of the same ℒ. Two-field adds the interference density on small-scale P(k).",
    cosmology:
      "k½ ∝ m₂₂^{4/9} is the FDM cutoff. Ω adds a low-amplitude beat from 2 Re(ψ_t* ψ_d). That beat is the discriminator against WDM (smooth cutoff) and against baryonic feedback (different scale dependence). H(z) and SN Ia must not move.",
    astronomy:
      "The same m that sets k½ sets dwarf and cluster cores via Schrödinger–Poisson. If Lyman-α and r_c disagree, the Lagrangian is wrong — you cannot retune one without the other.",
    measure:
      "Lyman-α and DESI/Euclid P(k) for k½. KiDS/DES/HSC for an S₈ shift. PDP entropy S(z) is a derived diagnostic; the catalog cousin is a non-thermal photon residual.",
    equation: "P₂F(k) = P_ΛCDM(k) · T_FDM²(k; m) · [1 − α Ω sin²(k/k_beat)]",
    equationName: "Clustering transfer",
  },
  {
    id: "astro",
    label: "Astronomy",
    short: "Astronomy",
    who: "People who measure galaxies and clusters: kinematics, lensing, ICL. The other sky.",
    twoFields:
      "Each halo is a standing wave of φ, not a swarm of particles. NFW cusps become a soliton with ρ_c ∝ m²/G. The second envelope paints Re(ψ_t* ψ_d e^{iΔφ}) onto that core. If ε is open, PDP maps that cross term into a photon residual.",
    cosmology:
      "You cannot fit dwarfs without moving Lyman-α. The lock is the Klein–Gordon mass, not a halo-by-halo parameter.",
    astronomy:
      "Inner slope γ from gas or stellar kinematics in dwarfs, or from strong lensing in clusters. CDM wants γ ≈ −1. A soliton wants γ ≈ 0 inside r_c. Two-field wants γ ≈ 0 plus a periodic residual at the fringe scale of Δφ(r). Systematics: PSF, baryon cores, SIDM — not stellar interiors.",
    measure:
      "Keck/VLT kinematics. HST/JWST strong lensing. Multi-band residuals for the PDP photon witness. Resolution must beat r_c and the fringe wavelength.",
    equation: "ρ = |ψ_t|² + |ψ_d|² + 2 Re(ψ_t* ψ_d e^{iΔφ})",
    equationName: "Interference density",
  },
  {
    id: "condensed",
    label: "Condensed matter",
    short: "BEC / AMO",
    who: "People who trap ultracold atoms. Gravity is the trap. Not a cosmology.",
    twoFields:
      "Galactic Gross–Pitaevskii plus Poisson: a two-component BEC. ε is a weak Rabi / potential mixing (Φ_t + ε Φ_d). Ω is condensate coherence. The soliton is the attractive ground state. Fringes are ordinary two-condensate interference. Gravity is the trap.",
    cosmology:
      "The Jeans wavenumber at equality is the healing length, then stretched by expansion. No structure smaller than that length → P(k) cutoff.",
    astronomy:
      "r_c is the oscillator length of the gravitational trap. Changing m₂₂ is changing ħ/m. NFW is the classical-dust limit of the same trap.",
    measure:
      "r_c(M, m) scales like a Thomas–Fermi radius. Rotation curves are time-of-flight images of |ψ|². Spectral duality is the Fourier peak of the fringe.",
    equation: "i ℏ ∂t ψ = −(ℏ²/2m) ∇²ψ + m Φ ψ,   ∇²Φ = 4π G m |ψ|²",
    equationName: "Schrödinger–Poisson",
  },
  {
    id: "qinfo",
    label: "Quantum information",
    short: "Q-info",
    who: "People who write density matrices and filters. Telescopes sample one factor of ρ̂.",
    twoFields:
      "ρ̂ is the two-mode photon–dark-photon density matrix. ℒ_PDP = ∫ dt [Tr(ρ̂ Ḣ̂) + Re(ψ_t* ψ_d e^{iΔφ})] + ℒ_filter. Expansion is a time-dependent Hamiltonian. Telescopes sample the photon factor of ρ̂. ℒ_filter is photon-state reconstruction (“healing”) of a decohered residual.",
    cosmology:
      "S(z) = −Tr(ρ log ρ) is the von Neumann diagnostic. It is not a Planck parameter. It would appear as non-thermal photon correlations a single-field Boltzmann code cannot absorb.",
    astronomy:
      "An image is a measurement on the photon factor. The PDP residual is spatially locked to the dark-mode soliton. Subtract PSF and cluster light; what is left is a witness, not a proof.",
    measure:
      "S(z) is derived. The measurable is a spatially modulated photon residual whose contrast tracks Ω ε and whose scale tracks m.",
    equation: "ℒ_PDP = ∫ dt [Tr(ρ̂ Ḣ̂) + Re(ψ_t* ψ_d e^{iΔφ})] + ℒ_filter",
    equationName: "PDPBioGen extension",
  },
  {
    id: "gr",
    label: "Relativity",
    short: "GR",
    who: "People who write Einstein equations. This ℒ does not modify gravity.",
    twoFields:
      "The relativistic parent is S = ∫ d⁴x √−g [½ gμν ∂μφ ∂νφ − ½ m² φ²] + S_gravity, plus the two Maxwell terms and ε mixing. Einstein equations are unchanged; only Tμν is two-field. No modified gravity.",
    cosmology:
      "After the scalar oscillates, w_DM ≈ 0, so H(z) matches ΛCDM. Perturbations pick up quantum pressure ħ²k²/(2m² a²) and a mixing source from ε Φ. That is why H(z) is the wrong test and P(k) is the right one.",
    astronomy:
      "Lensing κ is still ∫ ∇²Φ. A cored Φ produces a cored κ. Distinguishing a soliton from baryonic contraction is lens modeling, not a new GR effect.",
    measure:
      "Background probes (SN Ia, BAO, H(z)) should agree with Planck. Structure probes should not. If both shift, you are no longer in this Lagrangian.",
    equation: "∇²Φ = 4π G m (|ψ_t|² + |ψ_d|²),   c_s² ∼ ħ² k² / (2 m² a²)",
    equationName: "Poisson + quantum pressure",
  },
];

export function getDiscipline(id: DisciplineId): Discipline {
  return DISCIPLINES.find((d) => d.id === id) ?? DISCIPLINES[1]!;
}
