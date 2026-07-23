const events = [
  { time: "10:15", label: "Opened Chrome" },
  { time: "10:17", label: "ChatGPT Detected" },
  { time: "10:20", label: "Returned to VS Code" },
  { time: "10:24", label: "USB Connected" },
  { time: "10:30", label: "Discord Opened" },
];

export default function SuspiciousTimeline() {
  return (
    <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl p-4">
      <h3 className="text-[13px] font-semibold text-gray-100 mb-4">Suspicious Timeline</h3>
      <div>
        {events.map((e, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="w-2 h-2 rounded-full bg-accent-glow shrink-0 mt-1" />
              {i !== events.length - 1 && <span className="w-px flex-1 bg-white/[0.08] my-1" />}
            </div>
            <div className="pb-4">
              <p className="text-[11px] text-gray-500 font-mono mb-0.5">{e.time}</p>
              <p className="text-[12px] text-gray-300">{e.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}