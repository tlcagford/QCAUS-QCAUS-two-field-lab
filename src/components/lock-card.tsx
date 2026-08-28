import { haloMass, solitonCoreKpc, blueHaloHint } from "@/lib/physics/astronomy";
import { clusteringReach } from "@/lib/physics/cosmology";
import { fringeScaleKpc } from "@/lib/physics/two-field";
import { labParams, useLab } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";

const CAPABILITIES = [
  {
    title: "Cross-scale falsification",
    body: "One mass must fit Lyman-α k½ and halo r_c. If the two rulers disagree, this Lagrangian is wrong. Ordinary dark-matter models can retune each dataset; this one cannot.",
  },
  {
    title: "Tell five theories apart",
    body: "CDM, WDM, SIDM, single-field FDM, and two-field make different pairs (cutoff, core). A match on one panel and a miss on the other is a rejection, not a new parameter.",
  },
  {
    title: "Sense dark mass in photons",
    body: "ε mixes Aμ with A′μ, so the interference density has a photon residual. After the mass profile is known, leftover light is a PDP witness — a channel single-field FDM does not have.",
  },
  {
    title: "Three numbers for the universe",
    body: "m, Ω, ε. Not a new core radius per galaxy. Cores are a Schrödinger–Poisson prediction, not a patch. That is what a measurable connection buys: fewer knobs, more ways to be wrong.",
  },
];

export function LockCard() {
  const params = useLab(useShallow(labParams));
  const reach = clusteringReach(params.m22);
  const mHalo = haloMass(params);
  const rc = solitonCoreKpc(params.m22, mHalo);
  const fringe = fringeScaleKpc(params.m22, params.omega);
  const residual = blueHaloHint(params);

  return (
    <section className="rounded-xl bg-card p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-5">
      <p className="text-xs tracking-[0.18em] text-subtle uppercase">Measurable connection</p>
      <h2 className="mt-1 font-display text-xl font-medium tracking-tight">
        What the lock makes possible
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Both panels are the same three numbers. That is the capability: cosmology
        and astronomy can no longer be fit apart, and a photon image can test a
        dark-sector wave.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead>
            <tr className="text-[11px] tracking-wide text-subtle uppercase">
              <th className="pb-2 font-medium">Shared</th>
              <th className="pb-2 font-medium">Cosmological</th>
              <th className="pb-2 font-medium">Astronomical</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-t border-border">
              <td className="py-2.5 font-mono text-foreground">m</td>
              <td className="py-2.5">
                k½{" "}
                <span className="font-mono text-foreground tabular-nums">
                  {reach.kHalf.toFixed(2)}
                </span>{" "}
                h Mpc⁻¹
              </td>
              <td className="py-2.5">
                r_c{" "}
                <span className="font-mono text-foreground tabular-nums">{rc.toFixed(2)}</span>{" "}
                kpc
              </td>
            </tr>
            <tr className="border-t border-border">
              <td className="py-2.5 font-mono text-foreground">Ω</td>
              <td className="py-2.5">beat on P(k)</td>
              <td className="py-2.5">
                fringe{" "}
                <span className="font-mono text-foreground tabular-nums">
                  {fringe.toFixed(2)}
                </span>{" "}
                kpc
              </td>
            </tr>
            <tr className="border-t border-border">
              <td className="py-2.5 font-mono text-foreground">ε</td>
              <td className="py-2.5">does not move P(k)</td>
              <td className="py-2.5">
                PDP residual{" "}
                <span className="font-mono text-foreground tabular-nums">
                  {(residual * 100).toFixed(1)}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {CAPABILITIES.map((c) => (
          <li key={c.title} className="rounded-[12px] bg-muted p-3">
            <p className="text-sm font-medium text-foreground">{c.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
