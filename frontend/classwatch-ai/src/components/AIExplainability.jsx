import { LuSparkles } from "react-icons/lu";

export default function AIExplainability({ student }) {
  const reasons = [
    "ChatGPT detected",
    "Discord opened",
    "USB Connected",
    "Low Focus Score",
    "Excessive Window Switching",
  ];

  return (
    <div className="bg-[#0f141d] border border-accent/[0.15] rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <LuSparkles size={14} className="text-accent-glow" />
        <h3 className="text-[13px] font-semibold text-gray-100">AI Explainability</h3>
      </div>
      <p className="text-[11px] text-gray-500 mb-3">Why {student.name} was flagged</p>
      <ul className="space-y-2.5">
        {reasons.map((r) => (
          <li key={r} className="flex items-center gap-2.5 text-[12px] text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-status-red shrink-0" />
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}