import { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";

const colorFor = (score, status) => {
  if (status === "offline") return "bg-status-gray/40 border-status-gray";
  if (score >= 60) return "bg-status-green/30 border-status-green";
  if (score >= 30) return "bg-status-yellow/30 border-status-yellow";
  return "bg-status-red/30 border-status-red";
};

export default function ClassroomHeatmap() {
  const { students } = useAppContext();
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <div className="glass rounded-xl2 p-4 relative">
      <h3 className="text-sm font-semibold mb-3">Classroom Heatmap</h3>
      <div className="grid grid-cols-6 gap-3">
        {students.map((s) => (
          <button
            key={s.id}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(s.id === selected ? null : s.id)}
            className={`aspect-square rounded-lg border cursor-pointer flex items-center justify-center text-[10px] font-mono text-gray-300 transition-all ${colorFor(s.focusScore, s.status)} ${
              selected === s.id ? "ring-2 ring-accent-glow scale-95" : ""
            }`}
          >
            {s.pc}
          </button>
        ))}
      </div>

      {hovered && (
        <div className="absolute bottom-4 right-4 glass rounded-lg px-3 py-2 text-xs">
          {(() => {
            const s = students.find((x) => x.id === hovered);
            return (
              <>
                <p className="font-semibold">{s.name}</p>
                <p className="text-gray-400">{s.activeWindow} • {s.focusScore}%</p>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}