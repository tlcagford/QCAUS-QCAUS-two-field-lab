import { ReachBadge } from "@/components/reach-badge";
import { Button } from "@/components/ui/button";
import {
  coreReach,
  haloMass,
  solitonCoreKpc,
  solitonMass,
} from "@/lib/physics/astronomy";
import { clusteringReach } from "@/lib/physics/cosmology";
import {
  fovWidthKpc,
  getSkyTest,
  SKY_TESTS,
  type SkyTest,
  type SkyTestId,
} from "@/lib/physics/cases";
import {
  epsilonFromLog,
  fringeScaleKpc,
  kHalfMode,
  photonResidualContrast,
} from "@/lib/physics/two-field";
import { labParams, useLab } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

function niceBar(fovKpc: number): number {
  const target = fovKpc * 0.2;
  const exp = 10 ** Math.floor(Math.log10(Math.max(target, 1e-6)));
  const m = target / exp;
  if (m < 2) return exp;
  if (m < 5) return 2 * exp;
  return 5 * exp;
}

function Overlay({
  test,
  rc,
  fringe,
  residual,
  w,
  h,
}: {
  test: SkyTest;
  rc: number;
  fringe: number;
  residual: number;
  w: number;
  h: number;
}) {
  if (w < 8 || h < 8) return null;
  const fov = fovWidthKpc(test);
  const bar = niceBar(fov);
  const px = (kpc: number) => (kpc / fov) * w;
  const cx = test.cx * w;
  const cy = test.cy * h;
  const rCore = Math.max(px(rc), 6);
  const rFr = px(fringe);
  const fills = rCore > w * 0.48;
  const glow = Math.min(0.08 + residual * 0.9, 0.42);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
    >
      {test.id === "epsilon" ? (
        <circle
          cx={cx}
          cy={cy}
          r={Math.min(Math.max(rCore * 1.7, 14), w * 0.28)}
          fill={`rgba(236,232,225,${glow})`}
          stroke="rgba(236,232,225,0.55)"
          strokeWidth="1.2"
        />
      ) : null}
      {test.id === "omega"
        ? [1, 2, 3].map((n) => (
            <circle
              key={n}
              cx={cx}
              cy={cy}
              r={Math.min(Math.max(rFr * n, 8), w * 0.46)}
              fill="none"
              stroke="rgba(197,205,214,0.75)"
              strokeWidth="1.1"
              strokeDasharray="5 4"
            />
          ))
        : null}
      <circle
        cx={cx}
        cy={cy}
        r={fills ? Math.min(w, h) * 0.46 : rCore}
        fill="none"
        stroke="rgba(236,232,225,0.92)"
        strokeWidth="1.5"
      />
      <line
        x1={14}
        x2={14 + px(bar)}
        y1={h - 16}
        y2={h - 16}
        stroke="rgba(236,232,225,0.9)"
        strokeWidth="1.4"
      />
      <text
        x={14}
        y={h - 22}
        fill="rgba(236,232,225,0.92)"
        fontSize="11"
        fontFamily="IBM Plex Mono, ui-monospace, monospace"
      >
        {bar >= 10 ? bar.toFixed(0) : bar.toFixed(1)} kpc
        {fills ? " · core fills frame" : ""}
      </text>
    </svg>
  );
}

