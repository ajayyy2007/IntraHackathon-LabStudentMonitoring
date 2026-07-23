import socketio
import time
import psutil
import platform
from commands.command_handler import execute_command
from monitor.monitor_engine import collect_system_data
from capture.screenshot import get_screenshot_base64
# Create a Socket.IO client
sio = socketio.Client()

# Replace this with your teammate's IP
SERVER_URL = "http://172.20.66.158:5000"

computer_name = platform.node()

STUDENT_INFO = {
    "studentId": computer_name,
    "studentName": "Ajay",
    "systemName": computer_name
}
print("Computer Name:", computer_name)
@sio.event
def connect():
    print("✅ Connected to the backend!")

    sio.emit("register-student", STUDENT_INFO)

    print("✅ Student Registered")

    send_telemetry()


@sio.event
def disconnect():
    print("❌ Disconnected from the backend")

@sio.on("execute-command")
def on_execute_command(data):
    print("📥 Command Received:", data)

    execute_command(data.get("command", {}))

def send_telemetry():
 while True:
    try:
        system_data = collect_system_data()

        telemetry = {
            "studentId": STUDENT_INFO["studentId"],
            "activeWindow": system_data["window"],
            "cpu": system_data["cpu"],
            "memory": system_data["memory"]
        }

        sio.emit("telemetry-update", telemetry)

        screenshot = {
            "studentId": STUDENT_INFO["studentId"],
            "image": get_screenshot_base64()
        }

        sio.emit("screenshot-update", screenshot)

        print(
    f"📤 {system_data['window']} | "
    f"CPU: {system_data['cpu']}% | "
    f"RAM: {system_data['memory']}%"
        )

        print("📸 Screenshot Uploaded")

    except Exception as e:
        print("⚠ Error:", e)

    time.sleep(3)

def start_client():
    while True:
        try:
            print("🔄 Connecting to backend...")

            sio.connect(SERVER_URL)

            sio.wait()

        except Exception as e:
            print("❌ Connection Lost:", e)
            print("⏳ Reconnecting in 5 seconds...")

            time.sleep(5)