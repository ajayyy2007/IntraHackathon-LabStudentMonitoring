import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuArrowLeft, LuLock, LuOctagonX, LuLink, LuCircle } from "react-icons/lu";
import { useAppContext } from "../context/AppContext.jsx";
import { fetchScreenshot } from "../services/api.js";
import { socket } from "../services/socket.js";
import FocusTrendChart from "../components/FocusTrendChart.jsx";
import AIExplainability from "../components/AIExplainability.jsx";
import SuspiciousTimeline from "../components/SuspiciousTimeline.jsx";
import CommandModal from "../components/CommandModal.jsx";
import { LuMessageSquare } from "react-icons/lu";


export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students } = useAppContext();
  const student = students.find((s) => s.id === id);
  const [activeBtn, setActiveBtn] = useState(null);
  const [modalMode, setModalMode] = useState(null); // "SHOW_MESSAGE" | "OPEN_URL" | "LOCK_SCREEN" | null

  const [screenshot, setScreenshot] = useState(null);
  const [screenshotLoading, setScreenshotLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setScreenshotLoading(true);

    fetchScreenshot(id)
      .then((data) => {
        if (!cancelled) setScreenshot(data);
      })
      .catch(() => {
        if (!cancelled) setScreenshot(null);
      })
      .finally(() => {
        if (!cancelled) setScreenshotLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    const handleScreenshotUpdated = (payload) => {
      if (payload.studentId !== id) return;
      setScreenshot((prev) => {
        if (prev && prev.updatedAt === payload.updatedAt) return prev;
        return payload;
      });
    };

    socket.on("screenshot-updated", handleScreenshotUpdated);
    return () => {
      socket.off("screenshot-updated", handleScreenshotUpdated);
    };
  }, [id]);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-sm text-gray-400">Student not found.</p>
        <button onClick={() => navigate(-1)} className="text-xs text-accent-glow mt-2 hover:underline">
          Go back
        </button>
      </div>
    );
  }

  const statusColor = student.status === "online" ? "text-status-green" : "text-gray-500";

  const actionBtns = [
  { key: "message", mode: "SHOW_MESSAGE", icon: LuMessageSquare, label: "Message", color: "text-accent-glow" },
  { key: "lock", mode: "LOCK_SCREEN", icon: LuLock, label: "Lock", color: "text-status-yellow" },
  { key: "kill", mode: null, icon: LuOctagonX, label: "Kill App", color: "text-status-red" },
  { key: "url", mode: "OPEN_URL", icon: LuLink, label: "Open URL", color: "text-accent-glow" },
];

  const handleActionClick = (btn) => {
    setActiveBtn(btn.key);
    if (btn.mode) setModalMode(btn.mode);
  };

  const sendCommand = (command) => {
    socket.emit("send-command", { studentId: id, command });
    setModalMode(null);
  };

  const screenSrc = screenshot?.image
    ? `data:image/png;base64,${screenshot.image}`
    : student.thumbnail;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <CommandModal
        open={!!modalMode}
        mode={modalMode}
        onCancel={() => setModalMode(null)}
        onConfirm={sendCommand}
      />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-200 mb-5 transition-colors"
      >
        <LuArrowLeft size={15} /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <LuCircle size={8} className={`fill-current ${statusColor}`} />
                <span className="text-[12px] text-gray-400">Live Feed — {student.pc}</span>
              </div>
              <span className="text-[11px] text-gray-600 font-mono">
                {screenshotLoading ? "LOADING" : "REC"}
              </span>
            </div>
            <img src={screenSrc} alt="" className="w-full h-80 object-cover" />
          </div>

          <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-gray-100">{student.name}</h2>
              <p className="text-[12px] text-gray-500 mt-0.5">{student.pc} • Last seen {student.lastSeen}</p>
            </div>

            <div className="relative flex gap-1 bg-white/[0.02] border border-white/[0.06] rounded-xl p-1">
  {actionBtns.map((btn) => {
    const { key, icon: Icon, label, color } = btn;
    return (
      <button
        key={key}
        onClick={() => handleActionClick(btn)}
        className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium transition-colors"
      >
        {activeBtn === key && (
          <motion.span
            layoutId="student-action-pill"
            className="absolute inset-0 bg-white/[0.07] border border-white/[0.1] rounded-lg"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className={`relative flex items-center gap-1.5 ${activeBtn === key ? color : "text-gray-400"}`}>
          <Icon size={13} /> {label}
        </span>
      </button>
    );
  })}
</div>
          </div>

          <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-100 mb-3">Focus Trend</h3>
            <FocusTrendChart />
          </div>
        </div>

        <div className="space-y-5">
          <AIExplainability student={student} />
          <SuspiciousTimeline />
        </div>
      </div>
    </motion.div>
  );
}