---
title: QCAUS Lab
emoji: 🌌
colorFrom: gray
colorTo: yellow
sdk: docker
app_port: 7860
pinned: false
license: other
---

# QCAUS · two-field lab

Interactive cosmology / astronomy lock plus a two-mode optical analog (covert carrier + QKD abort).

**Live:** [qcaus-qcaus.vercel.app](https://qcaus-qcaus.vercel.app/)  
**Code:** [github.com/tlcagford/QCAUS-QCAUS-](https://github.com/tlcagford/QCAUS-QCAUS-)

## Dual licence

This project is released under a **dual licence**. See [`LICENSE`](LICENSE).

- **Academic / non-commercial** — free for research, education, and personal projects, with attribution to Tony Eugene Ford.
- **Commercial** — requires a separate licence. Contact the author before any company, product, sponsorship, or paid use.

Core Ford 2026 algorithms remain the IP of **Tony Eugene Ford** and the **Future Ford Peace and Justice Foundation**. Published so others have freedom to operate and cite; publication is not a commercial licence.

## Contact

**Tony Eugene Ford**  
Independent researcher — astrophysics and quantum systems  
Colorado  

- Email: [tlcagford@gmail.com](mailto:tlcagford@gmail.com)  
- GitHub: [github.com/tlcagford](https://github.com/tlcagford)  
- Lab: [qcaus-qcaus.vercel.app](https://qcaus-qcaus.vercel.app/)  
- Hugging Face (Python suite): [huggingface.co/spaces/QCAUS/QCAUS](https://huggingface.co/spaces/QCAUS/QCAUS)  
- X: [x.com/TonyFor76801259](https://x.com/TonyFor76801259)

Commercial, partnership, and sponsorship inquiries: **tlcagford@gmail.com**

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
