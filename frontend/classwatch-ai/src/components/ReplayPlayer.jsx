import { useState } from "react";
import { LuPlay, LuPause, LuSkipBack, LuSkipForward, LuFilm } from "react-icons/lu";

const speeds = [1, 2, 4];

export default function ReplayPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [speed, setSpeed] = useState(1);

  return (
    <div className="bg-[#0f141d] border border-white/[0.06] rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <LuFilm size={14} className="text-accent-glow" />
        <h3 className="text-[13px] font-semibold text-gray-100">Replay Mode</h3>
      </div>
      <p className="text-[11px] text-gray-500 mb-3">Scrub through captured session screenshots</p>

      <div className="relative rounded-xl overflow-hidden mb-4 bg-black/30 border border-white/[0.06]">
        <img
          src="https://placehold.co/640x300/151b26/60a5fa?text=Screenshot+Playback"
          alt=""
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-status-red animate-pulse" />
          <span className="text-[10px] font-mono text-gray-300">10:{String(Math.floor(progress / 2)).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="relative mb-4">
        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <div className="h-full bg-accent-glow rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-gray-200 transition-colors">
            <LuSkipBack size={17} />
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center shadow-glow hover:brightness-110 transition-all"
          >
            {playing ? <LuPause size={16} className="text-white" /> : <LuPlay size={16} className="text-white ml-0.5" />}
          </button>
          <button className="text-gray-500 hover:text-gray-200 transition-colors">
            <LuSkipForward size={17} />
          </button>
        </div>

        <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-lg p-0.5">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                speed === s ? "bg-white/[0.08] text-gray-100" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}