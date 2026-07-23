import { motion } from "framer-motion";
import { LuMonitorCheck, LuBellRing, LuUserCog } from "react-icons/lu";
import SettingsSection from "../components/SettingsSection.jsx";
import ToggleRow from "../components/ToggleRow.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Settings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <p className="text-[11px] text-gray-500 tracking-widest mb-1">CONFIGURATION</p>
        <h1 className="text-xl font-semibold text-gray-100">Settings</h1>
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.05 }}>
        <SettingsSection
          title="Monitoring"
          description="Control what ClassWatch AI tracks during sessions"
          icon={LuMonitorCheck}
        >
          <ToggleRow label="Screen Capture" description="Continuously capture student screens" defaultOn />
          <ToggleRow label="AI Flagging" description="Auto-flag suspicious activity" defaultOn />
          <ToggleRow label="USB Detection" description="Alert when USB devices are connected" defaultOn />
        </SettingsSection>
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1 }}>
        <SettingsSection
          title="Notifications"
          description="Choose how you're alerted to activity"
          icon={LuBellRing}
        >
          <ToggleRow label="Critical Alert Toasts" description="Show popup for critical alerts" defaultOn />
          <ToggleRow label="Sound Alerts" description="Play a sound for new alerts" />
        </SettingsSection>
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.15 }}>
        <SettingsSection title="Faculty Profile" icon={LuUserCog}>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-gray-500 mb-1.5 block">Full Name</label>
              <input
                placeholder="e.g. Dr. Priya Menon"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13px] text-gray-100 placeholder:text-gray-600 outline-none focus:border-accent/60 transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] text-gray-500 mb-1.5 block">Email</label>
              <input
                placeholder="faculty@institution.edu"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13px] text-gray-100 placeholder:text-gray-600 outline-none focus:border-accent/60 transition-colors"
              />
            </div>
            <button className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent-glow text-[13px] font-semibold text-white shadow-glow hover:brightness-110 transition-all">
              Save Changes
            </button>
          </div>
        </SettingsSection>
      </motion.div>
    </div>
  );
}