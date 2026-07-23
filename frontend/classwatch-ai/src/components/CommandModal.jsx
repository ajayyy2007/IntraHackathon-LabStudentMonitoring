import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { LuX, LuTriangleAlert } from "react-icons/lu";

export default function CommandModal({ open, mode, onCancel, onConfirm }) {
  const [title, setTitle] = useState("Teacher");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("Teacher");
      setMessage("");
      setUrl("");
    }
  }, [open, mode]);

  if (!mode) return null;

  const handleSubmit = () => {
    if (mode === "SHOW_MESSAGE") {
      if (!message.trim()) return;
      onConfirm({ type: "SHOW_MESSAGE", title: title.trim() || "Teacher", message: message.trim() });
    } else if (mode === "OPEN_URL") {
      if (!url.trim()) return;
      onConfirm({ type: "OPEN_URL", url: url.trim() });
    } else if (mode === "LOCK_SCREEN") {
      onConfirm({ type: "LOCK_SCREEN" });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#0f141d] border border-white/[0.08] rounded-2xl p-5 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-gray-100">
                {mode === "SHOW_MESSAGE" && "Send Message"}
                {mode === "OPEN_URL" && "Open URL on Student PC"}
                {mode === "LOCK_SCREEN" && "Lock Student Screen"}
              </h3>
              <button onClick={onCancel} className="text-gray-500 hover:text-gray-200 transition-colors">
                <LuX size={16} />
              </button>
            </div>

            {mode === "SHOW_MESSAGE" && (
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-[11px] text-gray-500 mb-1.5 block">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13px] text-gray-100 outline-none focus:border-accent/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 mb-1.5 block">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type the message to display..."
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13px] text-gray-100 placeholder:text-gray-600 outline-none focus:border-accent/60 transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {mode === "OPEN_URL" && (
              <div className="mb-5">
                <label className="text-[11px] text-gray-500 mb-1.5 block">URL</label>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13px] text-gray-100 placeholder:text-gray-600 outline-none focus:border-accent/60 transition-colors"
                />
              </div>
            )}

            {mode === "LOCK_SCREEN" && (
              <div className="flex items-start gap-3 mb-5 p-3 rounded-lg bg-status-yellow/[0.08] border border-status-yellow/20">
                <LuTriangleAlert size={16} className="text-status-yellow shrink-0 mt-0.5" />
                <p className="text-[12px] text-gray-300">
                  This will immediately lock the student's screen. They won't be able to use their PC until unlocked.
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={onCancel}
                className="flex-1 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.07] text-[13px] font-medium text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold text-white transition-all shadow-glow ${
                  mode === "LOCK_SCREEN"
                    ? "bg-status-red hover:brightness-110"
                    : "bg-gradient-to-r from-accent to-accent-glow hover:brightness-110"
                }`}
              >
                {mode === "LOCK_SCREEN" ? "Confirm Lock" : "Send"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}