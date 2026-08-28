import { Badge } from "@/components/ui/badge";
import type { Reach } from "@/lib/physics/cosmology";

export function ReachBadge({ value }: { value: Reach }) {
  const label = value === "yes" ? "In reach" : value === "marginal" ? "Marginal" : "Out of reach";
  return <Badge variant={value}>{label}</Badge>;
}
