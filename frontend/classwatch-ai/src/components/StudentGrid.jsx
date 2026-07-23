import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StudentCard from "./StudentCard.jsx";
import { useAppContext } from "../context/AppContext.jsx";

export default function StudentGrid() {
  const { students, setSelectedStudent, loadingStudents, studentsError } = useAppContext();
  const navigate = useNavigate();

  const openStudent = (student) => {
    setSelectedStudent(student);
    navigate(`/students/${student.id}`);
  };

  if (loadingStudents) {
    return <p className="text-sm text-gray-500">Loading students...</p>;
  }

  if (studentsError) {
    return <p className="text-sm text-status-red">Failed to load students: {studentsError}</p>;
  }

  if (students.length === 0) {
    return (
      <div className="border border-dashed border-white/10 rounded-2xl py-16 flex flex-col items-center justify-center text-center">
        <p className="text-sm text-gray-400 font-medium">No students connected</p>
        <p className="text-xs text-gray-600 mt-1">Devices will appear here once they join the session.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {students.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
        >
          <StudentCard student={s} onClick={() => openStudent(s)} />
        </motion.div>
      ))}
    </div>
  );
}