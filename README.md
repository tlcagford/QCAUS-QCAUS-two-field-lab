# QCAUS · two-field lab

Tony Eugene Ford. Interactive lab for the Ford 2026 two-field Lagrangian: one mass, one coherence, one mixing angle, tested on two skies, then used as a two-mode optical analog.

**Live:** [qcaus-qcaus.vercel.app](https://qcaus-qcaus.vercel.app/)  
**Code:** [github.com/tlcagford/QCAUS-QCAUS-](https://github.com/tlcagford/QCAUS-QCAUS-)  
**Python suite:** [huggingface.co/spaces/QCAUS/QCAUS](https://huggingface.co/spaces/QCAUS/QCAUS)

## What the lab is

QCAUS v4.0 in this edition is **not** the old 20-pipeline Streamlit suite and **not** a magnetar / stellar lab. It is a single page that does three jobs:

1. Show the master Lagrangian and how it reduces to Schrödinger–Poisson and two-field envelopes.
2. Force **cosmology** and **astronomy** to share the same three numbers m, Ω, ε.
3. Show the **same two-mode object** as a covert optical carrier whose excess noise aborts a quantum key.

Nothing on the page is a detection. Overlays on HST/JWST frames are predictions. The optical link is a laboratory analog, not Holdom conversion through a halo.

### Master Lagrangian

Two U(1) field strengths with Holdom mixing ε, plus a complex ultralight scalar (fuzzy dark matter) and gravity. Reduction used here: Klein–Gordon envelope → Schrödinger–Poisson → two coupled NR fields ψ_t, ψ_d.

The measurable density is

    ρ = |ψ_t|² + |ψ_d|² + 2 Re(ψ_t* ψ_d e^{iΔφ})

Ω is the coherence of that cross term (off-diagonal of ρ̂). The PDPBioGen extension is von Neumann evolution plus that interference density, used here as a photon residual, not as a stellar filter.

### Controls

Shared sliders (one set for the whole page):

| Slider | Meaning |
|---|---|
| m₂₂ | Ultralight boson mass in units of 10⁻²² eV. Sets k½ and soliton r_c. |
| Ω | Envelope coherence. 0 = single-field FDM. |
| ε | Holdom kinetic mixing (log). Too small to move P(k); read last, as leftover photons. |
| Halo mass | Which halo the astronomy panel is sitting in. |
| Redshift z | Distance / entropy damping. |

Theory toggles: Planck 2018 ΛCDM, Hu–Barkana–Gruzinov FDM, NFW CDM, two-field.

**Read it as** chips are six dialects, not six cosmologies: Particle/QFT, Cosmology, Astronomy, BEC/AMO, Quantum information, GR. They only change the dictionary.

### Cosmological panel

Matter power spectrum P(k) with half-mode k½ ∝ m₂₂^{4/9}. Single-field FDM is a smooth cutoff. Two-field adds a low-amplitude beat from the interference term. Compared with Lyman-α, DESI/Euclid, and S₈ windows as survey rulers, not catalog limits. Background expansion stays ΛCDM: if H(z) has to move, this Lagrangian is the wrong tool.

### Astronomical panel

Halo density and rotation: NFW cusp vs Schrödinger–Poisson soliton core (Schive r_c ∝ m⁻¹ M_sol^{-⅓}) vs two-field core plus fringes. No magnetars, no stellar interiors.

### Three sky tests (prebuilt HST/JWST)

Run in order. You do not start with leftover light.

| Test | Object | Measures | Why it exists |
|---|---|---|---|
| 1 · m | I Zwicky 18 (HST ACS) | Soliton r_c vs cosmological k½ | Same Klein–Gordon mass on both skies. If they disagree, the L is wrong. |
| 2 · Ω | SMACS 0723 (JWST NIRCam) | Fringe scale on a lensing cluster | Coherence, not a second particle. Ω=0 has no rings. |
| 3 · ε | MACS J0416 (HST) | Photon residual after the mass model | Mixing into leftover light. Read only after m and Ω are locked. |

Circle = predicted core. Rings = predicted fringes. Annulus = photon residual. Credits: NASA, ESA, CSA, STScI.

The three tests are one Lagrangian read three ways. Run them in order. A miss on 1 voids 2 and 3.
Live on qcaus-qcaus.vercel.app (Tests). Each card now has Do this, in order, live FOV / $k_{1/2}$ / fringe / $\varepsilon$ contrast, and the kill condition.

Test 1 — weigh $m$ · I Zwicky 18 (HST)
Question. Is the boson mass that cuts the universe the same mass that cores this dwarf?
Do this.

Load the halo ($10^{8.8}\,M_\odot$, $z=0.0025$). $m,\Omega,\varepsilon$ stay yours.
Read $r_c$. Code: Schive 2014$r_c = 1.6\,\mathrm{kpc}\cdot m_{22}^{-1}\cdot(M_\mathrm{sol}/10^9)^{-1/3}$.
Solid circle = that $r_c$ on the ACS frame (FOV $\approx 13$ kpc). Raise $m$: circle shrinks.
Cosmological panel: $k_{1/2}=4.5\,m_{22}^{4/9}$ h Mpc$^{-1}$. Same $m$, Lyman-$\alpha$ ruler.
Slide $m$. Both numbers must move together. Invert a measured core and a measured cutoff: one mass.
If kinematics want a large core (small $m$) and the forest wants a high $k_{1/2}$ (large $m$), stop.

Code. solitonMass → solitonCoreKpc → pixel radius via FOV. kHalfMode on $P(k)$. $\varepsilon$ is ignored.
Significance. Other DM models get a free core per galaxy. Here the core is a particle mass. That is the lock: a way to be wrong.
Dies if the two $m$’s disagree, or you need $H(z)$ to move.

Test 2 — find $\Omega$ · SMACS 0723 (JWST)
Question. After $m$ is locked, is there a second envelope, or only ordinary FDM?
Do this.

Freeze $m$. Load this cluster ($10^{14.8}\,M_\odot$, $z=0.39$). Core shrinks (heavy halo).
Fringe $\lambda=(0.85/m_{22})(1.1-0.35\,\Omega)$ kpc — period of $\Re(\psi_t^*\psi_d e^{i\Delta\phi})$.
Dashed rings = $1\lambda,2\lambda,3\lambda$. $\Omega=0$: they vanish (single-field).
Same $\Omega$ multiplies a $\sin^2$ beat onto $T_\mathrm{FDM}(k)$. $\varepsilon$ still does not move $P(k)$.
A real measurement is a lensing residual after subtracting the smooth soliton, not counting rings on the JPEG.
If rings want $\Omega\approx0.4$ and $P(k)$ wants $\Omega\approx0$, two-field is wrong even if Test 1 passed.

Code. fringeScaleKpc draws the dashes. twoFieldDensity splits the soliton and adds $2\Omega|\psi_t||\psi_d|\cos(2\pi r/\lambda)$. twoFieldTransfer is the same $\Omega$ on $P(k)$.
Significance. This is the FDM vs two-field discriminator. WDM fakes a cutoff, not a core+fringe. SIDM fakes a core, not a fringe locked to Lyman-$\alpha$. $\Omega$ is the off-diagonal of $\hat\rho$ — same object as PDP and the link lab.
Dies if the two $\Omega$’s disagree.

Test 3 — sense $\varepsilon$ · MACS J0416 (HST)
Question. After $m$ and $\Omega$ are known, does leftover light trace the dark interference?
Do this.

Do not start here. Lock Tests 1 and 2, then load this halo.
Filled disc is not a mass core. Opacity $=\Omega\cdot(\varepsilon/10^{-10})^{0.15}$. A ruler, not a catalog flux.
Slide $\log_{10}\varepsilon$. $r_c$, $k_{1/2}$, fringe period must not move. Only the disc breathes.
Real pipeline: subtract galaxies, ICL, PSF; ask if leftover SB traces the soliton at that contrast.
PDP reconstructs a decohered leftover. It is not a detection button.
Wrong place or wrong contrast, with $m$ and $\Omega$ fixed: $\varepsilon$ is not measured. Dust is not a dark photon.

Code. photonResidualContrast sets opacity. Overlay radii ignore $\varepsilon$. twoFieldTransfer does not take $\varepsilon$, so $P(k)$ sits still.
Significance. Single-field FDM is dark. Two-field may leak because Holdom mixing is already in $\mathcal{L}$. Easiest test to fake — that is why it is last.
Dies if residual scale and contrast disagree, or leftover appears with no soliton.

Why three. Two skies plus one photon channel. Not six cosmologies. Particle/QFT, BEC, Q-info, GR are dialects of the same three numbers. Refresh the live site after Vercel finishes the deploy, then tap 1 · m · I Zwicky 18.


### Link lab (analog, not a dark-photon modem)

Same Ω, now a split laser, a fiber pair, or two radios. Bits live in Δφ, in the cross term, not in public intensity.

- **Laser:** turbulence kills coherence on a few km.
- **Fiber:** best Ω; a right-basis tap, not loss, is the limit.
- **Radio:** multipath and the other oscillator. No optical CV-QKD (thermal photons). Use a post-quantum KEM for the key.

BER curves: intensity vs two-field mix vs PDP channel healing.

**QKD on the same two modes.** Key from the quadratures. Ciphertext rides the interference. Intensity taps fail. A tap that copies D raises excess noise in ρ̂ → session abort. Healing the key quadratures hides Eve: that checkbox is a break, not a feature. Cosmological ε is not this isolation.

### What the lock makes possible

- Cross-scale falsification: one m for Lyman-α and dwarfs.
- Five theories told apart: CDM, WDM, SIDM, FDM, two-field (cutoff vs core).
- Photon channel after the mass model (single-field FDM has none).
- Three numbers for the universe, not a new core per galaxy.

## Dual license

This project is released under a **dual license**. See [`LICENSE`](LICENSE).

- **Academic / non-commercial** — free for research, education, and personal projects, with attribution to Tony Eugene Ford.
- **Commercial** — requires a separate license. Contact the author before any company, product, sponsorship, or paid use.

Core Ford 2026 algorithms remain the IP of **Tony Eugene Ford**. Published so others have freedom to operate and cite; publication is not a commercial license.

## Contact

**Tony Eugene Ford**  
Independent researcher — astrophysics and quantum systems  
Colorado  

- Email: [tlcagford@protonmail.com](mailto:tlcagford@protonmail.com)  
- GitHub: [github.com/tlcagford](https://github.com/tlcagford)  
- Lab: [qcaus-qcaus.vercel.app](https://qcaus-qcaus.vercel.app/)  
- Hugging Face (Python suite): [huggingface.co/spaces/QCAUS/QCAUS](https://huggingface.co/spaces/QCAUS/QCAUS)  
- X: [x.com/TonyFor76801259](https://x.com/TonyFor76801259)

Commercial, partnership, and sponsorship inquiries: **tlcagford@protonmail.com**

## Citation

```bibtex
@software{Ford2026QCAUSlab,
  author = {Ford, Tony Eugene},
  title  = {QCAUS two-field lab},
  year   = {2026},
  url    = {https://qcaus-qcaus.vercel.app/},
  note   = {Dual licence: academic free, commercial contact author}
}
```

## Deploy

This lab is **Vite / React**, not Streamlit.

- **Easiest:** [Vercel](https://vercel.com/new) import of this repo (already live above).
- **Hugging Face:** new Space, SDK = **Docker**, connect this GitHub repo. Do not pick Streamlit.

```bash
npm ci
npm run build
npm run preview -- --host 0.0.0.0 --port 7860
```
