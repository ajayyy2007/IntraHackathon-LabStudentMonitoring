import { LuSparkles } from "react-icons/lu";
import { useAppContext } from "../context/AppContext.jsx";

export default function FacultyAISummary() {
  const { students } = useAppContext();

  if (students.length === 0) {
    return (
      <div className="glass rounded-xl2 p-4 border border-accent/20">
        <div className="flex items-center gap-2 mb-3">
          <LuSparkles className="text-accent-glow" size={16} />
          <h3 className="text-sm font-semibold">Faculty AI Summary</h3>
        </div>
        <p className="text-xs text-gray-500">Waiting for student data...</p>
      </div>
    );
  }

  const mostDistracted = [...students].sort((a, b) => a.focusScore - b.focusScore)[0];
  const mostFocused = [...students].sort((a, b) => b.focusScore - a.focusScore)[0];

  return (
    <div className="glass rounded-xl2 p-4 border border-accent/20">
      <div className="flex items-center gap-2 mb-3">
        <LuSparkles className="text-accent-glow" size={16} />
        <h3 className="text-sm font-semibold">Faculty AI Summary</h3>
      </div>
      <ul className="space-y-1.5 text-xs text-gray-300">
        <li>• Most focused: <span className="text-status-green">{mostFocused.name}</span></li>
        <li>• Most distracted: <span className="text-status-red">{mostDistracted.name}</span></li>
        <li>• Most used app: <span className="text-gray-100">Chrome</span></li>
        <li>• Avg coding time: <span className="text-gray-100">38 min</span></li>
        <li>• Class engagement is trending <span className="text-status-yellow">moderate</span> this session.</li>
      </ul>
    </div>
  );
}