---
title: QCAUS Lab
emoji: 🌌
colorFrom: gray
colorTo: yellow
sdk: docker
app_port: 7860
pinned: false
license: mit
---

# QCAUS · two-field lab

Tony Eugene Ford. Interactive cosmology / astronomy lock plus a two-mode optical analog (covert carrier + QKD abort). Not a Streamlit app — do not pick the Streamlit SDK.

**Live Space:** create a Hugging Face Space, SDK = **Docker**, connected to this GitHub repo. It builds with the Dockerfile and serves on port 7860.

## Hugging Face (correct path)

1. Open [huggingface.co/new-space](https://huggingface.co/new-space).
2. Owner: your user or the `QCAUS` org.
3. Space name: `QCAUS-lab` (keep the old Streamlit space as the Python suite).
4. SDK: **Docker** (not Streamlit, not Gradio, not Static).
5. Hardware: CPU basic is enough.
6. Connect GitHub → `tlcagford/QCAUS-QCAUS-` → branch `main`.
7. Wait for the build. URL will be `https://huggingface.co/spaces/<you>/QCAUS-lab`.

If the Space already exists with Streamlit selected, Settings → change SDK to Docker, or make a new Space. Streamlit cannot run this repo.

## Why not Streamlit

The old QCAUS pipelines on [huggingface.co/spaces/QCAUS/QCAUS](https://huggingface.co/spaces/QCAUS/QCAUS) are Python. This lab is a Vite / React app. Streamlit will fail on `package.json`.

## Local

```bash
npm ci
npm run build
npm run preview -- --host 0.0.0.0 --port 7860
```

## Vercel (also works)

This repo already builds to Vercel output. Import `tlcagford/QCAUS-QCAUS-` at [vercel.com/new](https://vercel.com/new).
