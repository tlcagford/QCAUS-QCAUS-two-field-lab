import { create } from "zustand";
import {
  HALO_LOG_DEFAULT,
  LOG_EPS_DEFAULT,
  M22_DEFAULT,
  OMEGA_DEFAULT,
  Z_DEFAULT,
} from "./physics/constants";
import type { SkyTestId } from "./physics/cases";
import type { DisciplineId } from "./physics/disciplines";
import type { LabParams } from "./physics/two-field";

export type TheoryId = "lcdm" | "fdm" | "nfw" | "twoField";

type LabState = LabParams & {
  discipline: DisciplineId;
  theories: Record<TheoryId, boolean>;
  skyTest: SkyTestId;
  setM22: (v: number) => void;
  setOmega: (v: number) => void;
  setLogEpsilon: (v: number) => void;
  setHaloMassLog: (v: number) => void;
  setRedshift: (v: number) => void;
  setDiscipline: (v: DisciplineId) => void;
  setSkyTest: (v: SkyTestId) => void;
  loadHalo: (haloMassLog: number, redshift: number) => void;
  toggleTheory: (id: TheoryId) => void;
  reset: () => void;
};

const defaults = {
  m22: M22_DEFAULT,
  omega: OMEGA_DEFAULT,
  logEpsilon: LOG_EPS_DEFAULT,
  haloMassLog: HALO_LOG_DEFAULT,
  redshift: Z_DEFAULT,
  discipline: "cosmo" as DisciplineId,
  skyTest: "mass" as SkyTestId,
  theories: {
    lcdm: true,
    fdm: true,
    nfw: true,
    twoField: true,
  } as Record<TheoryId, boolean>,
};

export const useLab = create<LabState>((set) => ({
  ...defaults,
  setM22: (m22) => set({ m22 }),
  setOmega: (omega) => set({ omega }),
  setLogEpsilon: (logEpsilon) => set({ logEpsilon }),
  setHaloMassLog: (haloMassLog) => set({ haloMassLog }),
  setRedshift: (redshift) => set({ redshift }),
  setDiscipline: (discipline) => set({ discipline }),
  setSkyTest: (skyTest) => set({ skyTest }),
  loadHalo: (haloMassLog, redshift) => set({ haloMassLog, redshift }),
  toggleTheory: (id) =>
    set((s) => ({ theories: { ...s.theories, [id]: !s.theories[id] } })),
  reset: () => set(defaults),
}));

export function labParams(s: LabParams): LabParams {
  return {
    m22: s.m22,
    omega: s.omega,
    logEpsilon: s.logEpsilon,
    haloMassLog: s.haloMassLog,
    redshift: s.redshift,
  };
}
