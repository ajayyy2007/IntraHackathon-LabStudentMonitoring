import ctypes
import webbrowser
from tkinter import Tk, messagebox


def execute_command(command):
    command_type = command.get("type")

    if command_type == "LOCK_SCREEN":
        print("🔒 Locking screen...")
        ctypes.windll.user32.LockWorkStation()

    elif command_type == "OPEN_URL":
        url = command.get("url")

        if url:
            print(f"🌐 Opening {url}")
            webbrowser.open(url)

    elif command_type == "SHOW_MESSAGE":
        title = command.get("title", "Teacher")
        message = command.get("message", "Hello Student!")

        root = Tk()
        root.withdraw()

        messagebox.showinfo(title, message)

        root.destroy()

    else:
        print("❌ Unknown Command:", command)