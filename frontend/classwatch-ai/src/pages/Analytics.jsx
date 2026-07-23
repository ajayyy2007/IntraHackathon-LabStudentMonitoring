import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  LuGauge,
  LuTrendingUp,
  LuTrendingDown,
  LuUsers,
} from "react-icons/lu";
import { useAppContext } from "../context/AppContext.jsx";
import { focusDistribution, appUsage } from "../data/mockAnalytics.js";
import StatCard from "../components/StatCard.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Analytics() {
  const { students } = useAppContext();

  // Prevent crash when students data is not loaded yet
  if (!students || students.length === 0) {
    return (
      <div className="space-y-6 animate-pulse">
        <div>
          <div className="h-3 w-20 rounded bg-gray-800 mb-2"></div>
          <div className="h-8 w-48 rounded bg-gray-800"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-2xl bg-[#0f141d] border border-white/5"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-72 rounded-2xl bg-[#0f141d] border border-white/5" />
          <div className="h-72 rounded-2xl bg-[#0f141d] border border-white/5" />
        </div>
      </div>
    );
  }

  const avgFocus = Math.round(
    students.reduce((a, s) => a + s.focusScore, 0) / students.length
  );

  const mostFocused = [...students].sort(
    (a, b) => b.focusScore - a.focusScore
  )[0];

  const mostDistracted = [...students].sort(
    (a, b) => a.focusScore - b.focusScore
  )[0];

  const attendance = `${
    students.filter((s) => s.status === "online").length
  }/${students.length}`;

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <p className="text-[11px] text-gray-500 tracking-widest mb-1">
          INSIGHTS
        </p>
        <h1 className="text-xl font-semibold text-gray-100">Analytics</h1>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="AVERAGE FOCUS"
          value={`${avgFocus}%`}
          valueColor="text-accent-glow"
          icon={LuGauge}
        />

        <StatCard
          label="MOST FOCUSED"
          value={mostFocused.name}
          valueColor="text-status-green"
          icon={LuTrendingUp}
        />

        <StatCard
          label="MOST DISTRACTED"
          value={mostDistracted.name}
          valueColor="text-status-red"
          icon={LuTrendingDown}
        />

        <StatCard
          label="ATTENDANCE"
          value={attendance}
          icon={LuUsers}
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl p-4">
          <h3 className="text-[13px] font-semibold text-gray-100 mb-1">
            Focus Distribution
          </h3>

          <p className="text-[11px] text-gray-500 mb-3">
            Class-wide engagement breakdown
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={focusDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={3}
                stroke="none"
              >
                {focusDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#0f141d",
                  border: "1px solid #212836",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={28}
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-[11px] text-gray-400">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl p-4">
          <h3 className="text-[13px] font-semibold text-gray-100 mb-1">
            Most Used Applications
          </h3>

          <p className="text-[11px] text-gray-500 mb-3">
            Minutes active this session
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={appUsage} barSize={28}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1a212e"
                vertical={false}
              />

              <XAxis
                dataKey="app"
                stroke="#64748b"
                fontSize={11}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                stroke="#64748b"
                fontSize={11}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#0f141d",
                  border: "1px solid #212836",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />

              <Bar
                dataKey="minutes"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}