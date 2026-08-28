import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLab } from "@/lib/store";

const tooltipStyle = {
  background: "#1b1e27",
  border: "1px solid #2a2d36",
  borderRadius: 8,
  fontSize: 12,
  color: "#ece8e1",
};

type Pk = { k: number; lcdm: number; fdm: number; twoField: number };

export function PowerChart({ data }: { data: Pk[] }) {
  const theories = useLab((s) => s.theories);
  return (
    <div className="h-[190px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="k"
            type="number"
            scale="log"
            domain={["auto", "auto"]}
            tickFormatter={(v) => (v < 0.1 ? v.toFixed(2) : v.toFixed(1))}
            stroke="#6e6a63"
            tick={{ fill: "#9b968c", fontSize: 11 }}
            label={{ value: "k  [h Mpc⁻¹]", fill: "#9b968c", fontSize: 11, position: "insideBottom", offset: -2 }}
          />
          <YAxis
            scale="log"
            domain={["auto", "auto"]}
            stroke="#6e6a63"
            tick={{ fill: "#9b968c", fontSize: 11 }}
            tickFormatter={(v) => (v >= 100 ? v.toFixed(0) : v.toFixed(1))}
            width={44}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value, name) => [Number(value).toExponential(2), String(name)]}
            labelFormatter={(l) => `k = ${Number(l).toPrecision(3)}`}
          />
          {theories.lcdm && (
            <Line type="monotone" dataKey="lcdm" name="ΛCDM" stroke="#8a8f99" dot={false} strokeWidth={1.4} isAnimationActive={false} />
          )}
          {theories.fdm && (
            <Line type="monotone" dataKey="fdm" name="FDM" stroke="#8ea4b8" dot={false} strokeWidth={1.6} isAnimationActive={false} />
          )}
          {theories.twoField && (
            <Line type="monotone" dataKey="twoField" name="Two-field" stroke="#ece8e1" dot={false} strokeWidth={2} isAnimationActive={false} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

type Rot = { r: number; vNfw: number; vTwo: number; nfw: number; fdm: number; twoField: number };

export function RotationChart({ data }: { data: Rot[] }) {
  const theories = useLab((s) => s.theories);
  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="r"
            type="number"
            stroke="#6e6a63"
            tick={{ fill: "#9b968c", fontSize: 11 }}
            tickFormatter={(v) => Number(v).toFixed(1)}
          />
          <YAxis
            stroke="#6e6a63"
            tick={{ fill: "#9b968c", fontSize: 11 }}
            width={40}
          />
          <Tooltip contentStyle={tooltipStyle} />
          {theories.nfw && (
            <Line type="monotone" dataKey="vNfw" name="NFW" stroke="#7a7670" dot={false} strokeWidth={1.4} isAnimationActive={false} />
          )}
          {theories.twoField && (
            <Line type="monotone" dataKey="vTwo" name="Two-field" stroke="#ece8e1" dot={false} strokeWidth={2} isAnimationActive={false} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

type Sz = { z: number; s: number };

export function EntropyChart({ data }: { data: Sz[] }) {
  return (
    <div className="h-[140px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="z" stroke="#6e6a63" tick={{ fill: "#9b968c", fontSize: 11 }} />
          <YAxis stroke="#6e6a63" tick={{ fill: "#9b968c", fontSize: 11 }} width={36} domain={[0, 1]} />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [Number(value).toFixed(3), "S (bits)"]}
            labelFormatter={(l) => `z = ${Number(l).toFixed(1)}`}
          />
          <Line type="monotone" dataKey="s" name="S" stroke="#c5cdd6" dot={false} strokeWidth={1.8} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

type Ber = { r: number; intensity: number; two: number; pdp: number };

export function BerChart({ data }: { data: Ber[] }) {
  return (
    <div className="h-[190px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="r"
            type="number"
            scale="log"
            domain={["auto", "auto"]}
            stroke="#6e6a63"
            tick={{ fill: "#9b968c", fontSize: 11 }}
            tickFormatter={(v) => (v >= 10 ? v.toFixed(0) : v.toFixed(1))}
            label={{
              value: "range  [km]",
              fill: "#9b968c",
              fontSize: 11,
              position: "insideBottom",
              offset: -2,
            }}
          />
          <YAxis
            scale="log"
            domain={[1e-7, 0.5]}
            stroke="#6e6a63"
            tick={{ fill: "#9b968c", fontSize: 11 }}
            tickFormatter={(v) => Number(v).toExponential(0)}
            width={44}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value, name) => [Number(value).toExponential(2), String(name)]}
            labelFormatter={(l) => `${Number(l).toFixed(1)} km`}
          />
          <Line
            type="monotone"
            dataKey="intensity"
            name="Intensity"
            stroke="#8a8f99"
            dot={false}
            strokeWidth={1.4}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="two"
            name="Two-field"
            stroke="#8ea4b8"
            dot={false}
            strokeWidth={1.6}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="pdp"
            name="PDP"
            stroke="#ece8e1"
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
