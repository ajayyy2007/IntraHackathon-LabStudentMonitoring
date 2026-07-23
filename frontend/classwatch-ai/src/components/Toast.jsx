import { motion, AnimatePresence } from "framer-motion";
import { LuOctagonAlert, LuX } from "react-icons/lu";

export default function Toast({ alert, onClose }) {
  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-20 right-6 w-80 bg-[#12161f] backdrop-blur-xl rounded-xl p-3.5 flex items-start gap-3 border border-status-red/25 shadow-glass z-50"
        >
          <div className="w-8 h-8 rounded-lg bg-status-red/10 flex items-center justify-center shrink-0">
            <LuOctagonAlert className="text-status-red" size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-gray-100">Critical Alert</p>
            <p className="text-[12px] text-gray-400 mt-0.5">
              <span className="text-gray-200">{alert.student}</span> — {alert.message}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-300 transition-colors shrink-0">
            <LuX size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}