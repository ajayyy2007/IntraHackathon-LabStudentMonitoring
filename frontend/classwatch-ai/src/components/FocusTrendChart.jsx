import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

const data = [
  { time: "10:00", focus: 80 },
  { time: "10:10", focus: 70 },
  { time: "10:20", focus: 40 },
  { time: "10:30", focus: 25 },
  { time: "10:40", focus: 55 },
  { time: "10:50", focus: 60 },
];

export default function FocusTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="focusFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a212e" vertical={false} />
        <XAxis dataKey="time" stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} />
        <YAxis stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "#0f141d", border: "1px solid #212836", borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: "#94a3b8" }}
        />
        <Area type="monotone" dataKey="focus" stroke="#60a5fa" strokeWidth={2} fill="url(#focusFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}