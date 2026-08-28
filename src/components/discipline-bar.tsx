import { DISCIPLINES, type DisciplineId } from "@/lib/physics/disciplines";
import { useLab } from "@/lib/store";
import { cn } from "@/lib/utils";

export function DisciplineBar() {
  const id = useLab((s) => s.discipline);
  const set = useLab((s) => s.setDiscipline);

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] tracking-wide text-subtle uppercase">
        Read it as · six physics languages, not six cosmologies
      </p>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {DISCIPLINES.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => set(d.id as DisciplineId)}
            className={cn(
              "h-11 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors duration-150",
              id === d.id
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {d.short}
          </button>
        ))}
      </div>
    </div>
  );
}