export function SkyTests() {
  const params = useLab(useShallow(labParams));
  const skyTest = useLab((s) => s.skyTest);
  const setSkyTest = useLab((s) => s.setSkyTest);
  const loadHalo = useLab((s) => s.loadHalo);
  const test = getSkyTest(skyTest);
  const frameRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const sync = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [skyTest]);

  const aimed = {
    ...params,
    haloMassLog: test.haloMassLog,
    redshift: test.redshift,
  };
  const mHalo = haloMass(aimed);
  const mSol = solitonMass(aimed.m22, mHalo);
  const rc = solitonCoreKpc(aimed.m22, mHalo);
  const fringe = fringeScaleKpc(aimed.m22, aimed.omega);
  const reach = coreReach(aimed);
  const clustering = clusteringReach(aimed.m22);
  const residual = reach.contrast;
  const fov = fovWidthKpc(test);
  const eps = epsilonFromLog(aimed.logEpsilon);
  const contrast = photonResidualContrast(aimed.omega, aimed.logEpsilon);
  const loaded =
    Math.abs(params.haloMassLog - test.haloMassLog) < 0.05 &&
    Math.abs(params.redshift - test.redshift) < 0.02;

  return (
    <section
      id="tests"
      className="scroll-mt-4 rounded-xl bg-card p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-5"
    >
      <p className="text-xs tracking-[0.18em] text-subtle uppercase">Three tests · one Lagrangian</p>
      <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">
        Prebuilt skies, live outputs
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Run 1, then 2, then 3. Each test aims the same sliders at a NASA/ESA
        frame whose halo mass is known. Circles and rings are predictions from
        the code, not detections. The JPEG is starlight. The measurement is the
        mass model, the kinematics, or the leftover after subtracting that light.
      </p>

      <div className="mt-4 flex gap-1 overflow-x-auto pb-1">
        {SKY_TESTS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSkyTest(t.id as SkyTestId)}
            className={cn(
              "h-11 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors duration-150",
              skyTest === t.id
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {i + 1} · {t.param} · {t.object}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <div ref={frameRef} className="relative overflow-hidden rounded-[12px] bg-background">
            <img
              src={test.image}
              alt={`${test.telescope} ${test.object}`}
              className="block w-full"
            />
            <Overlay
              test={test}
              rc={rc}
              fringe={fringe}
              residual={residual}
              w={box.w}
              h={box.h}
            />
            <p className="absolute top-2 left-2 rounded-full bg-background/80 px-2.5 py-1 font-mono text-[11px] text-foreground">
              {test.telescope} {test.instrument}
            </p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-subtle">
            {test.credit} {test.distanceNote}. Overlay is QCAUS, not a catalog
            source. Public-domain NASA/ESA image.
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div>
            <p className="text-xs tracking-wide text-subtle uppercase">
              {test.param} · {test.paramName}
            </p>
            <h3 className="font-display text-xl font-medium tracking-tight">{test.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{test.oneLine}</p>
          </div>

          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="this halo" value={`10^${test.haloMassLog.toFixed(1)}`} unit="M_⊙" />
            <Stat label="r_c" value={rc.toFixed(2)} unit="kpc" />
            <Stat label="fringe" value={fringe.toFixed(2)} unit="kpc" />
            <Stat
              label={test.id === "epsilon" ? "PDP residual" : "k½"}
              value={
                test.id === "epsilon" ? (residual * 100).toFixed(1) : clustering.kHalf.toFixed(2)
              }
              unit={test.id === "epsilon" ? "%" : "h Mpc⁻¹"}
            />
          </dl>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant={loaded ? "secondary" : "default"}
              className="h-11"
              onClick={() => loadHalo(test.haloMassLog, test.redshift)}
            >
              {loaded ? "Halo loaded in sliders" : "Load this halo into sliders"}
            </Button>
            <span className="text-[11px] text-subtle">
              m, Ω, ε stay as you set them. Only M_halo and z jump to this object.
            </span>
          </div>

          <div className="rounded-[12px] bg-muted p-3">
            <p className="text-xs tracking-wide text-subtle uppercase">Do this, in order</p>
            <ol className="mt-2 flex flex-col gap-2">
              {test.steps.map((step, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-mono text-foreground tabular-nums">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[12px] bg-background p-3">
            <p className="text-xs tracking-wide text-subtle uppercase">What the code is doing now</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{test.codeDoes}</p>
            <dl className="mt-3 grid grid-cols-1 gap-1.5 font-mono text-[11px] text-foreground sm:grid-cols-2">
              <CodeStat label="FOV" value={`${fov.toFixed(0)} kpc`} />
              <CodeStat label="M_sol" value={`${(mSol / 1e9).toFixed(2)} × 10⁹ M_⊙`} />
              <CodeStat label="k½(m)" value={`${kHalfMode(aimed.m22).toFixed(2)} h Mpc⁻¹`} />
              <CodeStat label="λ_fringe" value={`${fringe.toFixed(2)} kpc`} />
              <CodeStat label="ε" value={eps.toExponential(1)} />
              <CodeStat label="Ω·ε contrast" value={`${(contrast * 100).toFixed(1)} %`} />
            </dl>
          </div>

          <div className="rounded-[12px] bg-muted p-3">
            <p className="text-xs tracking-wide text-subtle uppercase">Why it matters</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{test.significance}</p>
          </div>
          <div className="rounded-[12px] bg-background p-3">
            <p className="text-xs tracking-wide text-subtle uppercase">On this frame</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{test.how}</p>
          </div>
          <div className="rounded-[12px] bg-background p-3">
            <p className="text-xs tracking-wide text-subtle uppercase">Versus other theories</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{test.vsOthers}</p>
          </div>
          <div className="rounded-[12px] bg-background p-3">
            <p className="text-xs tracking-wide text-subtle uppercase">This ℒ dies if</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{test.killsIf}</p>
          </div>

          <div className="rounded-[12px] bg-muted p-3">
            <p className="mb-2 text-xs tracking-wide text-subtle uppercase">Can this frame resolve it</p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center justify-between gap-2 text-sm">
                <span>Keck / VLT kinematics</span>
                <ReachBadge value={reach.keck} />
              </li>
              <li className="flex items-center justify-between gap-2 text-sm">
                <span>HST / JWST on this halo</span>
                <ReachBadge value={reach.jwst} />
              </li>
            </ul>
            <p className="mt-2 text-[11px] leading-relaxed text-subtle">{test.outputHint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-[12px] bg-muted px-3 py-2">
      <dt className="text-[11px] tracking-wide text-subtle uppercase">{label}</dt>
      <dd className="font-mono text-sm tabular-nums text-foreground">
        {value}
        {unit ? <span className="text-subtle"> {unit}</span> : null}
      </dd>
    </div>
  );
}

function CodeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <dt className="text-subtle">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
