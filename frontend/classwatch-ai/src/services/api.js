const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Backend only sends identity fields right now.
// These placeholders stand in for live-telemetry fields
// (activeWindow, focusScore, etc.) until Socket.IO is wired in.
export function normalizeStudent(raw) {
  return {
    id: raw.studentId,
    name: raw.studentName,
    pc: raw.systemName,
    socketId: raw.socketId,

    activeWindow: "-",
    app: "-",
    focusScore: 0,
    tag: "Awaiting data",
    status: "online",
    lastSeen: "Just now",
    thumbnail: "https://placehold.co/320x180/151b26/64748b?text=Awaiting+Feed",
  };
}

export async function fetchStudents() {
  const res = await fetch(`${BASE_URL}/students`);
  if (!res.ok) {
    throw new Error(`Failed to fetch students: ${res.status}`);
  }
  const data = await res.json();
  const list = Array.isArray(data) ? data : data.students || [];
  return list.map(normalizeStudent);
}
export async function fetchScreenshot(studentId) {
  const res = await fetch(`${BASE_URL}/screenshots/${studentId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch screenshot: ${res.status}`);
  }
  return res.json();
}
export async function loginRequest(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data; // expected: { token: "..." }
}