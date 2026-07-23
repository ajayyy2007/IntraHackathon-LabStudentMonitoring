import { motion } from "framer-motion";
import { mockReports } from "../data/mockReports.js";
import ReportRow from "../components/ReportRow.jsx";
import ReplayPlayer from "../components/ReplayPlayer.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Reports() {
  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <p className="text-[11px] text-gray-500 tracking-widest mb-1">ARCHIVE</p>
        <h1 className="text-xl font-semibold text-gray-100">Reports</h1>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-5"
      >
        <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl p-4">
          <h3 className="text-[13px] font-semibold text-gray-100 mb-1">Generated Reports</h3>
          <p className="text-[11px] text-gray-500 mb-2">Session exports and summaries</p>
          <div className="divide-y divide-white/[0.05]">
            {mockReports.map((r) => (
              <ReportRow key={r.id} report={r} />
            ))}
          </div>
        </div>

        <ReplayPlayer />
      </motion.div>
    </div>
  );
}