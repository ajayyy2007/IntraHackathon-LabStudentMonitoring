from datetime import datetime

import psutil

from capture.screenshot import capture_screen
from monitor.active_window import get_active_window
from monitor.process_monitor import get_active_process


def collect_system_data():
    capture_screen()

    data = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "window": get_active_window(),
        "process": get_active_process(),
        "cpu": psutil.cpu_percent(interval=None),
        "memory": psutil.virtual_memory().percent,
        "screenshot": "latest.jpg"
    }

    return data