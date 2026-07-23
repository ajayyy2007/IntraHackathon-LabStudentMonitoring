import { useState } from "react";

export default function ToggleRow({ label, description, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);

  return (
    <div className="flex items-center justify-between py-1">
      <div className="pr-4">
        <p className="text-[13px] text-gray-200 font-medium">{label}</p>
        {description && <p className="text-[11px] text-gray-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`w-10 h-[22px] rounded-full relative transition-colors shrink-0 ${
          on ? "bg-gradient-to-r from-accent to-accent-glow" : "bg-white/[0.08]"
        }`}
      >
        <span
          className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
            on ? "translate-x-[22px]" : "translate-x-[3px]"
          }`}
        />
      </button>
    </div>
  );
}