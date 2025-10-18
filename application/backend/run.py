"""Development server entrypoint for Bit-Ty backend."""
from __future__ import annotations

import os

from app import create_app, socketio


app = create_app()


if __name__ == "__main__":
    host = os.getenv("BITTY_HOST", "127.0.0.1")
    port = int(os.getenv("BITTY_PORT", "5000"))
    socketio.run(app, host=host, port=port)
