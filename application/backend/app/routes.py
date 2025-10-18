"""API route definitions for Bit-Ty backend."""
from __future__ import annotations

from flask import Blueprint, jsonify

api_bp = Blueprint("api", __name__, url_prefix="/api")


@api_bp.get("/health")
def healthcheck() -> tuple[dict[str, str], int]:
    """Simple health endpoint so clients can probe backend readiness."""
    return jsonify(status="ok", service="bit-ty-backend"), 200


@api_bp.get("/status")
def status() -> tuple[dict[str, str], int]:
    """Placeholder endpoint describing backend mode."""
    # TODO: Replace hard-coded payload with actual serial discovery state
    payload = {
        "mode": "serial",
        "serial_connected": False,
        "wifi_fallback": False,
    }
    return jsonify(payload), 200
