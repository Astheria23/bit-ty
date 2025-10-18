"""Configuration objects for Bit-Ty backend."""
from __future__ import annotations

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent


class BittyConfig:
    """Default configuration applied to all environments."""

    SECRET_KEY = os.getenv("BITTY_SECRET_KEY", "dev-secret-key")
    DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"

    # SocketIO settings
    SOCKETIO_MESSAGE_QUEUE = os.getenv("SOCKETIO_MESSAGE_QUEUE")
    SOCKETIO_ASYNC_MODE = os.getenv("SOCKETIO_ASYNC_MODE", "eventlet")

    # Serial settings
    DEFAULT_SERIAL_PORT = os.getenv("BITTY_SERIAL_PORT", "auto")
    SERIAL_BAUD_RATE = int(os.getenv("BITTY_SERIAL_BAUD", "115200"))

    # Fallback wifi config
    WIFI_DISCOVERY_TIMEOUT = float(os.getenv("BITTY_WIFI_TIMEOUT", "5"))

    @staticmethod
    def init_app(app):  # type: ignore[no-untyped-def]
        """Hook for custom initialization per environment."""
        app.logger.debug("BittyConfig initialized")
