from mss import mss
from PIL import Image
import base64
from io import BytesIO


def capture_screen():
    with mss() as sct:
        screenshot = sct.grab(sct.monitors[1])

        image = Image.frombytes(
            "RGB",
            screenshot.size,
            screenshot.rgb
        )

        image.save("latest.jpg")

        return image


def get_screenshot_base64():
    image = capture_screen()

    buffer = BytesIO()

    image.save(buffer, format="JPEG",quality=40,optimize=True)

    image_bytes = buffer.getvalue()

    return base64.b64encode(image_bytes).decode("utf-8")