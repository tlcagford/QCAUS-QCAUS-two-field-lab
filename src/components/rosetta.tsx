import { WHY_SIX, getDiscipline } from "@/lib/physics/disciplines";
import { useLab } from "@/lib/store";

export function Rosetta() {
  const d = useLab((s) => getDiscipline(s.discipline));

  return (
    <section className="rounded-xl bg-card p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-5">
      <p className="text-xs tracking-[0.18em] text-subtle uppercase">Same two fields, {d.short} language</p>
      <h2 className="mt-1 font-display text-xl font-medium tracking-tight">{d.label}</h2>
      <p className="mt-1 text-[11px] text-subtle">{d.who}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.twoFields}</p>
      <p className="mt-3 font-mono text-xs leading-relaxed text-foreground">{d.equation}</p>
      <p className="mt-1 text-[11px] text-subtle">{d.equationName}</p>
      <p className="mt-4 text-sm leading-relaxed text-foreground">{d.measure}</p>
      <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
        {WHY_SIX}
      </p>
    </section>
  );
}
