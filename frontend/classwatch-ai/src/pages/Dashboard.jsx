import { motion } from "framer-motion";
import StudentGrid from "../components/StudentGrid.jsx";
import ClassroomHeatmap from "../components/ClassroomHeatmap.jsx";
import ClassroomFocusBar from "../components/ClassroomFocusBar.jsx";
import FacultyAISummary from "../components/FacultyAISummary.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <p className="text-[11px] text-gray-500 tracking-widest mb-1">OVERVIEW</p>
        <h1 className="text-xl font-semibold text-gray-100">Live Classroom Monitoring</h1>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <div className="lg:col-span-2">
          <ClassroomFocusBar />
        </div>
        <FacultyAISummary />
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1 }}>
        <ClassroomHeatmap />
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.15 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-semibold text-gray-100">Student Monitoring</h2>
          <span className="text-[11px] text-gray-500">Auto-refreshing</span>
        </div>
        <StudentGrid />
      </motion.div>
    </div>
  );
}