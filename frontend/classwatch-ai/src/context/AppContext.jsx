import { createContext, useContext, useState, useEffect } from "react";
import { mockAlerts } from "../data/mockAlert";
import { fetchStudents, normalizeStudent } from "../services/api.js";
import { socket } from "../services/socket.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [studentsError, setStudentsError] = useState(null);

  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Initial load via REST (unchanged from before)
  useEffect(() => {
    fetchStudents()
      .then((data) => setStudents(data))
      .catch((err) => setStudentsError(err.message))
      .finally(() => setLoadingStudents(false));
  }, []);

  // Live updates via Socket.IO
  // Live updates via Socket.IO
useEffect(() => {

    const handleStudentsUpdated = (rawList) => {
        setStudents(rawList.map(normalizeStudent));
    };

    const handleTelemetryUpdated = (payload) => {

        setStudents(prev =>
            prev.map(student =>
                student.id === payload.studentId
                    ? {
                          ...student,
                          activeWindow: payload.activeWindow,
                          cpu: payload.cpu,
                          memory: payload.memory,
                          lastUpdated: payload.lastUpdated
                      }
                    : student
            )
        );

    };

    const handleScreenshotUpdated = (payload) => {

        setStudents(prev =>
            prev.map(student =>
                student.id === payload.studentId
                    ? {
                          ...student,
                          thumbnail: `data:image/jpeg;base64,${payload.image}`
                      }
                    : student
            )
        );

    };

    socket.on("students-updated", handleStudentsUpdated);
    socket.on("telemetry-updated", handleTelemetryUpdated);
    socket.on("screenshot-updated", handleScreenshotUpdated);

    return () => {

        socket.off("students-updated", handleStudentsUpdated);
        socket.off("telemetry-updated", handleTelemetryUpdated);
        socket.off("screenshot-updated", handleScreenshotUpdated);

    };

}, []);

  const value = {
    students,
    setStudents,
    loadingStudents,
    studentsError,
    alerts,
    setAlerts,
    selectedStudent,
    setSelectedStudent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}