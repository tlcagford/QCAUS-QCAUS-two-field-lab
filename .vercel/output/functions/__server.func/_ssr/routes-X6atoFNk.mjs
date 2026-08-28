import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Aperture, i as Orbit, n as ScanSearch, r as Radio } from "../_libs/lucide-react.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as useShallow } from "../_libs/zustand.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-X6atoFNk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var H = .674;
var OMEGA_M = .315;
var NS = .965;
var SIGMA8_PLANCK = .811;
/** Illustrative survey windows used as measurement rulers, not catalog limits. */
var SURVEYS = {
	desi: {
		kMin: .02,
		kMax: .4,
		label: "DESI / Euclid galaxy P(k)"
	},
	lya: {
		kMin: .2,
		kMax: 5,
		label: "Lyman-α forest"
	},
	cmb: {
		kMin: .001,
		kMax: .15,
		label: "Planck / ACT CMB"
	},
	weakLensing: {
		kMin: .01,
		kMax: 1,
		label: "KiDS / DES / HSC S₈"
	}
};
var INSTRUMENTS = {
	jwst: {
		resKpc: .12,
		label: "JWST NIRCam at cluster redshift"
	},
	hst: {
		resKpc: .25,
		label: "HST ACS strong lensing"
	},
	keck: {
		resKpc: .08,
		label: "Keck / VLT dwarf kinematics"
	},
	rubin: {
		resKpc: .6,
		label: "Rubin wide-field imaging"
	}
};
var M22_MIN = .4;
var M22_DEFAULT = 2.5;
var OMEGA_DEFAULT = .35;
var HALO_LOG_DEFAULT = 11.2;
var Z_DEFAULT = .3;
function epsilonFromLog(logEpsilon) {
	return 10 ** logEpsilon;
}
/** Hu, Barkana, Gruzinov (2000) Jeans wavenumber at equality, Mpc⁻¹. */
function kJeansEq(m22) {
	return 9 * Math.sqrt(Math.max(m22, 1e-6));
}
/** Half-mode of the FDM transfer, h Mpc⁻¹. */
function kHalfMode(m22) {
	return 4.5 * Math.pow(Math.max(m22, 1e-6), 4 / 9);
}
/**
* kpc-scale de Broglie wavelength at v ~ 200 km/s.
* λ = h/(m v) ≈ 0.48 kpc × m₂₂⁻¹ at that speed.
*/
function deBroglieKpc(m22, vKms = 200) {
	return .48 / Math.max(m22, .05) * (200 / vKms);
}
function fdmTransfer(kMpc, m22) {
	const kJ = kJeansEq(m22);
	const x = 1.61 * Math.pow(Math.max(m22, 1e-6), 1 / 18) * (kMpc / kJ);
	return Math.cos(x ** 3) / (1 + x ** 8);
}
/**
* Two-field beat on P(k) from the interference density.
* Ω = 0 recovers single-field FDM. ε does not move P(k) at realistic values.
*/
function twoFieldTransfer(kMpc, m22, omega) {
	const t = fdmTransfer(kMpc, m22);
	const kBeat = .28 * Math.sqrt(Math.max(m22, 1e-6)) * (.6 + 1.8 * omega);
	return t * (1 - .42 * omega * Math.sin(kMpc / Math.max(kBeat, 1e-4)) ** 2);
}
/** Spatial period of Re(ψ_t* ψ_d e^{iΔφ}), kpc. */
function fringeScaleKpc(m22, omega) {
	return .85 / Math.max(m22, .2) * (1.1 - .35 * omega);
}
/**
* Interference density from the two-field NR reduction:
* ρ = |ψ_t|² + |ψ_d|² + 2 Ω Re(ψ_t* ψ_d e^{iΔφ})
* Amplitudes here are real; phase is Δφ.
*/
function interferenceDensity(ampT, ampD, deltaPhi, omega) {
	return ampT * ampT + ampD * ampD + 2 * omega * ampT * ampD * Math.cos(deltaPhi);
}
/** Weak-mixing photon residual (no B-field). Contrast, not a mass component. */
function photonResidualContrast(omega, logEpsilon) {
	const eps = epsilonFromLog(logEpsilon);
	return Math.min(1, omega * Math.pow(eps / 1e-10, .15));
}
/**
* PDPBioGen witness: Tr(ρ̂ log) entropy plus interference contrast.
* This is ℒ_PDP evaluated as a number, not a catalog observable.
*/
function pdpWitness(omega, logEpsilon, redshift) {
	const s = vonNeumannEntropy(omega, redshift);
	const inter = photonResidualContrast(omega, logEpsilon);
	return Math.min(1, .55 * inter + .45 * (1 - s));
}
function vonNeumannEntropy(omega, redshift) {
	const damp = Math.exp(-redshift / 18);
	const off = Math.min(.49, .5 * omega * damp);
	const a = .5 + off;
	const b = .5 - off;
	const slog = (x) => x <= 1e-12 ? 0 : -x * Math.log(x);
	return (slog(a) + slog(b)) / Math.LN2;
}
var PI = Math.PI;
var RHO_CRIT = 277.2;
function haloMass(params) {
	return 10 ** params.haloMassLog;
}
function rVirKpc(mHalo) {
	const rho = 200 * RHO_CRIT;
	return Math.cbrt(3 * mHalo / (4 * PI * rho));
}
function nfwConcentration(mHalo) {
	return 10 * Math.pow(mHalo / 0xe8d4a51000, -.1);
}
/** Schive, Chiueh & Broadhurst (2014) soliton–halo relation, kpc.
*  r_c = 1.6 kpc × m₂₂⁻¹ × (M_sol / 10⁹ M_⊙)⁻¹/³
*/
function solitonCoreKpc(m22, mHalo) {
	const mSol = solitonMass(m22, mHalo);
	return 1.6 / Math.max(m22, .15) * Math.pow(Math.max(mSol / 1e9, 1e-6), -1 / 3);
}
function solitonMass(m22, mHalo) {
	return 125e7 / Math.max(m22, .15) * Math.pow(mHalo / 0xe8d4a51000, 1 / 3);
}
function nfwAlpha(c) {
	return Math.log(1 + c) - c / (1 + c);
}
function nfwDensity(r, mHalo) {
	const rvir = rVirKpc(mHalo);
	const c = nfwConcentration(mHalo);
	const rs = rvir / c;
	const rhoS = mHalo / (4 * PI * rs ** 3 * nfwAlpha(c));
	const x = Math.max(r, 1e-4) / rs;
	return rhoS / (x * (1 + x) ** 2);
}
/** Schive soliton fitting function. */
function solitonDensity(r, m22, mHalo) {
	const rc = solitonCoreKpc(m22, mHalo);
	const rho0 = solitonMass(m22, mHalo) / (4 / 3 * PI * (2.2 * rc) ** 3);
	const x = Math.max(r, 0) / Math.max(rc, 1e-4);
	return rho0 / (1 + .091 * x * x) ** 8;
}
/**
* Two-field density from the NR reduction:
* split the soliton envelope into ψ_t, ψ_d, then add the interference term.
* ρ = |ψ_t|² + |ψ_d|² + 2 Ω Re(ψ_t* ψ_d e^{iΔφ})
*/
function twoFieldDensity(r, params) {
	const mHalo = haloMass(params);
	const base = solitonDensity(r, params.m22, mHalo);
	const ampT = Math.sqrt(Math.max(base * .5, 0));
	const ampD = Math.sqrt(Math.max(base * .5, 0));
	const lam = fringeScaleKpc(params.m22, params.omega);
	const deltaPhi = 2 * PI * r / Math.max(lam, .05);
	return Math.max(interferenceDensity(ampT, ampD, deltaPhi, params.omega), 0);
}
function enclosed(densityAt, r, steps = 24) {
	let m = 0;
	const dr = r / steps;
	for (let i = 0; i < steps; i++) {
		const ri = (i + .5) * dr;
		m += 4 * PI * ri * ri * densityAt(ri) * dr;
	}
	return m;
}
function vCirc(mEnc, r) {
	if (r <= 0) return 0;
	return Math.sqrt(Math.max(.0043 * mEnc / r, 0));
}
function radialProfile(params, n = 64) {
	const mHalo = haloMass(params);
	const rvir = rVirKpc(mHalo);
	const rMax = Math.max(8, rvir * .45);
	const out = [];
	for (let i = 0; i < n; i++) {
		const r = Math.exp(Math.log(.04) + (Math.log(rMax) - Math.log(.04)) * (i / (n - 1)));
		const nfw = nfwDensity(r, mHalo);
		const fdm = solitonDensity(r, params.m22, mHalo);
		const two = twoFieldDensity(r, params);
		const mNfw = enclosed((x) => nfwDensity(x, mHalo), r);
		const mTwo = enclosed((x) => twoFieldDensity(x, params), r);
		out.push({
			r,
			nfw,
			fdm,
			twoField: two,
			vNfw: vCirc(mNfw, r),
			vTwo: vCirc(mTwo, r)
		});
	}
	return out;
}
function innerSlope(densityAt, r0) {
	const r1 = r0 * .7;
	const r2 = r0 * 1.4;
	const d1 = Math.max(densityAt(r1), 1e-12);
	const d2 = Math.max(densityAt(r2), 1e-12);
	return Math.log(d2 / d1) / Math.log(r2 / r1);
}
function coreReach(params) {
	const mHalo = haloMass(params);
	const rc = solitonCoreKpc(params.m22, mHalo);
	const fringe = fringeScaleKpc(params.m22, params.omega);
	const bin = (res, scale) => {
		if (scale > res * 4) return "yes";
		if (scale > res * 1.4) return "marginal";
		return "no";
	};
	return {
		rc,
		fringe,
		keck: bin(INSTRUMENTS.keck.resKpc, rc),
		jwst: bin(INSTRUMENTS.jwst.resKpc, Math.min(rc, fringe)),
		contrast: photonResidualContrast(params.omega, params.logEpsilon)
	};
}
function blueHaloHint(params) {
	return photonResidualContrast(params.omega, params.logEpsilon);
}
var defaults = {
	m22: M22_DEFAULT,
	omega: OMEGA_DEFAULT,
	logEpsilon: -10,
	haloMassLog: HALO_LOG_DEFAULT,
	redshift: Z_DEFAULT,
	discipline: "cosmo",
	skyTest: "mass",
	theories: {
		lcdm: true,
		fdm: true,
		nfw: true,
		twoField: true
	}
};
var useLab = create((set) => ({
	...defaults,
	setM22: (m22) => set({ m22 }),
	setOmega: (omega) => set({ omega }),
	setLogEpsilon: (logEpsilon) => set({ logEpsilon }),
	setHaloMassLog: (haloMassLog) => set({ haloMassLog }),
	setRedshift: (redshift) => set({ redshift }),
	setDiscipline: (discipline) => set({ discipline }),
	setSkyTest: (skyTest) => set({ skyTest }),
	loadHalo: (haloMassLog, redshift) => set({
		haloMassLog,
		redshift
	}),
	toggleTheory: (id) => set((s) => ({ theories: {
		...s.theories,
		[id]: !s.theories[id]
	} })),
	reset: () => set(defaults)
}));
function labParams(s) {
	return {
		m22: s.m22,
		omega: s.omega,
		logEpsilon: s.logEpsilon,
		haloMassLog: s.haloMassLog,
		redshift: s.redshift
	};
}
function DensityMap() {
	const canvasRef = (0, import_react.useRef)(null);
	const m22 = useLab((s) => s.m22);
	const omega = useLab((s) => s.omega);
	const logEpsilon = useLab((s) => s.logEpsilon);
	const haloMassLog = useLab((s) => s.haloMassLog);
	const redshift = useLab((s) => s.redshift);
	const theories = useLab((s) => s.theories);
	const params = {
		m22,
		omega,
		logEpsilon,
		haloMassLog,
		redshift
	};
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: false });
		if (!ctx) return;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const w = canvas.clientWidth;
		const h = canvas.clientHeight;
		canvas.width = Math.floor(w * dpr);
		canvas.height = Math.floor(h * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		const n = 88;
		const mHalo = haloMass(params);
		const rMax = 12;
		const logMax = Math.log10(nfwDensity(.08, mHalo) * 1.4);
		ctx.fillStyle = "#090a0c";
		ctx.fillRect(0, 0, w, h);
		const leftTheory = theories.nfw ? "nfw" : theories.fdm ? "fdm" : "two";
		const rightTheory = theories.twoField ? "two" : theories.fdm ? "fdm" : "nfw";
		const dens = (kind, r) => {
			if (kind === "nfw") return nfwDensity(r, mHalo);
			if (kind === "fdm") return solitonDensity(r, params.m22, mHalo);
			return twoFieldDensity(r, params);
		};
		const dw = w / n;
		const dh = h / n;
		for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
			const x = (i / n - .5) * 2 * rMax;
			const y = (j / n - .5) * 2 * rMax;
			const r = Math.hypot(x, y);
			const kind = i < n / 2 ? leftTheory : rightTheory;
			const rho = dens(kind, Math.max(r, .05));
			const v = Math.min(1, Math.max(0, (Math.log10(rho + 1e-6) - (logMax - 4.2)) / 4.2));
			const steel = kind === "two";
			ctx.fillStyle = `rgb(${Math.round(10 + v * (steel ? 232 : 140))},${Math.round(11 + v * (steel ? 216 : 150))},${Math.round(13 + v * (steel ? 198 : 175))})`;
			ctx.fillRect(i * dw, j * dh, dw + .6, dh + .6);
		}
		ctx.strokeStyle = "rgba(236,232,225,0.18)";
		ctx.beginPath();
		ctx.moveTo(w / 2, 8);
		ctx.lineTo(w / 2, h - 8);
		ctx.stroke();
		ctx.font = "500 11px 'IBM Plex Sans', sans-serif";
		ctx.fillStyle = "#9b968c";
		ctx.fillText(leftTheory === "nfw" ? "NFW cusp" : leftTheory === "fdm" ? "FDM soliton" : "Two-field", 10, 18);
		ctx.textAlign = "right";
		ctx.fillText(rightTheory === "two" ? "Two-field" : rightTheory === "fdm" ? "FDM soliton" : "NFW cusp", w - 10, 18);
	}, [params, theories]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "h-[200px] w-full rounded-[12px] bg-background md:h-[240px]",
		"aria-label": "Halo density comparison, NFW on the left and two-field on the right"
	});
}
var tooltipStyle = {
	background: "#1b1e27",
	border: "1px solid #2a2d36",
	borderRadius: 8,
	fontSize: 12,
	color: "#ece8e1"
};
function PowerChart({ data }) {
	const theories = useLab((s) => s.theories);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-[190px] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { stroke: "rgba(255,255,255,0.05)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "k",
						type: "number",
						scale: "log",
						domain: ["auto", "auto"],
						tickFormatter: (v) => v < .1 ? v.toFixed(2) : v.toFixed(1),
						stroke: "#6e6a63",
						tick: {
							fill: "#9b968c",
							fontSize: 11
						},
						label: {
							value: "k  [h Mpc⁻¹]",
							fill: "#9b968c",
							fontSize: 11,
							position: "insideBottom",
							offset: -2
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						scale: "log",
						domain: ["auto", "auto"],
						stroke: "#6e6a63",
						tick: {
							fill: "#9b968c",
							fontSize: 11
						},
						tickFormatter: (v) => v >= 100 ? v.toFixed(0) : v.toFixed(1),
						width: 44
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: tooltipStyle,
						formatter: (value, name) => [Number(value).toExponential(2), String(name)],
						labelFormatter: (l) => `k = ${Number(l).toPrecision(3)}`
					}),
					theories.lcdm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "lcdm",
						name: "ΛCDM",
						stroke: "#8a8f99",
						dot: false,
						strokeWidth: 1.4,
						isAnimationActive: false
					}),
					theories.fdm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "fdm",
						name: "FDM",
						stroke: "#8ea4b8",
						dot: false,
						strokeWidth: 1.6,
						isAnimationActive: false
					}),
					theories.twoField && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "twoField",
						name: "Two-field",
						stroke: "#ece8e1",
						dot: false,
						strokeWidth: 2,
						isAnimationActive: false
					})
				]
			})
		})
	});
}
function RotationChart({ data }) {
	const theories = useLab((s) => s.theories);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-[180px] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { stroke: "rgba(255,255,255,0.05)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "r",
						type: "number",
						stroke: "#6e6a63",
						tick: {
							fill: "#9b968c",
							fontSize: 11
						},
						tickFormatter: (v) => Number(v).toFixed(1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						stroke: "#6e6a63",
						tick: {
							fill: "#9b968c",
							fontSize: 11
						},
						width: 40
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
					theories.nfw && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "vNfw",
						name: "NFW",
						stroke: "#7a7670",
						dot: false,
						strokeWidth: 1.4,
						isAnimationActive: false
					}),
					theories.twoField && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "vTwo",
						name: "Two-field",
						stroke: "#ece8e1",
						dot: false,
						strokeWidth: 2,
						isAnimationActive: false
					})
				]
			})
		})
	});
}
function EntropyChart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-[140px] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { stroke: "rgba(255,255,255,0.05)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "z",
						stroke: "#6e6a63",
						tick: {
							fill: "#9b968c",
							fontSize: 11
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						stroke: "#6e6a63",
						tick: {
							fill: "#9b968c",
							fontSize: 11
						},
						width: 36,
						domain: [0, 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: tooltipStyle,
						formatter: (value) => [Number(value).toFixed(3), "S (bits)"],
						labelFormatter: (l) => `z = ${Number(l).toFixed(1)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "s",
						name: "S",
						stroke: "#c5cdd6",
						dot: false,
						strokeWidth: 1.8,
						isAnimationActive: false
					})
				]
			})
		})
	});
}
function BerChart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-[190px] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { stroke: "rgba(255,255,255,0.05)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "r",
						type: "number",
						scale: "log",
						domain: ["auto", "auto"],
						stroke: "#6e6a63",
						tick: {
							fill: "#9b968c",
							fontSize: 11
						},
						tickFormatter: (v) => v >= 10 ? v.toFixed(0) : v.toFixed(1),
						label: {
							value: "range  [km]",
							fill: "#9b968c",
							fontSize: 11,
							position: "insideBottom",
							offset: -2
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						scale: "log",
						domain: [1e-7, .5],
						stroke: "#6e6a63",
						tick: {
							fill: "#9b968c",
							fontSize: 11
						},
						tickFormatter: (v) => Number(v).toExponential(0),
						width: 44
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: tooltipStyle,
						formatter: (value, name) => [Number(value).toExponential(2), String(name)],
						labelFormatter: (l) => `${Number(l).toFixed(1)} km`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "intensity",
						name: "Intensity",
						stroke: "#8a8f99",
						dot: false,
						strokeWidth: 1.4,
						isAnimationActive: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "two",
						name: "Two-field",
						stroke: "#8ea4b8",
						dot: false,
						strokeWidth: 1.6,
						isAnimationActive: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "pdp",
						name: "PDP",
						stroke: "#ece8e1",
						dot: false,
						strokeWidth: 2,
						isAnimationActive: false
					})
				]
			})
		})
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase", {
	variants: { variant: {
		default: "bg-muted text-muted-foreground",
		yes: "bg-reach-yes/15 text-reach-yes",
		marginal: "bg-reach-mid/15 text-reach-mid",
		no: "bg-muted text-subtle",
		theory: "bg-secondary text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function ReachBadge({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: value,
		children: value === "yes" ? "In reach" : value === "marginal" ? "Marginal" : "Out of reach"
	});
}
/** Not six cosmologies. Two measurements (cosmo + astro) plus four ways to write the same ℒ. */
var WHY_SIX = "There are not six kinds of cosmology. There are two skies — clustering and halos — and four other physics communities who already have a name for the same objects. Particle physics writes kinetic mixing. Cosmology measures P(k). Astronomy measures r_c and lensing. BEC/AMO writes Schrödinger–Poisson. Quantum information writes ρ̂ and the PDP filter. Relativity writes Tμν and refuses modified gravity. Six dialects. One Lagrangian. The chips above only change the dictionary, not the prediction.";
var DISCIPLINES = [
	{
		id: "particle",
		label: "Particle / QFT",
		short: "Particle",
		who: "People who write Lagrangians and mixing angles. Not a sky survey.",
		twoFields: "The master ℒ is two U(1)s with Holdom mixing −(ε/2) Fμν F′μν plus a complex scalar. After diagonalization the visible photon oscillates into A′. The scalar’s NR envelope is fuzzy dark matter. Ω is not a new coupling: it is the coherence of the two NR envelopes, the off-diagonal of ρ̂.",
		cosmology: "ε is too small to move P(k). You measure m from the quantum Jeans / half-mode, the way you would read a sterile-neutrino mass from a free-streaming cutoff — except the cutoff is ħk/m, not thermal velocity. The two-field beat is the interference density, not a second mass eigenstate in the CMB.",
		astronomy: "The soliton is the Bose ground state of φ in the halo potential. Fringes are Re(ψ_t* ψ_d e^{iΔφ}). The photon residual is the PDP witness: mixing ε times that coherence, after the mass profile is known. Magnetar B²L² conversion is a different limit of the same ε, not used here.",
		measure: "m₂₂ from k½ and from r_c. Ω from extra oscillations in P(k) and from spatial fringes. ε from the photon residual only.",
		equation: "ℒ ⊃ −(ε/2) Fμν F′μν + |∂φ|² − m²|φ|²",
		equationName: "Kinetic mixing + FDM scalar"
	},
	{
		id: "cosmo",
		label: "Cosmology",
		short: "Cosmology",
		who: "People who measure the universe as a whole: P(k), Lyman-α, S₈. One of the two skies.",
		twoFields: "Background expansion is still ΛCDM: after the scalar starts oscillating, w_DM ≈ 0. The test is clustering. Single-field FDM is the Ω → 0 limit of the same ℒ. Two-field adds the interference density on small-scale P(k).",
		cosmology: "k½ ∝ m₂₂^{4/9} is the FDM cutoff. Ω adds a low-amplitude beat from 2 Re(ψ_t* ψ_d). That beat is the discriminator against WDM (smooth cutoff) and against baryonic feedback (different scale dependence). H(z) and SN Ia must not move.",
		astronomy: "The same m that sets k½ sets dwarf and cluster cores via Schrödinger–Poisson. If Lyman-α and r_c disagree, the Lagrangian is wrong — you cannot retune one without the other.",
		measure: "Lyman-α and DESI/Euclid P(k) for k½. KiDS/DES/HSC for an S₈ shift. PDP entropy S(z) is a derived diagnostic; the catalog cousin is a non-thermal photon residual.",
		equation: "P₂F(k) = P_ΛCDM(k) · T_FDM²(k; m) · [1 − α Ω sin²(k/k_beat)]",
		equationName: "Clustering transfer"
	},
	{
		id: "astro",
		label: "Astronomy",
		short: "Astronomy",
		who: "People who measure galaxies and clusters: kinematics, lensing, ICL. The other sky.",
		twoFields: "Each halo is a standing wave of φ, not a swarm of particles. NFW cusps become a soliton with ρ_c ∝ m²/G. The second envelope paints Re(ψ_t* ψ_d e^{iΔφ}) onto that core. If ε is open, PDP maps that cross term into a photon residual.",
		cosmology: "You cannot fit dwarfs without moving Lyman-α. The lock is the Klein–Gordon mass, not a halo-by-halo parameter.",
		astronomy: "Inner slope γ from gas or stellar kinematics in dwarfs, or from strong lensing in clusters. CDM wants γ ≈ −1. A soliton wants γ ≈ 0 inside r_c. Two-field wants γ ≈ 0 plus a periodic residual at the fringe scale of Δφ(r). Systematics: PSF, baryon cores, SIDM — not stellar interiors.",
		measure: "Keck/VLT kinematics. HST/JWST strong lensing. Multi-band residuals for the PDP photon witness. Resolution must beat r_c and the fringe wavelength.",
		equation: "ρ = |ψ_t|² + |ψ_d|² + 2 Re(ψ_t* ψ_d e^{iΔφ})",
		equationName: "Interference density"
	},
	{
		id: "condensed",
		label: "Condensed matter",
		short: "BEC / AMO",
		who: "People who trap ultracold atoms. Gravity is the trap. Not a cosmology.",
		twoFields: "Galactic Gross–Pitaevskii plus Poisson: a two-component BEC. ε is a weak Rabi / potential mixing (Φ_t + ε Φ_d). Ω is condensate coherence. The soliton is the attractive ground state. Fringes are ordinary two-condensate interference. Gravity is the trap.",
		cosmology: "The Jeans wavenumber at equality is the healing length, then stretched by expansion. No structure smaller than that length → P(k) cutoff.",
		astronomy: "r_c is the oscillator length of the gravitational trap. Changing m₂₂ is changing ħ/m. NFW is the classical-dust limit of the same trap.",
		measure: "r_c(M, m) scales like a Thomas–Fermi radius. Rotation curves are time-of-flight images of |ψ|². Spectral duality is the Fourier peak of the fringe.",
		equation: "i ℏ ∂t ψ = −(ℏ²/2m) ∇²ψ + m Φ ψ,   ∇²Φ = 4π G m |ψ|²",
		equationName: "Schrödinger–Poisson"
	},
	{
		id: "qinfo",
		label: "Quantum information",
		short: "Q-info",
		who: "People who write density matrices and filters. Telescopes sample one factor of ρ̂.",
		twoFields: "ρ̂ is the two-mode photon–dark-photon density matrix. ℒ_PDP = ∫ dt [Tr(ρ̂ Ḣ̂) + Re(ψ_t* ψ_d e^{iΔφ})] + ℒ_filter. Expansion is a time-dependent Hamiltonian. Telescopes sample the photon factor of ρ̂. ℒ_filter is photon-state reconstruction (“healing”) of a decohered residual.",
		cosmology: "S(z) = −Tr(ρ log ρ) is the von Neumann diagnostic. It is not a Planck parameter. It would appear as non-thermal photon correlations a single-field Boltzmann code cannot absorb.",
		astronomy: "An image is a measurement on the photon factor. The PDP residual is spatially locked to the dark-mode soliton. Subtract PSF and cluster light; what is left is a witness, not a proof.",
		measure: "S(z) is derived. The measurable is a spatially modulated photon residual whose contrast tracks Ω ε and whose scale tracks m.",
		equation: "ℒ_PDP = ∫ dt [Tr(ρ̂ Ḣ̂) + Re(ψ_t* ψ_d e^{iΔφ})] + ℒ_filter",
		equationName: "PDPBioGen extension"
	},
	{
		id: "gr",
		label: "Relativity",
		short: "GR",
		who: "People who write Einstein equations. This ℒ does not modify gravity.",
		twoFields: "The relativistic parent is S = ∫ d⁴x √−g [½ gμν ∂μφ ∂νφ − ½ m² φ²] + S_gravity, plus the two Maxwell terms and ε mixing. Einstein equations are unchanged; only Tμν is two-field. No modified gravity.",
		cosmology: "After the scalar oscillates, w_DM ≈ 0, so H(z) matches ΛCDM. Perturbations pick up quantum pressure ħ²k²/(2m² a²) and a mixing source from ε Φ. That is why H(z) is the wrong test and P(k) is the right one.",
		astronomy: "Lensing κ is still ∫ ∇²Φ. A cored Φ produces a cored κ. Distinguishing a soliton from baryonic contraction is lens modeling, not a new GR effect.",
		measure: "Background probes (SN Ia, BAO, H(z)) should agree with Planck. Structure probes should not. If both shift, you are no longer in this Lagrangian.",
		equation: "∇²Φ = 4π G m (|ψ_t|² + |ψ_d|²),   c_s² ∼ ħ² k² / (2 m² a²)",
		equationName: "Poisson + quantum pressure"
	}
];
function getDiscipline(id) {
	return DISCIPLINES.find((d) => d.id === id) ?? DISCIPLINES[1];
}
function AstroPanel() {
	const params = useLab(useShallow(labParams));
	const discipline = useLab((s) => getDiscipline(s.discipline));
	const mHalo = haloMass(params);
	const rc = solitonCoreKpc(params.m22, mHalo);
	const rvir = rVirKpc(mHalo);
	const profile = radialProfile(params);
	const reach = coreReach(params);
	const gammaNfw = innerSlope((r) => nfwDensity(r, mHalo), Math.max(rc * .4, .15));
	const gammaTwo = innerSlope((r) => twoFieldDensity(r, params), Math.max(rc * .4, .15));
	const halo = blueHaloHint(params);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-w-0 flex-col gap-4 rounded-xl bg-card p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-subtle uppercase",
					children: "Astronomical"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "How mass sits in a halo"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-xs text-muted-foreground tabular-nums",
					children: [
						"r_c ",
						rc.toFixed(2),
						" kpc"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: discipline.astronomy
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DensityMap, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-subtle",
				children: "Split halo at 12 kpc. Left: NFW cusp. Right: two-field soliton with ρ = |ψ_t|² + |ψ_d|² + 2 Ω Re(ψ_t* ψ_d exp(iΔφ)). Galaxies and clusters only."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-xs tracking-wide text-subtle uppercase",
					children: "Circular velocity v_c(r)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotationChart, { data: profile }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] text-subtle",
					children: "Inner rise is slower for a core than for a cusp. That difference is what dwarf kinematics actually fit."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$3, {
						label: "r_c",
						value: rc.toFixed(2),
						unit: "kpc"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$3, {
						label: "R_vir",
						value: rvir.toFixed(0),
						unit: "kpc"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$3, {
						label: "γ_NFW",
						value: gammaNfw.toFixed(2),
						unit: ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$3, {
						label: "γ_two-field",
						value: gammaTwo.toFixed(2),
						unit: ""
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[12px] bg-muted p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs tracking-wide text-subtle uppercase",
						children: "Can you measure it"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Keck / VLT dwarf kinematics" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReachBadge, { value: reach.keck })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "JWST / HST cluster lensing" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReachBadge, { value: reach.jwst })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] leading-relaxed text-subtle",
						children: "In reach means the core (or fringe) is several resolution elements across. Dwarfs have the larger physical cores (Schive r_c shrinks in clusters). Nearby dwarfs are the r_c measurement; clusters are the lensing morphology and photon-residual measurement."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[12px] bg-background p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-subtle uppercase",
					children: "PDP photon residual"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: [
						"ℒ_PDP witness around the soliton is",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-foreground tabular-nums",
							children: [(halo * 100).toFixed(1), "%"]
						}),
						" ",
						"of the local continuum — ε mixing times Ω coherence, after PSF and cluster light. A prediction, not a detection. The B² L² conversion formula is a strong-field limit of the same ε and is not used in this panel. ε does not change r_c."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[12px] bg-background p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-subtle uppercase",
					children: "How to tell theories apart"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "Newtonian NFW."
						}), " γ ≈ −1 into the centre. No preferred core scale."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "SIDM / baryon cores."
						}), " Cored, but rc does not track halo mass the way the Schive relation does, and there are no m₂₂-locked fringes."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "Single-field FDM."
						}), " Same rc(M, m₂₂), no fringes, no photon residual."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "Two-field."
						}), " Same soliton plus interference density at the fringe scale, plus a PDP photon residual only if ε and Ω are both open."] })
					]
				})]
			})
		]
	});
}
function Stat$3({ label, value, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[12px] bg-muted px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] tracking-wide text-subtle uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
			className: "font-mono text-sm tabular-nums text-foreground",
			children: [value, unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-subtle",
				children: [" ", unit]
			}) : null]
		})]
	});
}
/** BBKS transfer, k in h Mpc⁻¹. Shape-level; not a Boltzmann solver. */
function bbksT(kH) {
	const q = kH / (OMEGA_M * H);
	if (q <= 0) return 1;
	return Math.log(1 + 2.34 * q) / (2.34 * q) * (1 + 3.89 * q + (16.1 * q) ** 2 + (5.46 * q) ** 3 + (6.71 * q) ** 4) ** -.25;
}
function matterSpectrum(params, n = 96) {
	const out = [];
	const kMin = .003;
	const kMax = 12;
	for (let i = 0; i < n; i++) {
		const t = i / (n - 1);
		const k = kMin * Math.pow(kMax / kMin, t);
		const tBbks = bbksT(k);
		const pLcdm = k ** NS * tBbks * tBbks * 1800;
		const tf = fdmTransfer(k * H, params.m22);
		const t2 = twoFieldTransfer(k * H, params.m22, params.omega);
		out.push({
			k,
			lcdm: Math.max(pLcdm, 1e-8),
			fdm: Math.max(pLcdm * tf * tf, 1e-8),
			twoField: Math.max(pLcdm * t2 * t2, 1e-8)
		});
	}
	return out;
}
function topHatW(x) {
	if (x < 1e-5) return 1;
	return 3 * (Math.sin(x) - x * Math.cos(x)) / x ** 3;
}
/** Relative σ₈ from a discrete P(k). Illustrative, not CAMB. */
function sigma8Ratio(params) {
	const spec = matterSpectrum(params, 160);
	let iLcdm = 0;
	let iFdm = 0;
	let iTwo = 0;
	for (let i = 1; i < spec.length; i++) {
		const a = spec[i - 1];
		const b = spec[i];
		const kMid = .5 * (a.k + b.k);
		const dk = b.k - a.k;
		const w = topHatW(kMid * 8);
		const kern = kMid * kMid * w * w * dk;
		iLcdm += .5 * (a.lcdm + b.lcdm) * kern;
		iFdm += .5 * (a.fdm + b.fdm) * kern;
		iTwo += .5 * (a.twoField + b.twoField) * kern;
	}
	const sLcdm = Math.sqrt(Math.max(iLcdm, 1e-30));
	return {
		fdm: SIGMA8_PLANCK * Math.sqrt(Math.max(iFdm, 1e-30)) / sLcdm,
		twoField: SIGMA8_PLANCK * Math.sqrt(Math.max(iTwo, 1e-30)) / sLcdm
	};
}
function hubble(z) {
	return 67.4 * Math.sqrt(OMEGA_M * (1 + z) ** 3 + (1 - OMEGA_M));
}
function entropyHistory(params, n = 48) {
	const out = [];
	for (let i = 0; i < n; i++) {
		const z = 30 * (i / (n - 1));
		out.push({
			z,
			s: vonNeumannEntropy(params.omega, z)
		});
	}
	return out;
}
function clusteringReach(m22) {
	const kHalf = kHalfMode(m22);
	const bin = (win) => {
		if (kHalf > win.kMin * 1.2 && kHalf < win.kMax * .8) return "yes";
		if (kHalf > win.kMin * .6 && kHalf < win.kMax * 1.4) return "marginal";
		return "no";
	};
	return {
		kHalf,
		desi: bin(SURVEYS.desi),
		lya: bin(SURVEYS.lya)
	};
}
function s8TensionNote(s8) {
	if (s8 < .775) return "Falls toward the weak-lensing S₈ side of the Planck–lensing tension.";
	if (s8 > .801) return "Stays on the Planck CMB clustering amplitude. This m₂₂ does not move S₈.";
	return "Partial shift toward weak-lensing S₈, still degenerate with baryonic feedback.";
}
function CosmoPanel() {
	const params = useLab(useShallow(labParams));
	const discipline = useLab((s) => getDiscipline(s.discipline));
	const spec = matterSpectrum(params);
	const s8 = sigma8Ratio(params);
	const reach = clusteringReach(params.m22);
	const entropy = entropyHistory(params);
	const lambda = deBroglieKpc(params.m22);
	const pdp = pdpWitness(params.omega, params.logEpsilon, params.redshift);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-w-0 flex-col gap-4 rounded-xl bg-card p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-subtle uppercase",
					children: "Cosmological"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "How the universe clusters"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-xs text-muted-foreground tabular-nums",
					children: [
						"k½ ",
						reach.kHalf.toFixed(2),
						" h/Mpc"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: discipline.cosmology
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-xs tracking-wide text-subtle uppercase",
					children: "Matter power spectrum P(k)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PowerChart, { data: spec }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-[11px] text-subtle",
					children: [
						"ΛCDM (gray) · single-field FDM (steel) · two-field (paper). Background expansion is not plotted: H(z=",
						params.redshift.toFixed(1),
						") = ",
						hubble(params.redshift).toFixed(1),
						" km s⁻¹ Mpc⁻¹, same as Planck ΛCDM."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
						label: "k½",
						value: reach.kHalf.toFixed(2),
						unit: "h Mpc⁻¹"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
						label: "λ_dB",
						value: lambda.toFixed(2),
						unit: "kpc"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
						label: "σ₈ two-field",
						value: s8.twoField.toFixed(3),
						unit: ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
						label: "PDP witness",
						value: pdp.toFixed(2),
						unit: ""
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-foreground",
				children: s8TensionNote(s8.twoField)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[12px] bg-muted p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs tracking-wide text-subtle uppercase",
						children: "Can you measure it"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DESI / Euclid galaxy P(k)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReachBadge, { value: reach.desi })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lyman-α forest" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReachBadge, { value: reach.lya })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] leading-relaxed text-subtle",
						children: "In reach means k½ sits inside the survey’s typical k window. Raise m₂₂ to push the cutoff out of Lyman-α; lower it to put the cutoff into galaxy clustering — and into tension with satellites."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-xs tracking-wide text-subtle uppercase",
					children: "von Neumann S(z) from ℒ_PDP"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntropyChart, { data: entropy }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] text-subtle",
					children: "Tr(ρ̂ log) diagnostic in the PDPBioGen extension. Not a catalog column. The measurable cousin is the photon residual in the astronomical panel."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[12px] bg-background p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-subtle uppercase",
					children: "How to tell theories apart"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "ΛCDM / CDM."
						}), " No small-scale cutoff. Too much power at high k."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "Warm DM."
						}), " Smooth cutoff, no soliton, no beat."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "Single-field FDM."
						}), " Same k½, no Ω-beat, no photon residual."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "Two-field."
						}), " Same ℒ with open Ω: FDM cutoff plus interference-density beat. H(z) unchanged — if BAO shifts, this Lagrangian is not the cause."] })
					]
				})]
			})
		]
	});
}
function Stat$2({ label, value, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[12px] bg-muted px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] tracking-wide text-subtle uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
			className: "font-mono text-sm tabular-nums text-foreground",
			children: [value, unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-subtle",
				children: [" ", unit]
			}) : null]
		})]
	});
}
function DisciplineBar() {
	const id = useLab((s) => s.discipline);
	const set = useLab((s) => s.setDiscipline);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] tracking-wide text-subtle uppercase",
			children: "Read it as · six physics languages, not six cosmologies"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1 overflow-x-auto pb-1",
			children: DISCIPLINES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => set(d.id),
				className: cn("h-11 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors duration-150", id === d.id ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"),
				children: d.short
			}, d.id))
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-elevated",
			ghost: "text-muted-foreground hover:text-foreground hover:bg-muted",
			outline: "text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:bg-muted"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-11 w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-accent shadow-[0_0_0_4px_rgba(9,10,12,0.9)] ring-0 transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" })]
	});
}
function Control({ label, value, unit, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] font-medium tracking-wide text-muted-foreground uppercase",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-xs tabular-nums text-foreground",
				children: [value, unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-subtle",
					children: [" ", unit]
				}) : null]
			})]
		}), children]
	});
}
var THEORY = [
	{
		id: "lcdm",
		label: "ΛCDM"
	},
	{
		id: "fdm",
		label: "FDM"
	},
	{
		id: "nfw",
		label: "NFW"
	},
	{
		id: "twoField",
		label: "Two-field"
	}
];
function FieldControls() {
	const m22 = useLab((s) => s.m22);
	const omega = useLab((s) => s.omega);
	const logEpsilon = useLab((s) => s.logEpsilon);
	const haloMassLog = useLab((s) => s.haloMassLog);
	const redshift = useLab((s) => s.redshift);
	const theories = useLab((s) => s.theories);
	const setM22 = useLab((s) => s.setM22);
	const setOmega = useLab((s) => s.setOmega);
	const setLogEpsilon = useLab((s) => s.setLogEpsilon);
	const setHaloMassLog = useLab((s) => s.setHaloMassLog);
	const setRedshift = useLab((s) => s.setRedshift);
	const toggleTheory = useLab((s) => s.toggleTheory);
	const reset = useLab((s) => s.reset);
	const eps = epsilonFromLog(logEpsilon);
	const halo = 10 ** haloMassLog;
	const haloLabel = halo >= 0xe8d4a51000 ? `${(halo / 0xe8d4a51000).toFixed(1)}×10¹²` : `${(halo / 1e9).toFixed(1)}×10⁹`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:px-4 md:py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "ε is Lagrangian mixing. Ω is the PDP coherence of Re(ψ_t* ψ_d). Ω = 0 is single-field FDM."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: reset,
					children: "Reset"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
						label: "m₂₂",
						value: m22.toFixed(2),
						unit: "×10⁻²² eV",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: M22_MIN,
							max: 16,
							step: .05,
							value: [m22],
							onValueChange: ([v]) => v !== void 0 && setM22(v)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
						label: "Ω  coherence",
						value: omega.toFixed(2),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 0,
							max: 1,
							step: .01,
							value: [omega],
							onValueChange: ([v]) => v !== void 0 && setOmega(v)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
						label: "ε  mixing",
						value: eps.toExponential(1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: -14,
							max: -6,
							step: .1,
							value: [logEpsilon],
							onValueChange: ([v]) => v !== void 0 && setLogEpsilon(v)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
						label: "Halo mass",
						value: haloLabel,
						unit: "M☉",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 8.5,
							max: 14.5,
							step: .05,
							value: [haloMassLog],
							onValueChange: ([v]) => v !== void 0 && setHaloMassLog(v)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
						label: "Redshift z",
						value: redshift.toFixed(2),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 0,
							max: 12,
							step: .1,
							value: [redshift],
							onValueChange: ([v]) => v !== void 0 && setRedshift(v)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] tracking-wide text-subtle uppercase",
					children: "Overlay"
				}), THEORY.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => toggleTheory(t.id),
					className: theories[t.id] ? "h-11 rounded-full bg-accent px-3 text-xs font-medium text-accent-foreground" : "h-11 rounded-full bg-muted px-3 text-xs font-medium text-muted-foreground",
					children: t.label
				}, t.id))]
			})
		]
	});
}
/** Ford 2026 master Lagrangian and the reductions used in this lab. */
var MASTER_L = {
	name: "Master Lagrangian",
	latex: "ℒ = −¼ Fμν Fμν − ¼ F′μν F′μν − (ε/2) Fμν F′μν + |∂μφ|² − m²|φ|² − V(|φ|) + ℒ_gravity",
	note: "Photon + dark-photon kinetic mixing, complex ultralight scalar (FDM), gravity. V(|φ|) may extend the quadratic mass term; the NR dynamics below are unchanged."
};
var PDP_L = {
	name: "PDPBioGen extension",
	latex: "ℒ_PDP = ∫ dt [ Tr(ρ̂ Ḣ̂) + Re(ψ_t* ψ_d e^{iΔφ}) ] + ℒ_filter",
	note: "Von Neumann evolution of the mixed photon state plus the two-field interference density. ℒ_filter is the PDP Quantum Filter: coherence in, noise out. This edition uses it as a photon-channel residual, not a stellar laboratory."
};
var DERIVATION = [
	{
		id: "master",
		label: "ℒ",
		latex: MASTER_L.latex,
		body: "Two U(1) field strengths with Holdom mixing ε, plus a complex scalar of mass m. Gravity is Einstein plus the two-field stress-energy. Nothing else is added to Gμν."
	},
	{
		id: "kg",
		label: "KG",
		latex: "□φ + m² φ = 0,   φ = (ψ e^{−i m t} + ψ* e^{i m t}) / √(2m)",
		body: "Klein–Gordon from the quadratic scalar. The envelope ψ is the non-relativistic field after factoring the rest-mass oscillation. Identical to the QCAUS notes (ℏ = 1 there; restored in the Schrödinger step)."
	},
	{
		id: "sp",
		label: "SP",
		latex: "i ℏ ∂t ψ = −(ℏ²/2m) ∇²ψ + m Φ ψ,   ∇²Φ = 4π G m |ψ|²",
		body: "Schrödinger–Poisson. Self-gravity uses the consistent mass density ρ = m |ψ|². Soliton cores with ρ_c ∝ m²/G and kpc de Broglie wavelengths at m ∼ 10⁻²² eV follow from this pair, not from a new force."
	},
	{
		id: "twoField",
		label: "2F",
		latex: "i ∂t ψ_t = −∇²ψ_t / (2 m_t) + (Φ_t + ε Φ_d) ψ_t    and    t ↔ d",
		body: "Two-field FDM: the NR limit of the same Lagrangian with both envelopes. Weak ε mixes the gravitational potentials. The measurable density is ρ = |ψ_t|² + |ψ_d|² + 2 Re(ψ_t* ψ_d e^{iΔφ}). Ω in this lab is the coherence of that cross term."
	},
	{
		id: "pdp",
		label: "PDP",
		latex: PDP_L.latex,
		body: "PDPBioGen: von Neumann evolution of the mixed photon–dark-photon density matrix, plus the interference density as a reconstruction term. The photon-channel residual in the astronomical panel is this witness, not a magnetar conversion probability."
	}
];
function LagrangianCard() {
	const [id, setId] = (0, import_react.useState)("twoField");
	const step = DERIVATION.find((s) => s.id === id) ?? DERIVATION[3];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-card p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-subtle uppercase",
					children: "Ford 2026"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-medium tracking-tight",
					children: "Master Lagrangian"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-subtle",
					children: "Same ℒ for both panels"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-mono text-[11px] leading-relaxed text-foreground sm:text-xs",
				children: MASTER_L.latex
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[11px] leading-relaxed text-subtle",
				children: MASTER_L.note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-1",
				children: DERIVATION.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setId(s.id),
					className: cn("h-11 min-w-11 rounded-full px-3 text-xs font-medium", id === s.id ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"),
					children: s.label
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-mono text-[11px] leading-relaxed text-foreground sm:text-xs",
				children: step.latex
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children: step.body
			}),
			id === "pdp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[11px] leading-relaxed text-subtle",
				children: PDP_L.note
			}) : null
		]
	});
}
var MEDIA = [
	{
		id: "laser",
		label: "Laser (free space)",
		carrier: "1550 nm split DFB, bits on Δφ, T on the aperture, D local or orthogonal pol",
		how: [
			"Split one 1550 nm DFB. Phase-modulate the relative arm (Δφ = 0 or π for BPSK).",
			"Send T with a noise-like envelope so |ψ_t|² is not the message. Keep D as the other polarization, or regenerate D at the receiver from a shared PRN seed.",
			"Receive with a 90° optical hybrid and balanced photodiodes: that product is Re(ψ_t* ψ_d e^{iΔφ}).",
			"PDP is DSP: PLL + a Wiener/Kalman update on the off-diagonal of ρ̂ over many symbols. That is the healing loop."
		],
		limits: [
			"Turbulence and scintillation kill Ω on a few km in daytime. Fog and rain kill SNR. Pointing jitter looks like extra phase noise.",
			"Eye-safety and beam control. Daylight background on the photodiodes.",
			"If an eavesdropper has the LO seed and a telescope in the beam, stealth is gone. Intensity-only taps see little if isolation is high."
		],
		killer: "Atmospheric coherence, not laser power.",
		rangeMin: .2,
		rangeMax: 40,
		rangeDefault: 4,
		coherenceKm: 3.5,
		snr1kmDb: 28,
		pathExp: 2
	},
	{
		id: "fiber",
		label: "Fiber",
		carrier: "Same two modes on polarization or two DWDM λ, 1550 nm",
		how: [
			"Same split laser. Put T and D on H/V polarization, or on two dense wavelengths.",
			"Standard EDFA span. Receiver is a coherent DSP stack (the telecom 90° hybrid already computes the cross term).",
			"PDP here is PMD/phase tracking: estimate ρ̂ and rotate back onto the interference axis as the fiber wanders.",
			"Do not expect stealth against the fiber owner. They see watts. Stealth is only against a tap that is in the wrong basis."
		],
		limits: [
			"Best Ω of the three — the fiber holds optical phase. Polarization-mode dispersion and Kerr mixing are the analog of ε leakage.",
			"A coherent tap in the right basis recovers Δφ. This is not cryptography. Put real encryption on the bits.",
			"Nonlinear crosstalk grows with launch power. Lower power, better isolation, less analog of ε."
		],
		killer: "A right-basis tap, not loss.",
		rangeMin: 1,
		rangeMax: 200,
		rangeDefault: 40,
		coherenceKm: 90,
		snr1kmDb: 42,
		pathExp: .18
	},
	{
		id: "radio",
		label: "Radio",
		carrier: "Two locked SDRs. I/Q is ψ_t. Shared LO / PRN is ψ_d",
		how: [
			"Two GPS-disciplined SDRs (USRP or equivalent). Encode bits on the relative RF phase, spread with a PRN so |T|² sits near the noise.",
			"The intended receiver recreates D from the same PRN and mixes. That mix is the interference density.",
			"PDP is a Costas/PLL loop plus a covariance tracker on the I/Q off-diagonal (the radio version of Tr(ρ̂ Ḣ̂)).",
			"This is covert coherent spread-spectrum. GPS already does half of it. The two-field step is: the public intensity is not the message."
		],
		limits: [
			"Multipath and Doppler destroy Δφ. Urban Ω falls in a few km. Oscillator phase noise sets a floor even in free space.",
			"Regulators, jamming, and a bigger dish on the other hill. Isolation is image rejection and antenna polarization, typically 25–40 dB.",
			"Below-noise stealth fails if Eve integrates longer than you do, or steals the PRN."
		],
		killer: "Multipath and the other oscillator.",
		rangeMin: .3,
		rangeMax: 80,
		rangeDefault: 8,
		coherenceKm: 6,
		snr1kmDb: 32,
		pathExp: 2.2
	}
];
function getMedium(id) {
	return MEDIA.find((m) => m.id === id) ?? MEDIA[0];
}
function erfc(x) {
	const z = Math.abs(x);
	const t = 1 / (1 + .47047 * z);
	const y = t * (.3480242 + t * (-.0958798 + t * .7478556)) * Math.exp(-z * z);
	return x >= 0 ? y : 2 - y;
}
/** BPSK bit-error from linear SNR. */
function berBpsk(snrLin) {
	if (snrLin <= 0) return .5;
	return Math.min(.5, .5 * erfc(Math.sqrt(snrLin)));
}
function channelOmega(medium, rangeKm) {
	const x = rangeKm / Math.max(medium.coherenceKm, .2);
	if (medium.id === "fiber") return Math.exp(-x * x);
	if (medium.id === "laser") return Math.exp(-Math.pow(x, 1.2));
	return 1 / Math.sqrt(1 + x * x);
}
function snrLin(medium, rangeKm) {
	const r = Math.max(rangeKm, medium.rangeMin);
	return 10 ** ((medium.snr1kmDb - 10 * medium.pathExp * Math.log10(r)) / 10);
}
/**
* Intensity receiver sees leaked D only.
* Two-field uses Ω² × SNR in the cross term.
* PDP heals a fraction of lost coherence by integrating the off-diagonal.
*/
function evaluateLink(omegaTx, isolationDb, medium, rangeKm) {
	const omegaCh = channelOmega(medium, rangeKm);
	const omegaRx = Math.max(0, Math.min(1, omegaTx * omegaCh));
	const snr = snrLin(medium, rangeKm);
	const leak = 10 ** (-isolationDb / 10);
	const heal = snr / (snr + 3.2);
	const omegaPdp = Math.min(1, omegaRx + (1 - omegaRx) * .38 * heal);
	return {
		omegaTx,
		omegaCh,
		omegaRx,
		omegaPdp,
		snr,
		leak,
		berIntensity: berBpsk(snr * leak),
		berTwo: berBpsk(snr * omegaRx * omegaRx),
		berPdp: berBpsk(snr * omegaPdp * omegaPdp),
		berEve: berBpsk(snr * leak * .6),
		rateFrac: Math.max(.02, omegaPdp * omegaPdp)
	};
}
function berCurve(omegaTx, isolationDb, medium, n = 36) {
	const out = [];
	for (let i = 0; i < n; i++) {
		const t = i / (n - 1);
		const r = medium.rangeMin * Math.pow(medium.rangeMax / medium.rangeMin, t);
		const e = evaluateLink(omegaTx, isolationDb, medium, r);
		out.push({
			r,
			intensity: Math.max(e.berIntensity, 1e-8),
			two: Math.max(e.berTwo, 1e-8),
			pdp: Math.max(e.berPdp, 1e-8)
		});
	}
	return out;
}
/**
* CV-QKD analog on the same two modes.
* Key is distilled from the quadratures of Re(ψ_t* ψ_d).
* Ciphertext may then ride the interference.
* Healing the key quadratures hides Eve — that is a break, not a feature.
*/
function evaluateQkd(link, medium, eveTap, healKey) {
	if (medium.id === "radio") return {
		viable: false,
		reason: "Thermal occupancy at radio frequencies is huge. Optical CV-QKD does not run on an RF carrier without cryogenics. Use a post-quantum KEM on radio; put QKD on fiber or laser.",
		iBob: 0,
		iEve: 0,
		iEveApparent: 0,
		keyBits: 0,
		abort: true,
		payloadSafe: false,
		healTrap: false
	};
	const snrB = link.snr * link.omegaRx * link.omegaRx;
	const iBob = .5 * Math.log2(1 + Math.max(snrB, 0));
	const eve = Math.min(1, Math.max(0, eveTap));
	const snrE = link.snr * (link.leak + eve * (1 - link.leak));
	const iEve = .5 * Math.log2(1 + Math.max(snrE, 0));
	const apparentEve = healKey ? iEve * (1 - .55 * link.omegaPdp) : iEve;
	const recon = .12;
	const keyBits = Math.max(0, iBob - apparentEve - recon);
	const realKey = Math.max(0, iBob - iEve - recon);
	const abort = apparentEve > iBob * .82 || keyBits <= 0;
	const healTrap = healKey && eve > .08 && !abort && realKey <= 0;
	const payloadSafe = !abort && realKey > 0 && !healTrap;
	let reason = "Key from the two-mode quadratures. Ciphertext rides the interference.";
	if (abort) reason = "Excess noise in ρ̂ is above the channel model. QKD aborts. No key, no payload.";
	if (healTrap) reason = "You healed the key quadratures. Apparent noise dropped, so the key looks good — but Eve already copied D. That is a break.";
	return {
		viable: true,
		reason,
		iBob,
		iEve,
		iEveApparent: apparentEve,
		keyBits: healTrap ? keyBits : realKey,
		abort,
		payloadSafe,
		healTrap
	};
}
function fmtBer(p) {
	if (p >= .2) return p.toFixed(2);
	return p.toExponential(1);
}
function LinkLab() {
	const omegaTx = useLab((s) => s.omega);
	const [mediumId, setMediumId] = (0, import_react.useState)("laser");
	const medium = getMedium(mediumId);
	const [range, setRange] = (0, import_react.useState)(medium.rangeDefault);
	const [iso, setIso] = (0, import_react.useState)(30);
	const [eve, setEve] = (0, import_react.useState)(0);
	const [healKey, setHealKey] = (0, import_react.useState)(false);
	const pick = (id) => {
		const m = getMedium(id);
		setMediumId(id);
		setRange(m.rangeDefault);
	};
	const link = evaluateLink(omegaTx, iso, medium, range);
	const curve = berCurve(omegaTx, iso, medium);
	const qkd = evaluateQkd(link, medium, eve, healKey);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "link",
		className: "scroll-mt-4 rounded-xl bg-card p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.18em] text-subtle uppercase",
				children: "Analog · not a dark-photon modem"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl font-medium tracking-tight",
				children: "Stealth two-field codec"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground",
				children: "Bits live in Δφ, in the cross term Re(ψ_t* ψ_d exp(iΔφ)). Public intensity is allowed to look like noise. Ω on the sliders is still coherence — now of a laser split, a fiber pair, or two radios. Isolation is a lab analog of leakage, not cosmological ε, which is too small to carry a message. PDP is the receiver that heals the off-diagonal after the channel decoheres it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex gap-1 overflow-x-auto pb-1",
				children: MEDIA.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => pick(m.id),
					className: cn("h-11 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors duration-150", mediumId === m.id ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"),
					children: m.label
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-subtle uppercase",
							children: "Bit error vs range"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BerChart, { data: curve }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-subtle",
							children: "Gray: intensity / single-field. Steel: two-field mix. Paper: PDP filter. Marker is the range slider."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-w-0 flex-col gap-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-medium tracking-wide text-muted-foreground uppercase",
									children: "Range"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs tabular-nums",
									children: [range.toFixed(1), " km"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: medium.rangeMin,
								max: medium.rangeMax,
								step: medium.id === "fiber" ? 1 : .1,
								value: [range],
								onValueChange: ([v]) => v !== void 0 && setRange(v)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-w-0 flex-col gap-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-medium tracking-wide text-muted-foreground uppercase",
									children: "Isolation (lab analog of ε)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs tabular-nums",
									children: [iso, " dB"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 12,
								max: 55,
								step: 1,
								value: [iso],
								onValueChange: ([v]) => v !== void 0 && setIso(v)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
									label: "Ω after channel",
									value: link.omegaRx.toFixed(2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
									label: "Ω after PDP",
									value: link.omegaPdp.toFixed(2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
									label: "BER two-field",
									value: fmtBer(link.berTwo)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
									label: "BER PDP",
									value: fmtBer(link.berPdp)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
									label: "BER intensity",
									value: fmtBer(link.berIntensity)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
									label: "BER eavesdropper",
									value: fmtBer(link.berEve)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] leading-relaxed text-subtle",
							children: [
								"Source Ω is the lab slider (",
								omegaTx.toFixed(2),
								"). Channel multiplies it. PDP recovers a fraction by integrating ρ̂. Lower isolation (more leakage) helps Eve and the intensity receiver — that is the analog of opening ε."
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-muted-foreground",
							children: medium.carrier
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[12px] bg-muted p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-subtle uppercase",
								children: "How you build it"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-2 list-decimal space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground",
								children: medium.how.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: step }, step))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[12px] bg-background p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-wide text-subtle uppercase",
									children: "Limits on this medium"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground",
									children: medium.limits.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm text-foreground",
									children: ["What actually kills the link: ", medium.killer]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[12px] bg-background p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-subtle uppercase",
								children: "What this is not"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: "Not Holdom conversion, not FTL, not a message through a halo. Physical-layer stealth is not cryptography: encrypt the bits. A receiver that has the seed for ψ_d is an intended user, not magic. Cosmological ε stays on the sky tests."
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-[12px] bg-muted p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] text-subtle uppercase",
						children: "Carrier with a quantum key"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 font-display text-xl font-medium tracking-tight",
						children: "QKD on the same two modes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground",
						children: "Distill a key from the quadratures of Re(ψ_t* ψ_d). Then the ciphertext rides the interference. An intensity hack still fails. A tap that copies D raises excess noise in ρ̂ — the session aborts, so there is no key and the payload is random. That is the only sense in which “hack fails.” Do not run PDP healing on the key quadratures: that hides Eve."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-w-0 flex-col gap-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-medium tracking-wide text-muted-foreground uppercase",
											children: "Eve tap on D"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs tabular-nums",
											children: [(eve * 100).toFixed(0), "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
										min: 0,
										max: 1,
										step: .01,
										value: [eve],
										onValueChange: ([v]) => v !== void 0 && setEve(v)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex h-11 items-center gap-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: healKey,
										onChange: (e) => setHealKey(e.target.checked),
										className: "size-4 accent-accent"
									}), "Heal the key quadratures (unsafe)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
											label: "I(A:B)",
											value: qkd.iBob.toFixed(2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
											label: "I(A:E)",
											value: qkd.iEve.toFixed(2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
											label: "key bits / symbol",
											value: qkd.keyBits.toFixed(2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
											label: "payload",
											value: qkd.healTrap ? "false secure" : qkd.payloadSafe ? "OTP rides" : "aborted"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[12px] bg-background p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-wide text-subtle uppercase",
									children: qkd.healTrap ? "Break" : qkd.payloadSafe ? "Session live" : "Session abort"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: qkd.reason
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: "Fiber and free-space laser can run this analog of CV-QKD. Radio cannot: thermal photons swamp the quadratures. On radio, use a post-quantum KEM for the key and keep two-field only as the covert carrier."
								})
							]
						})]
					})
				]
			})
		]
	});
}
function Stat$1({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[12px] bg-muted px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] tracking-wide text-subtle uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-mono text-sm tabular-nums text-foreground",
			children: value
		})]
	});
}
var CAPABILITIES = [
	{
		title: "Cross-scale falsification",
		body: "One mass must fit Lyman-α k½ and halo r_c. If the two rulers disagree, this Lagrangian is wrong. Ordinary dark-matter models can retune each dataset; this one cannot."
	},
	{
		title: "Tell five theories apart",
		body: "CDM, WDM, SIDM, single-field FDM, and two-field make different pairs (cutoff, core). A match on one panel and a miss on the other is a rejection, not a new parameter."
	},
	{
		title: "Sense dark mass in photons",
		body: "ε mixes Aμ with A′μ, so the interference density has a photon residual. After the mass profile is known, leftover light is a PDP witness — a channel single-field FDM does not have."
	},
	{
		title: "Three numbers for the universe",
		body: "m, Ω, ε. Not a new core radius per galaxy. Cores are a Schrödinger–Poisson prediction, not a patch. That is what a measurable connection buys: fewer knobs, more ways to be wrong."
	}
];
function LockCard() {
	const params = useLab(useShallow(labParams));
	const reach = clusteringReach(params.m22);
	const mHalo = haloMass(params);
	const rc = solitonCoreKpc(params.m22, mHalo);
	const fringe = fringeScaleKpc(params.m22, params.omega);
	const residual = blueHaloHint(params);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-card p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.18em] text-subtle uppercase",
				children: "Measurable connection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-xl font-medium tracking-tight",
				children: "What the lock makes possible"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground",
				children: "Both panels are the same three numbers. That is the capability: cosmology and astronomy can no longer be fit apart, and a photon image can test a dark-sector wave."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[32rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-[11px] tracking-wide text-subtle uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Shared"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Cosmological"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Astronomical"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
						className: "text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 font-mono text-foreground",
										children: "m"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5",
										children: [
											"k½",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-foreground tabular-nums",
												children: reach.kHalf.toFixed(2)
											}),
											" ",
											"h Mpc⁻¹"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5",
										children: [
											"r_c",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-foreground tabular-nums",
												children: rc.toFixed(2)
											}),
											" ",
											"kpc"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 font-mono text-foreground",
										children: "Ω"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5",
										children: "beat on P(k)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5",
										children: [
											"fringe",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-foreground tabular-nums",
												children: fringe.toFixed(2)
											}),
											" ",
											"kpc"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 font-mono text-foreground",
										children: "ε"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5",
										children: "does not move P(k)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5",
										children: [
											"PDP residual",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-foreground tabular-nums",
												children: [(residual * 100).toFixed(1), "%"]
											})
										]
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 grid gap-3 md:grid-cols-2",
				children: CAPABILITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-[12px] bg-muted p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-foreground",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
						children: c.body
					})]
				}, c.title))
			})
		]
	});
}
function Rosetta() {
	const d = useLab((s) => getDiscipline(s.discipline));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-card p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs tracking-[0.18em] text-subtle uppercase",
				children: [
					"Same two fields, ",
					d.short,
					" language"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-xl font-medium tracking-tight",
				children: d.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-subtle",
				children: d.who
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted-foreground",
				children: d.twoFields
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-mono text-xs leading-relaxed text-foreground",
				children: d.equation
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-subtle",
				children: d.equationName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-foreground",
				children: d.measure
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground",
				children: WHY_SIX
			})
		]
	});
}
var SKY_TESTS = [
	{
		id: "mass",
		param: "m",
		paramName: "boson mass",
		title: "Test 1 · weigh m in a dwarf",
		oneLine: "The same Klein–Gordon mass that cuts P(k) at k½ must set the soliton core in a nearby dwarf.",
		object: "I Zwicky 18",
		telescope: "HST",
		instrument: "ACS",
		image: "/sky/izw18.jpg",
		credit: "NASA, ESA, Y. Izotov & T. Thuan. Hubble ACS, 2007.",
		fovArcmin: 2.48,
		kpcPerArcsec: .088,
		cx: .38,
		cy: .52,
		haloMassLog: 8.8,
		redshift: .0025,
		distanceNote: "18 Mpc · 13 kpc across this frame",
		measures: "Fit the inner stellar or gas kinematics (Keck/VLT) and the surface density. A Schrödinger–Poisson soliton is cored, γ ≈ 0 inside r_c, then steepens. r_c(M_halo, m) is the Schive relation. Cosmology’s twin is k½ from the Lyman-α forest. One number has to fit both.",
		significance: "This is the lock. Dark-matter models usually get a free core per galaxy. Here the core is a particle mass. If I Zw 18 wants m₂₂ ≈ 8 and Lyman-α wants m₂₂ ≈ 1, the Lagrangian is wrong — you are not allowed a second mass. That is what a measurable connection is for: a way to be wrong.",
		how: "Circle on the image is the predicted r_c for this halo at the current m. Raise m, the circle shrinks (more quantum pressure at smaller λ_dB). NFW has no circle to draw. Single-field FDM draws the same circle and then stops.",
		vsOthers: "ΛCDM/NFW: cusp, no preferred r_c. WDM: cutoff in P(k), still a cusp in halos. SIDM: a core, but it does not track k½. Single-field FDM: same r_c, no fringes, no photon residual. Two-field: this r_c plus Tests 2 and 3.",
		killsIf: "r_c from dwarfs and k½ from Lyman-α disagree by more than the Schive scatter. Or H(z) moves — this ℒ does not modify background expansion.",
		outputHint: "m from r_c here must equal m from k½ in the cosmological panel."
	},
	{
		id: "omega",
		param: "Ω",
		paramName: "envelope coherence",
		title: "Test 2 · find Ω in a lensing cluster",
		oneLine: "Ω is not a second particle. It is whether the two envelopes are coherent, painted as fringes on the soliton.",
		object: "SMACS 0723",
		telescope: "JWST",
		instrument: "NIRCam",
		image: "/sky/smacs0723.jpg",
		credit: "NASA, ESA, CSA, STScI. Webb First Deep Field, 2022.",
		fovArcmin: 2.4,
		kpcPerArcsec: 5.24,
		cx: .42,
		cy: .48,
		haloMassLog: 14.8,
		redshift: .39,
		distanceNote: "z = 0.39 · ~750 kpc across this frame",
		measures: "Weak and strong lensing map κ ∝ ∇²Φ. After the smooth soliton is subtracted, two-field leftover is periodic at the fringe scale of Re(ψ_t* ψ_d e^{iΔφ}). Cosmology’s twin is a low-amplitude beat on P(k) at k_beat(m, Ω). Cluster cores are physically small (Schive: r_c shrinks in heavy halos), so this is a JWST/HST job, not a dwarf-star-count job.",
		significance: "This is how you tell two-field from ordinary FDM. Same mass, same core, extra spatial period. WDM can fake a cutoff; it cannot fake a core plus a fringe. SIDM can fake a core; it cannot lock that fringe to the Lyman-α beat. Ω is the off-diagonal of ρ̂, the same coherence the PDP filter uses.",
		how: "Dashed rings are 1, 2, 3 fringe wavelengths around the BCG. Ω = 0: rings vanish (single-field). Cluster r_c is a small circle inside them. If the rings are bigger than a resolution element, NIRCam can in principle see the residual in a mass model — not in the pretty picture by eye.",
		vsOthers: "ΛCDM: smooth NFW κ, no rings. Single-field FDM: one core, no rings. Two-field: core plus rings whose period tracks m and whose contrast tracks Ω.",
		killsIf: "A clean lensing residual periodic at the predicted scale is absent while P(k) shows the beat — or the reverse. The two Ω’s have to match.",
		outputHint: "Ω from fringes here must equal Ω from the beat on P(k)."
	},
	{
		id: "epsilon",
		param: "ε",
		paramName: "kinetic mixing",
		title: "Test 3 · sense ε in leftover photons",
		oneLine: "ε mixes Aμ with A′μ. After the mass is known, a photon residual locked to the interference density is the PDP witness.",
		object: "MACS J0416.1–2403",
		telescope: "HST",
		instrument: "ACS Frontier Fields",
		image: "/sky/macsj0416.jpg",
		credit: "NASA, ESA, HST Frontier Fields. Jauzac & Kneib.",
		fovArcmin: 3.38,
		kpcPerArcsec: 5.37,
		cx: .43,
		cy: .47,
		haloMassLog: 14.9,
		redshift: .396,
		distanceNote: "z = 0.40 · ~1.1 Mpc across this frame",
		measures: "Subtract member galaxies, the intracluster light, and the PSF. What you are allowed to call a candidate is leftover surface brightness that (i) traces the soliton, (ii) has contrast ~ Ω ε, (iii) does not appear in a massless passband the same way. Cosmology does not help: ε is too small to move P(k). This is a photon-channel-only test. ℒ_PDP is the filter that reconstructs that decohered leftover.",
		significance: "Single-field FDM is dark. Two-field is allowed a leak into light because Holdom mixing is already in ℒ. That is the only reason a Hubble or Webb image can test a dark-sector wave. It is also the easiest test to fake with dust, ICL, or a bad subtraction — which is why it comes last, after m and Ω are known from Tests 1 and 2.",
		how: "The filled disc is the predicted residual region, opacity set by the current ε and Ω. ε does not change r_c. Slide log₁₀ε: contrast changes, the mass map does not. Magnetar conversion is a different limit of the same ε and is not used on this cluster.",
		vsOthers: "ΛCDM, WDM, SIDM, single-field FDM: no photon residual tied to a dark interference term. Two-field: a contrast prediction, not a detection, and only after the mass profile is known.",
		killsIf: "A residual with the right scale and the wrong contrast (or the reverse), once m and Ω are fixed by the other two tests. Or a residual that appears where there is no soliton.",
		outputHint: "ε is measured only here. P(k) must stay still while this contrast moves."
	}
];
function getSkyTest(id) {
	return SKY_TESTS.find((t) => t.id === id) ?? SKY_TESTS[0];
}
function fovWidthKpc(t) {
	return t.fovArcmin * 60 * t.kpcPerArcsec;
}
function niceBar(fovKpc) {
	const target = fovKpc * .2;
	const exp = 10 ** Math.floor(Math.log10(Math.max(target, 1e-6)));
	const m = target / exp;
	if (m < 2) return exp;
	if (m < 5) return 2 * exp;
	return 5 * exp;
}
function Overlay({ test, rc, fringe, residual, w, h }) {
	if (w < 8 || h < 8) return null;
	const fov = fovWidthKpc(test);
	const bar = niceBar(fov);
	const px = (kpc) => kpc / fov * w;
	const cx = test.cx * w;
	const cy = test.cy * h;
	const rCore = Math.max(px(rc), 6);
	const rFr = px(fringe);
	const fills = rCore > w * .48;
	const glow = Math.min(.08 + residual * .9, .42);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "pointer-events-none absolute inset-0 h-full w-full",
		viewBox: `0 0 ${w} ${h}`,
		"aria-hidden": true,
		children: [
			test.id === "epsilon" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: Math.min(Math.max(rCore * 1.7, 14), w * .28),
				fill: `rgba(236,232,225,${glow})`,
				stroke: "rgba(236,232,225,0.55)",
				strokeWidth: "1.2"
			}) : null,
			test.id === "omega" ? [
				1,
				2,
				3
			].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: Math.min(Math.max(rFr * n, 8), w * .46),
				fill: "none",
				stroke: "rgba(197,205,214,0.75)",
				strokeWidth: "1.1",
				strokeDasharray: "5 4"
			}, n)) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: fills ? Math.min(w, h) * .46 : rCore,
				fill: "none",
				stroke: "rgba(236,232,225,0.92)",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 14,
				x2: 14 + px(bar),
				y1: h - 16,
				y2: h - 16,
				stroke: "rgba(236,232,225,0.9)",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: 14,
				y: h - 22,
				fill: "rgba(236,232,225,0.92)",
				fontSize: "11",
				fontFamily: "IBM Plex Mono, ui-monospace, monospace",
				children: [
					bar >= 10 ? bar.toFixed(0) : bar.toFixed(1),
					" kpc",
					fills ? " · core fills frame" : ""
				]
			})
		]
	});
}
function SkyTests() {
	const params = useLab(useShallow(labParams));
	const skyTest = useLab((s) => s.skyTest);
	const setSkyTest = useLab((s) => s.setSkyTest);
	const loadHalo = useLab((s) => s.loadHalo);
	const test = getSkyTest(skyTest);
	const frameRef = (0, import_react.useRef)(null);
	const [box, setBox] = (0, import_react.useState)({
		w: 0,
		h: 0
	});
	(0, import_react.useEffect)(() => {
		const el = frameRef.current;
		if (!el) return;
		const sync = () => setBox({
			w: el.clientWidth,
			h: el.clientHeight
		});
		sync();
		const ro = new ResizeObserver(sync);
		ro.observe(el);
		return () => ro.disconnect();
	}, [skyTest]);
	const aimed = {
		...params,
		haloMassLog: test.haloMassLog,
		redshift: test.redshift
	};
	const mHalo = haloMass(aimed);
	const rc = solitonCoreKpc(aimed.m22, mHalo);
	const fringe = fringeScaleKpc(aimed.m22, aimed.omega);
	const reach = coreReach(aimed);
	const clustering = clusteringReach(aimed.m22);
	const residual = reach.contrast;
	const loaded = Math.abs(params.haloMassLog - test.haloMassLog) < .05 && Math.abs(params.redshift - test.redshift) < .02;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "tests",
		className: "scroll-mt-4 rounded-xl bg-card p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.18em] text-subtle uppercase",
				children: "Three tests · one Lagrangian"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl font-medium tracking-tight",
				children: "Prebuilt skies, live outputs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground",
				children: "m, Ω and ε are universal. Each test aims them at a real NASA/ESA frame whose halo mass is known. Circles are predictions from the sliders, not detections. The pretty picture is light. The measurement is the mass model, the kinematics, or the leftover after subtracting that light."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex gap-1 overflow-x-auto pb-1",
				children: SKY_TESTS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSkyTest(t.id),
					className: cn("h-11 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors duration-150", skyTest === t.id ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"),
					children: [
						t.param,
						" · ",
						t.object
					]
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: frameRef,
					className: "relative overflow-hidden rounded-[12px] bg-background",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: test.image,
							alt: `${test.telescope} ${test.object}`,
							className: "block w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
							test,
							rc,
							fringe,
							residual,
							w: box.w,
							h: box.h
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "absolute top-2 left-2 rounded-full bg-background/80 px-2.5 py-1 font-mono text-[11px] text-foreground",
							children: [
								test.telescope,
								" ",
								test.instrument
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-[11px] leading-relaxed text-subtle",
					children: [
						test.credit,
						" ",
						test.distanceNote,
						". Overlay is QCAUS, not a catalog source. Public-domain NASA/ESA image."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs tracking-wide text-subtle uppercase",
								children: [
									test.param,
									" · ",
									test.paramName
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-medium tracking-tight",
								children: test.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-foreground",
								children: test.oneLine
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "this halo",
									value: `10^${test.haloMassLog.toFixed(1)}`,
									unit: "M_⊙"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "r_c",
									value: rc.toFixed(2),
									unit: "kpc"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "fringe",
									value: fringe.toFixed(2),
									unit: "kpc"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: test.id === "epsilon" ? "PDP residual" : "k½",
									value: test.id === "epsilon" ? (residual * 100).toFixed(1) : clustering.kHalf.toFixed(2),
									unit: test.id === "epsilon" ? "%" : "h Mpc⁻¹"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: loaded ? "secondary" : "default",
								className: "h-11",
								onClick: () => loadHalo(test.haloMassLog, test.redshift),
								children: loaded ? "Halo loaded in sliders" : "Load this halo into sliders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-subtle",
								children: "m, Ω, ε stay as you set them. Only M_halo and z jump to this object."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[12px] bg-muted p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-subtle uppercase",
								children: "What you measure"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: test.measures
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[12px] bg-muted p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-subtle uppercase",
								children: "Why it matters"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: test.significance
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[12px] bg-background p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-subtle uppercase",
								children: "On this frame"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: test.how
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[12px] bg-background p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-subtle uppercase",
								children: "Versus other theories"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: test.vsOthers
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[12px] bg-background p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-subtle uppercase",
								children: "This ℒ dies if"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: test.killsIf
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[12px] bg-muted p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-xs tracking-wide text-subtle uppercase",
									children: "Can this frame resolve it"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center justify-between gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Keck / VLT kinematics" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReachBadge, { value: reach.keck })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center justify-between gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "HST / JWST on this halo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReachBadge, { value: reach.jwst })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-[11px] leading-relaxed text-subtle",
									children: test.outputHint
								})
							]
						})
					]
				})]
			})
		]
	});
}
function Stat({ label, value, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[12px] bg-muted px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] tracking-wide text-subtle uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
			className: "font-mono text-sm tabular-nums text-foreground",
			children: [value, unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-subtle",
				children: [" ", unit]
			}) : null]
		})]
	});
}
/** Horizontal two-mode beat. ImageData, not per-cell fillRect. */
function WaveCanvas() {
	const canvasRef = (0, import_react.useRef)(null);
	const m22 = useLab((s) => s.m22);
	const omega = useLab((s) => s.omega);
	const paramsRef = (0, import_react.useRef)({
		m22,
		omega
	});
	paramsRef.current = {
		m22,
		omega
	};
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: false });
		if (!ctx) return;
		let raf = 0;
		let t = 0;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const draw = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const cssW = Math.max(1, canvas.clientWidth);
			const cssH = Math.max(1, canvas.clientHeight);
			const w = Math.floor(cssW * dpr);
			const h = Math.floor(cssH * dpr);
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w;
				canvas.height = h;
			}
			const { m22: m, omega: om } = paramsRef.current;
			const k1 = 10.5 * Math.sqrt(m / 2.5);
			const k2 = k1 * (1.12 + .55 * om);
			const img = ctx.createImageData(w, h);
			const data = img.data;
			for (let y = 0; y < h; y++) {
				const yn = (y / h - .5) * 2;
				const envY = Math.exp(-yn * yn * 3.4);
				for (let x = 0; x < w; x++) {
					const xn = x / w * 2 * Math.PI;
					const p1 = Math.sin(k1 * xn - t);
					const p2 = Math.sin(k2 * xn - t * .93);
					const I = (p1 * p1 + p2 * p2 + 2 * om * p1 * p2) * envY;
					const v = Math.min(1, Math.max(0, .08 + .55 * I));
					const i = (y * w + x) * 4;
					data[i] = Math.round(12 + v * 228);
					data[i + 1] = Math.round(13 + v * 214);
					data[i + 2] = Math.round(16 + v * 198);
					data[i + 3] = 255;
				}
			}
			ctx.putImageData(img, 0, 0);
			if (!reduce) {
				t += .07;
				raf = requestAnimationFrame(draw);
			}
		};
		draw();
		return () => cancelAnimationFrame(raf);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "h-[72px] w-full rounded-[10px] bg-background md:h-[88px]",
		"aria-label": "Two-field interference beat"
	});
}
function LabApp() {
	const m22 = useLab((s) => s.m22);
	const omega = useLab((s) => s.omega);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 md:px-6 md:py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.22em] text-subtle uppercase",
								children: "Quantum Cosmology & Astrophysics Unified Suite · v4.0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 font-display text-3xl font-medium tracking-tight md:text-4xl",
								children: "QCAUS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground",
								children: "Tony Eugene Ford. One Lagrangian, two measurable scales. The lock between them is the experiment."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-0.5 font-mono text-xs text-muted-foreground md:items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									"m₂₂ ",
									m22.toFixed(2),
									" × 10⁻²² eV"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: ["Ω ", omega.toFixed(2)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									"k½ ",
									kHalfMode(m22).toFixed(2),
									" h Mpc⁻¹"
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisciplineBar, {})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LagrangianCard, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl bg-card p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-3 py-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-subtle uppercase",
							children: "ρ = |ψ_t|² + |ψ_d|² + 2 Re(ψ_t* ψ_d exp(iΔφ))"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-subtle",
							children: "Interference density"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaveCanvas, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControls, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-wrap gap-2 lg:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#cosmological",
							className: "flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-card text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, {
								className: "size-3.5",
								strokeWidth: 1.75
							}), "Cosmo"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#astronomical",
							className: "flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-card text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aperture, {
								className: "size-3.5",
								strokeWidth: 1.75
							}), "Astro"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#tests",
							className: "flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-card text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanSearch, {
								className: "size-3.5",
								strokeWidth: 1.75
							}), "Tests"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#link",
							className: "flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-card text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
								className: "size-3.5",
								strokeWidth: 1.75
							}), "Link"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "cosmological",
						className: "scroll-mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CosmoPanel, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "astronomical",
						className: "scroll-mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AstroPanel, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkyTests, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkLab, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockCard, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rosetta, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "border-t border-border pb-10 pt-5 text-sm leading-relaxed text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tony Eugene Ford · tlcagford@gmail.com. Master ℒ with Holdom mixing, Schrödinger–Poisson FDM, two-field NR reduction, and the PDPBioGen extension. Compared here with Planck 2018 ΛCDM, Hu–Barkana–Gruzinov FDM, and NFW CDM. Survey-ruler estimates, not a likelihood. Nothing here is a detection. Magnetar QED and stellar interiors belong to other QCAUS pipelines, not these two panels. HST/JWST frames: NASA, ESA, CSA, STScI; overlays are predictions. The link lab is a two-mode codec analog, not cosmological mixing." })
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabApp, {});
}
//#endregion
export { Home as component };
