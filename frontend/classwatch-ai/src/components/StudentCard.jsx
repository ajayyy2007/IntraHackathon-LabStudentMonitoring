import { useState } from "react";
import { motion } from "framer-motion";
import { LuMonitor, LuLock, LuOctagonX, LuLink, LuCheck } from "react-icons/lu";

const statusDot = {
  online: "bg-status-green shadow-[0_0_6px_rgba(34,197,94,0.6)]",
  offline: "bg-status-gray",
};

const focusMeta = (score) => {
  if (score >= 60) return { color: "text-status-green", bar: "bg-status-green", label: "Focused" };
  if (score >= 30) return { color: "text-status-yellow", bar: "bg-status-yellow", label: "Moderate" };
  return { color: "text-status-red", bar: "bg-status-red", label: "Distracted" };
};

export default function StudentCard({ student, onClick }) {
  const [activeAction, setActiveAction] = useState(null);

  const meta = student.status === "offline"
    ? { color: "text-gray-500", bar: "bg-gray-600", label: "Offline" }
    : focusMeta(student.focusScore);

  const actions = [
    { key: "view", icon: LuMonitor, hover: "hover:bg-accent/15 hover:text-accent-glow", active: "bg-accent/20 text-accent-glow border-accent/40" },
    { key: "lock", icon: LuLock, hover: "hover:bg-status-yellow/15 hover:text-status-yellow", active: "bg-status-yellow/20 text-status-yellow border-status-yellow/40" },
    { key: "kill", icon: LuOctagonX, hover: "hover:bg-status-red/15 hover:text-status-red", active: "bg-status-red/20 text-status-red border-status-red/40" },
    { key: "url", icon: LuLink, hover: "hover:bg-accent/15 hover:text-accent-glow", active: "bg-accent/20 text-accent-glow border-accent/40" },
  ];

  const handleAction = (key) => {
    setActiveAction(key);
    setTimeout(() => setActiveAction(null), 1200);
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-[#0f141d] border border-white/[0.06] rounded-2xl overflow-hidden cursor-pointer hover:border-white/[0.12] hover:shadow-glass transition-colors"
    >
      <div className="relative">
        <img src={student.thumbnail} alt="" className="w-full h-32 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f141d] via-transparent to-transparent" />
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full pl-2 pr-2.5 py-1">
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[student.status]}`} />
          <span className="text-[10px] font-medium text-gray-200 capitalize">{student.status}</span>
        </div>
        <div className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-gray-300 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
          {student.pc}
        </div>
      </div>

      <div className="p-3.5">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0">
            <h3 className="text-[13px] font-semibold text-gray-100 truncate">{student.name}</h3>
            <p className="text-[11px] text-gray-500 truncate">{student.activeWindow}</p>
          </div>
          <span className={`text-[13px] font-bold ${meta.color} shrink-0 ml-2`}>{student.focusScore}%</span>
        </div>

        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden mb-2.5">
          <div className={`h-full rounded-full ${meta.bar}`} style={{ width: `${student.focusScore}%` }} />
        </div>

        <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-gray-400 mb-3">
          {student.tag}
        </span>

        <div
          onClick={(e) => e.stopPropagation()}
          className="grid grid-cols-4 gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {actions.map(({ key, icon: Icon, hover, active }) => {
            const isActive = activeAction === key;
            return (
              <motion.button
                key={key}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAction(key)}
                className={`flex items-center justify-center py-1.5 rounded-lg border transition-colors ${
                  isActive ? active : `bg-white/[0.03] text-gray-500 border-transparent ${hover}`
                }`}
              >
                {isActive ? <LuCheck size={13} /> : <Icon size={13} />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}