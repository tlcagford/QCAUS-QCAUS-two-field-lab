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
