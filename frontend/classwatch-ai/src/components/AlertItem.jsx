import { motion } from "framer-motion";
import { LuTriangleAlert, LuOctagonAlert, LuChevronRight } from "react-icons/lu";

const style = {
  critical: {
    icon: LuOctagonAlert,
    color: "text-status-red",
    ring: "border-status-red/20",
    dot: "bg-status-red",
    badge: "bg-status-red/10 text-status-red",
  },
  warning: {
    icon: LuTriangleAlert,
    color: "text-status-yellow",
    ring: "border-status-yellow/20",
    dot: "bg-status-yellow",
    badge: "bg-status-yellow/10 text-status-yellow",
  },
};

export default function AlertItem({ alert }) {
  const { icon: Icon, color, ring, badge } = style[alert.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className={`group flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border ${ring} hover:bg-white/[0.04] transition-colors cursor-pointer`}
    >
      <div className={`w-9 h-9 rounded-lg bg-white/[0.03] flex items-center justify-center shrink-0`}>
        <Icon size={16} className={color} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-[13px] font-semibold text-gray-100 truncate">{alert.student}</p>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${badge}`}>
            {alert.type}
          </span>
        </div>
        <p className="text-[12px] text-gray-500 truncate">{alert.message}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[11px] text-gray-600 font-mono">{alert.time}</span>
        <LuChevronRight size={14} className="text-gray-700 group-hover:text-gray-400 transition-colors" />
      </div>
    </motion.div>
  );
}