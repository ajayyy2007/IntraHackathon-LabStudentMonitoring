import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuBell, LuCircleUser, LuChevronDown, LuLogOut, LuUser, LuLoaderCircle } from "react-icons/lu";
import { useAppContext } from "../context/AppContext.jsx";

export default function Navbar() {
  const { students, alerts } = useAppContext();
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const online = students.filter((s) => s.status === "online").length;
  const avgFocus = Math.round(students.reduce((a, s) => a + s.focusScore, 0) / students.length);
  const focusColor = avgFocus >= 60 ? "text-status-green" : avgFocus >= 30 ? "text-status-yellow" : "text-status-red";

  const Metric = ({ label, value, valueClass = "text-gray-100" }) => (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-gray-500">{label}</span>
      <span className={`text-[13px] font-semibold ${valueClass}`}>{value}</span>
    </div>
  );

  const goToProfile = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  const handleSignOut = () => {
  setSigningOut(true);
  localStorage.removeItem("token");
  setTimeout(() => {
    navigate("/");
  }, 700);
};

  return (
    <header className="h-16 bg-[#0a0e14]/80 backdrop-blur-md border-b border-white/[0.06] flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-6">
        <Metric label="Connected" value={`${online} / ${students.length}`} />
        <div className="w-px h-4 bg-white/10" />
        <Metric label="Class Focus" value={`${avgFocus}%`} valueClass={focusColor} />
        <div className="w-px h-4 bg-white/10" />
        <Metric label="Active Alerts" value={alerts.length} valueClass={alerts.length > 0 ? "text-status-red" : "text-gray-100"} />
      </div>

      <div className="flex items-center gap-5">
        <span className="text-[12px] text-gray-500 font-mono tabular-nums">
          {time.toLocaleTimeString()}
        </span>

        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => { setBellOpen(!bellOpen); setProfileOpen(false); }}
            className={`relative w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
              bellOpen ? "bg-accent/15 border-accent/30" : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]"
            }`}
          >
            <LuBell size={16} className={bellOpen ? "text-accent-glow" : "text-gray-400"} />
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-status-red text-[9px] font-bold flex items-center justify-center text-white">
                {alerts.length}
              </span>
            )}
          </button>

          <AnimatePresence>
            {bellOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-64 bg-[#12161f] border border-white/[0.08] rounded-xl shadow-glass p-2 z-30"
              >
                <p className="text-[11px] text-gray-500 px-2 py-1.5">{alerts.length} active alerts</p>
                {alerts.slice(0, 3).map((a) => (
                  <button
                    key={a.id}
                    onClick={() => { setBellOpen(false); navigate("/alerts"); }}
                    className="w-full text-left px-2 py-2 rounded-lg hover:bg-white/[0.04] text-[12px] transition-colors"
                  >
                    <p className="text-gray-200 font-medium">{a.student}</p>
                    <p className="text-gray-500 text-[11px]">{a.message}</p>
                  </button>
                ))}
                <button
                  onClick={() => { setBellOpen(false); navigate("/alerts"); }}
                  className="w-full text-center mt-1 py-1.5 rounded-lg text-[11px] text-accent-glow hover:bg-white/[0.04] transition-colors"
                >
                  View all alerts
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setBellOpen(false); }}
            className={`flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-lg transition-colors ${
              profileOpen ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center">
              <LuCircleUser size={16} className="text-white" />
            </div>
            <span className="text-[13px] font-medium text-gray-200">Faculty</span>
            <motion.span animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <LuChevronDown size={13} className="text-gray-500" />
            </motion.span>
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-48 bg-[#12161f] border border-white/[0.08] rounded-xl shadow-glass p-1.5 z-30"
              >
                <div className="px-2.5 py-2 mb-1 border-b border-white/[0.06]">
                  <p className="text-[12px] font-medium text-gray-200">Faculty Account</p>
                  <p className="text-[11px] text-gray-500">faculty@institution.edu</p>
                </div>

                <button
                  onClick={goToProfile}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12px] text-gray-300 hover:bg-white/[0.05] active:bg-white/[0.08] transition-colors"
                >
                  <LuUser size={13} /> Profile Settings
                </button>

                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12px] text-status-red hover:bg-status-red/10 active:bg-status-red/20 transition-colors disabled:opacity-70"
                >
                  {signingOut ? (
                    <>
                      <LuLoaderCircle size={13} className="animate-spin" /> Signing out...
                    </>
                  ) : (
                    <>
                      <LuLogOut size={13} /> Sign out
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}