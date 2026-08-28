import { EntropyChart, PowerChart } from "@/components/charts";
import { ReachBadge } from "@/components/reach-badge";
import {
  clusteringReach,
  entropyHistory,
  hubble,
  matterSpectrum,
  s8TensionNote,
  sigma8Ratio,
} from "@/lib/physics/cosmology";
import { getDiscipline } from "@/lib/physics/disciplines";
import { deBroglieKpc, pdpWitness } from "@/lib/physics/two-field";
import { useShallow } from "zustand/react/shallow";
import { labParams, useLab } from "@/lib/store";

export function CosmoPanel() {
  const params = useLab(useShallow(labParams));
  const discipline = useLab((s) => getDiscipline(s.discipline));
  const spec = matterSpectrum(params);
  const s8 = sigma8Ratio(params);
  const reach = clusteringReach(params.m22);
  const entropy = entropyHistory(params);
  const lambda = deBroglieKpc(params.m22);
  const pdp = pdpWitness(params.omega, params.logEpsilon, params.redshift);

  return (
    <section className="flex min-w-0 flex-col gap-4 rounded-xl bg-card p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-4">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.18em] text-subtle uppercase">Cosmological</p>
          <h2 className="font-display text-2xl font-medium tracking-tight">How the universe clusters</h2>
        </div>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          k½ {reach.kHalf.toFixed(2)} h/Mpc
        </span>
      </header>

      <p className="text-sm leading-relaxed text-muted-foreground">{discipline.cosmology}</p>

      <div>
        <p className="mb-1 text-xs tracking-wide text-subtle uppercase">Matter power spectrum P(k)</p>
        <PowerChart data={spec} />
        <p className="mt-1 text-[11px] text-subtle">
          ΛCDM (gray) · single-field FDM (steel) · two-field (paper). Background expansion is not plotted: H(z={params.redshift.toFixed(1)}) = {hubble(params.redshift).toFixed(1)} km s⁻¹ Mpc⁻¹, same as Planck ΛCDM.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="k½" value={reach.kHalf.toFixed(2)} unit="h Mpc⁻¹" />
        <Stat label="λ_dB" value={lambda.toFixed(2)} unit="kpc" />
        <Stat label="σ₈ two-field" value={s8.twoField.toFixed(3)} unit="" />
        <Stat label="PDP witness" value={pdp.toFixed(2)} unit="" />
      </dl>

      <p className="text-sm leading-relaxed text-foreground">{s8TensionNote(s8.twoField)}</p>

      <div className="rounded-[12px] bg-muted p-3">
        <p className="mb-2 text-xs tracking-wide text-subtle uppercase">Can you measure it</p>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between gap-2 text-sm">
            <span>DESI / Euclid galaxy P(k)</span>
            <ReachBadge value={reach.desi} />
          </li>
          <li className="flex items-center justify-between gap-2 text-sm">
            <span>Lyman-α forest</span>
            <ReachBadge value={reach.lya} />
          </li>
        </ul>
        <p className="mt-2 text-[11px] leading-relaxed text-subtle">
          In reach means k½ sits inside the survey’s typical k window. Raise m₂₂ to push the cutoff out of Lyman-α; lower it to put the cutoff into galaxy clustering — and into tension with satellites.
        </p>
      </div>

      <div>
        <p className="mb-1 text-xs tracking-wide text-subtle uppercase">von Neumann S(z) from ℒ_PDP</p>
        <EntropyChart data={entropy} />
        <p className="mt-1 text-[11px] text-subtle">
          Tr(ρ̂ log) diagnostic in the PDPBioGen extension. Not a catalog column. The measurable cousin is the photon residual in the astronomical panel.
        </p>
      </div>

      <div className="rounded-[12px] bg-background p-3">
        <p className="text-xs tracking-wide text-subtle uppercase">How to tell theories apart</p>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-foreground">ΛCDM / CDM.</span> No small-scale cutoff. Too much power at high k.
          </li>
          <li>
            <span className="text-foreground">Warm DM.</span> Smooth cutoff, no soliton, no beat.
          </li>
          <li>
            <span className="text-foreground">Single-field FDM.</span> Same k½, no Ω-beat, no photon residual.
          </li>
          <li>
            <span className="text-foreground">Two-field.</span> Same ℒ with open Ω: FDM cutoff plus interference-density beat. H(z) unchanged — if BAO shifts, this Lagrangian is not the cause.
          </li>
        </ul>
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
