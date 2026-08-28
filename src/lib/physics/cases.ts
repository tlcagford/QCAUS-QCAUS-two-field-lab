export type SkyTestId = "mass" | "omega" | "epsilon";

export type SkyTest = {
  id: SkyTestId;
  param: "m" | "Ω" | "ε";
  paramName: string;
  title: string;
  oneLine: string;
  object: string;
  telescope: "HST" | "JWST";
  instrument: string;
  image: string;
  credit: string;
  fovArcmin: number;
  kpcPerArcsec: number;
  cx: number;
  cy: number;
  haloMassLog: number;
  redshift: number;
  distanceNote: string;
  measures: string;
  significance: string;
  how: string;
  vsOthers: string;
  killsIf: string;
  outputHint: string;
};

export const SKY_TESTS: SkyTest[] = [
  {
    id: "mass",
    param: "m",
    paramName: "boson mass",
    title: "Test 1 · weigh m in a dwarf",
    oneLine:
      "The same Klein–Gordon mass that cuts P(k) at k½ must set the soliton core in a nearby dwarf.",
    object: "I Zwicky 18",
    telescope: "HST",
    instrument: "ACS",
    image: "/sky/izw18.jpg",
    credit: "NASA, ESA, Y. Izotov & T. Thuan. Hubble ACS, 2007.",
    fovArcmin: 2.48,
    kpcPerArcsec: 0.088,
    cx: 0.38,
    cy: 0.52,
    haloMassLog: 8.8,
    redshift: 0.0025,
    distanceNote: "18 Mpc · 13 kpc across this frame",
    measures:
      "Fit the inner stellar or gas kinematics (Keck/VLT) and the surface density. A Schrödinger–Poisson soliton is cored, γ ≈ 0 inside r_c, then steepens. r_c(M_halo, m) is the Schive relation. Cosmology’s twin is k½ from the Lyman-α forest. One number has to fit both.",
    significance:
      "This is the lock. Dark-matter models usually get a free core per galaxy. Here the core is a particle mass. If I Zw 18 wants m₂₂ ≈ 8 and Lyman-α wants m₂₂ ≈ 1, the Lagrangian is wrong — you are not allowed a second mass. That is what a measurable connection is for: a way to be wrong.",
    how:
      "Circle on the image is the predicted r_c for this halo at the current m. Raise m, the circle shrinks (more quantum pressure at smaller λ_dB). NFW has no circle to draw. Single-field FDM draws the same circle and then stops.",
    vsOthers:
      "ΛCDM/NFW: cusp, no preferred r_c. WDM: cutoff in P(k), still a cusp in halos. SIDM: a core, but it does not track k½. Single-field FDM: same r_c, no fringes, no photon residual. Two-field: this r_c plus Tests 2 and 3.",
    killsIf:
      "r_c from dwarfs and k½ from Lyman-α disagree by more than the Schive scatter. Or H(z) moves — this ℒ does not modify background expansion.",
    outputHint: "m from r_c here must equal m from k½ in the cosmological panel.",
  },
  {
    id: "omega",
    param: "Ω",
    paramName: "envelope coherence",
    title: "Test 2 · find Ω in a lensing cluster",
    oneLine:
      "Ω is not a second particle. It is whether the two envelopes are coherent, painted as fringes on the soliton.",
    object: "SMACS 0723",
    telescope: "JWST",
    instrument: "NIRCam",
    image: "/sky/smacs0723.jpg",
    credit: "NASA, ESA, CSA, STScI. Webb First Deep Field, 2022.",
    fovArcmin: 2.4,
    kpcPerArcsec: 5.24,
    cx: 0.42,
    cy: 0.48,
    haloMassLog: 14.8,
    redshift: 0.39,
    distanceNote: "z = 0.39 · ~750 kpc across this frame",
    measures:
      "Weak and strong lensing map κ ∝ ∇²Φ. After the smooth soliton is subtracted, two-field leftover is periodic at the fringe scale of Re(ψ_t* ψ_d e^{iΔφ}). Cosmology’s twin is a low-amplitude beat on P(k) at k_beat(m, Ω). Cluster cores are physically small (Schive: r_c shrinks in heavy halos), so this is a JWST/HST job, not a dwarf-star-count job.",
    significance:
      "This is how you tell two-field from ordinary FDM. Same mass, same core, extra spatial period. WDM can fake a cutoff; it cannot fake a core plus a fringe. SIDM can fake a core; it cannot lock that fringe to the Lyman-α beat. Ω is the off-diagonal of ρ̂, the same coherence the PDP filter uses.",
    how:
      "Dashed rings are 1, 2, 3 fringe wavelengths around the BCG. Ω = 0: rings vanish (single-field). Cluster r_c is a small circle inside them. If the rings are bigger than a resolution element, NIRCam can in principle see the residual in a mass model — not in the pretty picture by eye.",
    vsOthers:
      "ΛCDM: smooth NFW κ, no rings. Single-field FDM: one core, no rings. Two-field: core plus rings whose period tracks m and whose contrast tracks Ω.",
    killsIf:
      "A clean lensing residual periodic at the predicted scale is absent while P(k) shows the beat — or the reverse. The two Ω’s have to match.",
    outputHint: "Ω from fringes here must equal Ω from the beat on P(k).",
  },
  {
    id: "epsilon",
    param: "ε",
    paramName: "kinetic mixing",
    title: "Test 3 · sense ε in leftover photons",
    oneLine:
      "ε mixes Aμ with A′μ. After the mass is known, a photon residual locked to the interference density is the PDP witness.",
    object: "MACS J0416.1–2403",
    telescope: "HST",
    instrument: "ACS Frontier Fields",
    image: "/sky/macsj0416.jpg",
    credit: "NASA, ESA, HST Frontier Fields. Jauzac & Kneib.",
    fovArcmin: 3.38,
    kpcPerArcsec: 5.37,
    cx: 0.43,
    cy: 0.47,
    haloMassLog: 14.9,
    redshift: 0.396,
    distanceNote: "z = 0.40 · ~1.1 Mpc across this frame",
    measures:
      "Subtract member galaxies, the intracluster light, and the PSF. What you are allowed to call a candidate is leftover surface brightness that (i) traces the soliton, (ii) has contrast ~ Ω ε, (iii) does not appear in a massless passband the same way. Cosmology does not help: ε is too small to move P(k). This is a photon-channel-only test. ℒ_PDP is the filter that reconstructs that decohered leftover.",
    significance:
      "Single-field FDM is dark. Two-field is allowed a leak into light because Holdom mixing is already in ℒ. That is the only reason a Hubble or Webb image can test a dark-sector wave. It is also the easiest test to fake with dust, ICL, or a bad subtraction — which is why it comes last, after m and Ω are known from Tests 1 and 2.",
    how:
      "The filled disc is the predicted residual region, opacity set by the current ε and Ω. ε does not change r_c. Slide log₁₀ε: contrast changes, the mass map does not. Magnetar conversion is a different limit of the same ε and is not used on this cluster.",
    vsOthers:
      "ΛCDM, WDM, SIDM, single-field FDM: no photon residual tied to a dark interference term. Two-field: a contrast prediction, not a detection, and only after the mass profile is known.",
    killsIf:
      "A residual with the right scale and the wrong contrast (or the reverse), once m and Ω are fixed by the other two tests. Or a residual that appears where there is no soliton.",
    outputHint: "ε is measured only here. P(k) must stay still while this contrast moves.",
  },
];

export function getSkyTest(id: SkyTestId): SkyTest {
  return SKY_TESTS.find((t) => t.id === id) ?? SKY_TESTS[0]!;
}

export function fovWidthKpc(t: SkyTest): number {
  return t.fovArcmin * 60 * t.kpcPerArcsec;
}
