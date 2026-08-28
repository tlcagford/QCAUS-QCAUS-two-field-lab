import { useState } from "react";
import { DERIVATION, MASTER_L, PDP_L, type DerivationId } from "@/lib/physics/lagrangian";
import { cn } from "@/lib/utils";

export function LagrangianCard() {
  const [id, setId] = useState<DerivationId>("twoField");
  const step = DERIVATION.find((s) => s.id === id) ?? DERIVATION[3]!;

  return (
    <section className="rounded-xl bg-card p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs tracking-[0.18em] text-subtle uppercase">Ford 2026</p>
          <h2 className="font-display text-lg font-medium tracking-tight">Master Lagrangian</h2>
        </div>
        <p className="text-[11px] text-subtle">Same ℒ for both panels</p>
      </div>

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-foreground sm:text-xs">
        {MASTER_L.latex}
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-subtle">{MASTER_L.note}</p>

      <div className="mt-3 flex flex-wrap gap-1">
        {DERIVATION.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setId(s.id)}
            className={cn(
              "h-11 min-w-11 rounded-full px-3 text-xs font-medium",
              id === s.id
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-foreground sm:text-xs">
        {step.latex}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>

      {id === "pdp" ? (
        <p className="mt-2 text-[11px] leading-relaxed text-subtle">{PDP_L.note}</p>
      ) : null}
    </section>
  );
}
