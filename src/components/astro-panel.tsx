import { DensityMap } from "@/components/density-map";
import { RotationChart } from "@/components/charts";
import { ReachBadge } from "@/components/reach-badge";
import {
  blueHaloHint,
  coreReach,
  haloMass,
  innerSlope,
  nfwDensity,
  radialProfile,
  rVirKpc,
  solitonCoreKpc,
  twoFieldDensity,
} from "@/lib/physics/astronomy";
import { getDiscipline } from "@/lib/physics/disciplines";
import { useShallow } from "zustand/react/shallow";
import { labParams, useLab } from "@/lib/store";

export function AstroPanel() {
  const params = useLab(useShallow(labParams));
  const discipline = useLab((s) => getDiscipline(s.discipline));
  const mHalo = haloMass(params);
  const rc = solitonCoreKpc(params.m22, mHalo);
  const rvir = rVirKpc(mHalo);
  const profile = radialProfile(params);
  const reach = coreReach(params);
  const gammaNfw = innerSlope((r) => nfwDensity(r, mHalo), Math.max(rc * 0.4, 0.15));
  const gammaTwo = innerSlope((r) => twoFieldDensity(r, params), Math.max(rc * 0.4, 0.15));
  const halo = blueHaloHint(params);

  return (
    <section className="flex min-w-0 flex-col gap-4 rounded-xl bg-card p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-4">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.18em] text-subtle uppercase">Astronomical</p>
          <h2 className="font-display text-2xl font-medium tracking-tight">How mass sits in a halo</h2>
        </div>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          r_c {rc.toFixed(2)} kpc
        </span>
      </header>

      <p className="text-sm leading-relaxed text-muted-foreground">{discipline.astronomy}</p>

      <DensityMap />
      <p className="text-[11px] text-subtle">
        Split halo at 12 kpc. Left: NFW cusp. Right: two-field soliton with ρ = |ψ_t|² + |ψ_d|² + 2 Ω Re(ψ_t* ψ_d exp(iΔφ)). Galaxies and clusters only.
      </p>

      <div>
        <p className="mb-1 text-xs tracking-wide text-subtle uppercase">Circular velocity v_c(r)</p>
        <RotationChart data={profile} />
        <p className="mt-1 text-[11px] text-subtle">
          Inner rise is slower for a core than for a cusp. That difference is what dwarf kinematics actually fit.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="r_c" value={rc.toFixed(2)} unit="kpc" />
        <Stat label="R_vir" value={rvir.toFixed(0)} unit="kpc" />
        <Stat label="γ_NFW" value={gammaNfw.toFixed(2)} unit="" />
        <Stat label="γ_two-field" value={gammaTwo.toFixed(2)} unit="" />
      </dl>

      <div className="rounded-[12px] bg-muted p-3">
        <p className="mb-2 text-xs tracking-wide text-subtle uppercase">Can you measure it</p>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between gap-2 text-sm">
            <span>Keck / VLT dwarf kinematics</span>
            <ReachBadge value={reach.keck} />
          </li>
          <li className="flex items-center justify-between gap-2 text-sm">
            <span>JWST / HST cluster lensing</span>
            <ReachBadge value={reach.jwst} />
          </li>
        </ul>
        <p className="mt-2 text-[11px] leading-relaxed text-subtle">
          In reach means the core (or fringe) is several resolution elements across. Dwarfs have the larger physical cores (Schive r_c shrinks in clusters). Nearby dwarfs are the r_c measurement; clusters are the lensing morphology and photon-residual measurement.
        </p>
      </div>

      <div className="rounded-[12px] bg-background p-3">
        <p className="text-xs tracking-wide text-subtle uppercase">PDP photon residual</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          ℒ_PDP witness around the soliton is{" "}
          <span className="font-mono text-foreground tabular-nums">{(halo * 100).toFixed(1)}%</span>{" "}
          of the local continuum — ε mixing times Ω coherence, after PSF and cluster light. A prediction, not a detection. The B² L² conversion formula is a strong-field limit of the same ε and is not used in this panel. ε does not change r_c.
        </p>
      </div>

      <div className="rounded-[12px] bg-background p-3">
        <p className="text-xs tracking-wide text-subtle uppercase">How to tell theories apart</p>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-foreground">Newtonian NFW.</span> γ ≈ −1 into the centre. No preferred core scale.
          </li>
          <li>
            <span className="text-foreground">SIDM / baryon cores.</span> Cored, but rc does not track halo mass the way the Schive relation does, and there are no m₂₂-locked fringes.
          </li>
          <li>
            <span className="text-foreground">Single-field FDM.</span> Same rc(M, m₂₂), no fringes, no photon residual.
          </li>
          <li>
            <span className="text-foreground">Two-field.</span> Same soliton plus interference density at the fringe scale, plus a PDP photon residual only if ε and Ω are both open.
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
