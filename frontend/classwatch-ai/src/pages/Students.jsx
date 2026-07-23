import { motion } from "framer-motion";
import StudentGrid from "../components/StudentGrid.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Students() {
  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <p className="text-[11px] text-gray-500 tracking-widest mb-1">MONITORING</p>
        <h1 className="text-xl font-semibold text-gray-100">All Students</h1>
      </motion.div>
      <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.05 }}>
        <StudentGrid />
      </motion.div>
    </div>
  );
}