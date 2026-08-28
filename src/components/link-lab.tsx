import { BerChart } from "@/components/charts";
import { Slider } from "@/components/ui/slider";
import { OMEGA_DEFAULT } from "@/lib/physics/constants";
import {
  berCurve,
  evaluateLink,
  evaluateQkd,
  getMedium,
  MEDIA,
  type MediumId,
} from "@/lib/physics/comms";
import { cn } from "@/lib/utils";
import { useState } from "react";

function fmtBer(p: number): string {
  if (p >= 0.2) return p.toFixed(2);
  return p.toExponential(1);
}

/** Standalone analog. Not wired to the QCAUS cosmology sliders. */
export function LinkLab() {
  const [omegaTx, setOmegaTx] = useState(OMEGA_DEFAULT);
  const [mediumId, setMediumId] = useState<MediumId>("laser");
  const medium = getMedium(mediumId);
  const [range, setRange] = useState(medium.rangeDefault);
  const [iso, setIso] = useState(30);
  const [eve, setEve] = useState(0);
  const [healKey, setHealKey] = useState(false);

  const pick = (id: MediumId) => {
    const m = getMedium(id);
    setMediumId(id);
    setRange(m.rangeDefault);
  };

  const link = evaluateLink(omegaTx, iso, medium, range);
  const curve = berCurve(omegaTx, iso, medium);
  const qkd = evaluateQkd(link, medium, eve, healKey);

  return (
    <section className="flex flex-col gap-4">
      <label className="flex min-w-0 flex-col gap-0.5">
        <span className="flex items-baseline justify-between">
          <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Source coherence Ω
          </span>
          <span className="font-mono text-xs tabular-nums">{omegaTx.toFixed(2)}</span>
        </span>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[omegaTx]}
          onValueChange={([v]) => v !== undefined && setOmegaTx(v)}
        />
      </label>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {MEDIA.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => pick(m.id)}
            className={cn(
              "h-11 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors duration-150",
              mediumId === m.id
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-xs tracking-wide text-subtle uppercase">Bit error vs range</p>
          <BerChart data={curve} />
          <p className="text-[11px] text-subtle">
            Gray: intensity / single-field. Steel: two-field mix. Paper: PDP
            filter. Marker is the range slider.
          </p>

          <label className="flex min-w-0 flex-col gap-0.5">
            <span className="flex items-baseline justify-between">
              <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Range
              </span>
              <span className="font-mono text-xs tabular-nums">{range.toFixed(1)} km</span>
            </span>
            <Slider
              min={medium.rangeMin}
              max={medium.rangeMax}
              step={medium.id === "fiber" ? 1 : 0.1}
              value={[range]}
              onValueChange={([v]) => v !== undefined && setRange(v)}
            />
          </label>
          <label className="flex min-w-0 flex-col gap-0.5">
            <span className="flex items-baseline justify-between">
              <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Isolation (lab analog of leakage)
              </span>
              <span className="font-mono text-xs tabular-nums">{iso} dB</span>
            </span>
            <Slider
              min={12}
              max={55}
              step={1}
              value={[iso]}
              onValueChange={([v]) => v !== undefined && setIso(v)}
            />
          </label>

          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Ω after channel" value={link.omegaRx.toFixed(2)} />
            <Stat label="Ω after PDP" value={link.omegaPdp.toFixed(2)} />
            <Stat label="BER two-field" value={fmtBer(link.berTwo)} />
            <Stat label="BER PDP" value={fmtBer(link.berPdp)} />
            <Stat label="BER intensity" value={fmtBer(link.berIntensity)} />
            <Stat label="BER eavesdropper" value={fmtBer(link.berEve)} />
          </dl>
          <p className="text-[11px] leading-relaxed text-subtle">
            Channel multiplies source Ω. PDP recovers a fraction by integrating
            ρ̂ — that healing is for the payload, not the key. Lower isolation
            helps Eve and the intensity receiver.
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <p className="font-mono text-xs text-muted-foreground">{medium.carrier}</p>
          <div className="rounded-[12px] bg-muted p-3">
            <p className="text-xs tracking-wide text-subtle uppercase">How you build it</p>
            <ol className="mt-2 list-decimal space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground">
              {medium.how.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="rounded-[12px] bg-background p-3">
            <p className="text-xs tracking-wide text-subtle uppercase">Limits on this medium</p>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {medium.limits.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-foreground">
              What actually kills the link: {medium.killer}
            </p>
          </div>
          <div className="rounded-[12px] bg-background p-3">
            <p className="text-xs tracking-wide text-subtle uppercase">What this is not</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Analog, not a dark-photon modem. Not Holdom conversion, not FTL,
              not a message through a halo. Physical-layer stealth is not
              cryptography: encrypt the bits. Isolation here is not
              cosmological ε.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[12px] bg-muted p-4">
        <p className="text-xs tracking-[0.18em] text-subtle uppercase">Carrier with a quantum key</p>
        <h3 className="mt-1 font-display text-xl font-medium tracking-tight">
          QKD on the same two modes
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Distill a key from the quadratures of Re(ψ_t* ψ_d). Then the
          ciphertext rides the interference. An intensity hack still fails.
          A tap that copies D raises excess noise in ρ̂ — the session aborts,
          so there is no key and the payload is random. That is detect-and-stop,
          not a shield. Do not run PDP healing on the key quadratures: that
          hides Eve.
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <label className="flex min-w-0 flex-col gap-0.5">
              <span className="flex items-baseline justify-between">
                <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  Eve tap on D
                </span>
                <span className="font-mono text-xs tabular-nums">{(eve * 100).toFixed(0)}%</span>
              </span>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[eve]}
                onValueChange={([v]) => v !== undefined && setEve(v)}
              />
            </label>
            <label className="flex h-11 items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={healKey}
                onChange={(e) => setHealKey(e.target.checked)}
                className="size-4 accent-accent"
              />
              Heal the key quadratures (unsafe)
            </label>
            <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Stat label="I(A:B)" value={qkd.iBob.toFixed(2)} />
              <Stat label="I(A:E)" value={qkd.iEveApparent.toFixed(2)} />
              <Stat label="key bits / symbol" value={qkd.keyBits.toFixed(2)} />
              <Stat
                label="payload"
                value={qkd.healTrap ? "false secure" : qkd.payloadSafe ? "OTP rides" : "aborted"}
              />
            </dl>
          </div>
          <div className="rounded-[12px] bg-background p-3">
            <p className="text-xs tracking-wide text-subtle uppercase">
              {qkd.healTrap ? "Break" : qkd.payloadSafe ? "Session live" : "Session abort"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{qkd.reason}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Fiber and free-space laser can run this analog of CV-QKD. Radio
              cannot: thermal photons swamp the quadratures. On radio, use a
              post-quantum KEM for the key and keep two-field only as the
              covert carrier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] bg-muted px-3 py-2">
      <dt className="text-[11px] tracking-wide text-subtle uppercase">{label}</dt>
      <dd className="font-mono text-sm tabular-nums text-foreground">{value}</dd>
    </div>
  );
}
