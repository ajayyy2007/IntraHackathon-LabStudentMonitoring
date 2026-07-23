export default function StatCard({ label, value, valueColor = "text-gray-100", icon: Icon }) {
  return (
    <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl p-4 hover:border-white/[0.12] transition-colors">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] text-gray-500 tracking-wide">{label}</p>
        {Icon && <Icon size={14} className="text-gray-600" />}
      </div>
      <p className={`text-2xl font-bold tracking-tight ${valueColor}`}>{value}</p>
    </div>
  );
}