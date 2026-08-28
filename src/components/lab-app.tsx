import { AstroPanel } from "@/components/astro-panel";
import { CosmoPanel } from "@/components/cosmo-panel";
import { DisciplineBar } from "@/components/discipline-bar";
import { FieldControls } from "@/components/field-controls";
import { LagrangianCard } from "@/components/lagrangian-card";
import { LinkLab } from "@/components/link-lab";
import { LockCard } from "@/components/lock-card";
import { Rosetta } from "@/components/rosetta";
import { SkyTests } from "@/components/sky-tests";
import { WaveCanvas } from "@/components/wave-canvas";
import { kHalfMode } from "@/lib/physics/two-field";
import { useLab } from "@/lib/store";
import { Aperture, Orbit, Radio, ScanSearch } from "lucide-react";

export function LabApp() {
  const m22 = useLab((s) => s.m22);
  const omega = useLab((s) => s.omega);

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0 max-w-2xl">
              <p className="text-xs tracking-[0.22em] text-subtle uppercase">
                Quantum Cosmology & Astrophysics Unified Suite · v4.0
              </p>
              <h1 className="mt-1 font-display text-3xl font-medium tracking-tight md:text-4xl">
                QCAUS
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Tony Eugene Ford. One Lagrangian, two measurable scales.
                The lock between them is the experiment.
              </p>
            </div>
            <div className="flex flex-col gap-0.5 font-mono text-xs text-muted-foreground md:items-end">
              <span className="tabular-nums">m₂₂ {m22.toFixed(2)} × 10⁻²² eV</span>
              <span className="tabular-nums">Ω {omega.toFixed(2)}</span>
              <span className="tabular-nums">k½ {kHalfMode(m22).toFixed(2)} h Mpc⁻¹</span>
            </div>
          </div>
          <DisciplineBar />
        </div>
      </header>

      <main className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 md:px-6">
        <LagrangianCard />

        <div className="overflow-hidden rounded-xl bg-card p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
          <div className="flex items-center justify-between px-3 py-1.5">
            <p className="text-xs tracking-wide text-subtle uppercase">
              ρ = |ψ_t|² + |ψ_d|² + 2 Re(ψ_t* ψ_d exp(iΔφ))
            </p>
            <p className="text-[11px] text-subtle">Interference density</p>
          </div>
          <WaveCanvas />
        </div>

        <FieldControls />

        <nav className="flex flex-wrap gap-2 lg:hidden">
          <a
            href="#cosmological"
            className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-card text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <Orbit className="size-3.5" strokeWidth={1.75} />
            Cosmo
          </a>
          <a
            href="#astronomical"
            className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-card text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <Aperture className="size-3.5" strokeWidth={1.75} />
            Astro
          </a>
          <a
            href="#tests"
            className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-card text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <ScanSearch className="size-3.5" strokeWidth={1.75} />
            Tests
          </a>
          <a
            href="#link"
            className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-card text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <Radio className="size-3.5" strokeWidth={1.75} />
            Link
          </a>
        </nav>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div id="cosmological" className="scroll-mt-4">
            <CosmoPanel />
          </div>
          <div id="astronomical" className="scroll-mt-4">
            <AstroPanel />
          </div>
        </div>

        <SkyTests />

        <LinkLab />

        <LockCard />

        <Rosetta />

        <footer className="border-t border-border pb-10 pt-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Tony Eugene Ford · tlcagford@gmail.com. Master ℒ with Holdom mixing,
            Schrödinger–Poisson FDM, two-field NR reduction, and the PDPBioGen
            extension. Compared here with Planck 2018 ΛCDM, Hu–Barkana–Gruzinov
            FDM, and NFW CDM. Survey-ruler estimates, not a likelihood. Nothing
            here is a detection. Magnetar QED and stellar interiors belong to
            other QCAUS pipelines, not these two panels. HST/JWST frames:
            NASA, ESA, CSA, STScI; overlays are predictions. The link lab is a
            two-mode codec analog, not cosmological mixing.
          </p>
        </footer>
      </main>
    </div>
  );
}
