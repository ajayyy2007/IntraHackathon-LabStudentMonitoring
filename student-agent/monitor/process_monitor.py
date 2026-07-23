import win32gui
import win32process
import psutil


def get_active_process():
    try:
        hwnd = win32gui.GetForegroundWindow()

        _, pid = win32process.GetWindowThreadProcessId(hwnd)

        process = psutil.Process(pid)

        return process.name()

    except Exception as e:
        return f"Unknown ({e})"