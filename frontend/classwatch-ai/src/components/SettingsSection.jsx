export default function SettingsSection({ title, description, icon: Icon, children }) {
  return (
    <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl p-5">
      <div className="flex items-center gap-2.5 mb-1">
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center">
            <Icon size={14} className="text-accent-glow" />
          </div>
        )}
        <h3 className="text-[14px] font-semibold text-gray-100">{title}</h3>
      </div>
      {description && <p className="text-[11px] text-gray-500 mb-4 ml-9.5">{description}</p>}
      <div className={`space-y-4 ${description ? "" : "mt-4"}`}>{children}</div>
    </div>
  );
}