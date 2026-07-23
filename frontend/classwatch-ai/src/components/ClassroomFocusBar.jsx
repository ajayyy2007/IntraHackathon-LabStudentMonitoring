import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext.jsx";

export default function ClassroomFocusBar() {
  const { students } = useAppContext();
  const avg = Math.round(students.reduce((a, s) => a + s.focusScore, 0) / students.length);

  const color = avg >= 60 ? "#22c55e" : avg >= 30 ? "#eab308" : "#ef4444";

  return (
    <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[13px] font-semibold text-gray-100">Overall Classroom Focus</h3>
        <span className="text-sm font-bold" style={{ color }}>{avg}%</span>
      </div>

      <div className="relative h-3 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${avg}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}80` }}
        />
      </div>

      <div className="flex justify-between mt-1.5 text-[10px] text-gray-600">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}