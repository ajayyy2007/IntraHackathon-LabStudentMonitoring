import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LuLayoutDashboard, LuUsers, LuChartLine, LuBellRing, LuFileText, LuSettings, LuShieldCheck } from "react-icons/lu";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LuLayoutDashboard },
  { to: "/students", label: "Students", icon: LuUsers },
  { to: "/analytics", label: "Analytics", icon: LuChartLine },
  { to: "/alerts", label: "Alerts", icon: LuBellRing },
  { to: "/reports", label: "Reports", icon: LuFileText },
  { to: "/settings", label: "Settings", icon: LuSettings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-[#0a0e14] border-r border-white/[0.06] flex flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center shadow-glow">
          <LuShieldCheck size={16} className="text-white" />
        </div>
        <div className="leading-tight">
          <p className="text-[13px] font-semibold text-gray-100">
            Class<span className="text-accent-glow">Watch</span>
          </p>
          <p className="text-[10px] text-gray-500 tracking-wide">ENTERPRISE</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="text-[10px] font-semibold text-gray-600 tracking-widest px-3 mb-2">MONITORING</p>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className="relative block">
            {({ isActive }) => (
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? "text-gray-100 bg-white/[0.04]"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.02]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-accent-glow"
                  />
                )}
                <Icon size={17} className={isActive ? "text-accent-glow" : ""} />
                {label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer status */}
      <div className="px-5 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" />
          System operational
        </div>
      </div>
    </aside>
  );
}