import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("✅ Faculty connected:", socket.id);

  socket.emit("register-faculty", {
    facultyId: "FACULTY-01",
    facultyName: "Faculty Dashboard"
  });
});