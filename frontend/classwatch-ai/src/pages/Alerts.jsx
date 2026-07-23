import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LuSearch, LuInbox } from "react-icons/lu";
import { useAppContext } from "../context/AppContext.jsx";
import AlertItem from "../components/AlertItem.jsx";
import Toast from "../components/Toast.jsx";

const filters = [
  { key: "all", label: "All" },
  { key: "critical", label: "Critical" },
  { key: "warning", label: "Warning" },
];

export default function Alerts() {
  const { alerts } = useAppContext();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(alerts[0] || null);

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      const matchesFilter = filter === "all" || a.type === filter;
      const matchesSearch = a.student.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [alerts, filter, search]);

  return (
    <div className="space-y-5">
      <Toast alert={toast} onClose={() => setToast(null)} />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-gray-500 tracking-widest mb-1">MONITORING</p>
          <h1 className="text-xl font-semibold text-gray-100">Alerts</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2">
            <LuSearch size={13} className="text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student..."
              className="bg-transparent text-[12px] text-gray-200 placeholder:text-gray-600 outline-none w-36"
            />
          </div>

          <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-lg p-0.5">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`relative text-[12px] px-3 py-1.5 rounded-md font-medium transition-colors ${
                  filter === f.key ? "text-gray-100" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {filter === f.key && (
                  <motion.span
                    layoutId="alert-filter-pill"
                    className="absolute inset-0 bg-white/[0.06] rounded-md"
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl p-3 space-y-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <LuInbox size={28} className="text-gray-700 mb-3" />
            <p className="text-sm text-gray-400">No alerts match your filters</p>
            <p className="text-xs text-gray-600 mt-1">Try adjusting your search or filter selection.</p>
          </div>
        ) : (
          filtered.map((a) => <AlertItem key={a.id} alert={a} />)
        )}
      </div>
    </div>
  );
}