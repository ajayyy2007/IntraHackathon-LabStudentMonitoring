import { LuDownload, LuFileText, LuTable } from "react-icons/lu";

export default function ReportRow({ report }) {
  const Icon = report.type === "CSV" ? LuTable : LuFileText;

  return (
    <div className="group flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
      <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
        <Icon size={15} className="text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-gray-100 truncate">{report.title}</p>
        <p className="text-[11px] text-gray-500">{report.date} · {report.type}</p>
      </div>
      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-white/[0.06] hover:text-accent-glow transition-all">
        <LuDownload size={15} />
      </button>
    </div>
  );
}