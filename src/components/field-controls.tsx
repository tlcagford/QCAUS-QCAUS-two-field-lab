import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { M22_MAX, M22_MIN } from "@/lib/physics/constants";
import { epsilonFromLog } from "@/lib/physics/two-field";
import { useLab, type TheoryId } from "@/lib/store";

function Control({
  label,
  value,
  unit,
  children,
}: {
  label: string;
  value: string;
  unit?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-0.5">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <span className="font-mono text-xs tabular-nums text-foreground">
          {value}
          {unit ? <span className="text-subtle"> {unit}</span> : null}
        </span>
      </span>
      {children}
    </label>
  );
}

const THEORY: { id: TheoryId; label: string }[] = [
  { id: "lcdm", label: "ΛCDM" },
  { id: "fdm", label: "FDM" },
  { id: "nfw", label: "NFW" },
  { id: "twoField", label: "Two-field" },
];

export function FieldControls() {
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
  const haloLabel =
    halo >= 1e12 ? `${(halo / 1e12).toFixed(1)}×10¹²` : `${(halo / 1e9).toFixed(1)}×10⁹`;

  return (
    <div className="rounded-xl bg-card p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:px-4 md:py-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          ε is Lagrangian mixing. Ω is the PDP coherence of Re(ψ_t* ψ_d). Ω = 0 is single-field FDM.
        </p>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>

      <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
        <Control label="m₂₂" value={m22.toFixed(2)} unit="×10⁻²² eV">
          <Slider
            min={M22_MIN}
            max={M22_MAX}
            step={0.05}
            value={[m22]}
            onValueChange={([v]) => v !== undefined && setM22(v)}
          />
        </Control>
        <Control label="Ω  coherence" value={omega.toFixed(2)}>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={[omega]}
            onValueChange={([v]) => v !== undefined && setOmega(v)}
          />
        </Control>
        <Control label="ε  mixing" value={eps.toExponential(1)}>
          <Slider
            min={-14}
            max={-6}
            step={0.1}
            value={[logEpsilon]}
            onValueChange={([v]) => v !== undefined && setLogEpsilon(v)}
          />
        </Control>
        <Control label="Halo mass" value={haloLabel} unit="M☉">
          <Slider
            min={8.5}
            max={14.5}
            step={0.05}
            value={[haloMassLog]}
            onValueChange={([v]) => v !== undefined && setHaloMassLog(v)}
          />
        </Control>
        <Control label="Redshift z" value={redshift.toFixed(2)}>
          <Slider
            min={0}
            max={12}
            step={0.1}
            value={[redshift]}
            onValueChange={([v]) => v !== undefined && setRedshift(v)}
          />
        </Control>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] tracking-wide text-subtle uppercase">Overlay</span>
        {THEORY.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => toggleTheory(t.id)}
            className={
              theories[t.id]
                ? "h-11 rounded-full bg-accent px-3 text-xs font-medium text-accent-foreground"
                : "h-11 rounded-full bg-muted px-3 text-xs font-medium text-muted-foreground"
            }
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
