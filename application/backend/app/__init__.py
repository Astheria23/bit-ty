"""Application factory for Bit-Ty backend."""
from __future__ import annotations

from flask import Flask
from flask_socketio import SocketIO
import click

socketio = SocketIO(cors_allowed_origins="*")

def create_app(config_object: str | None = None) -> Flask:
    """Create and configure the Flask application.

    Args:
        config_object: Optional import path to configuration class. When omitted,
            ``BittyConfig`` is used.

    Returns:
        Configured Flask application instance.
    """
    app = Flask(__name__, instance_relative_config=True)

    if config_object:
        app.config.from_object(config_object)
    else:
        app.config.from_object("app.config.BittyConfig")

    register_extensions(app)
    register_blueprints(app)
    register_cli(app)

    return app


def register_extensions(app: Flask) -> None:
    """Initialize Flask extensions."""
    socketio.init_app(app)


def register_blueprints(app: Flask) -> None:
    """Register application blueprints."""
    from .routes import api_bp

    app.register_blueprint(api_bp)

def register_cli(app: Flask) -> None:
    """Register custom Flask CLI commands."""
    @app.cli.command("devices")
    def list_devices() -> None:
        """List detected serial ports using pyserial."""
        try:
            from serial.tools import list_ports  # type: ignore
        except Exception as exc:  # pragma: no cover - env dependent
            click.echo("pyserial is not installed or unavailable.")
            click.echo(f"Error: {exc}")
            raise click.Abort()

        ports = list(list_ports.comports())
        if not ports:
            click.echo("No serial ports detected.")
            return

        click.echo(f"Found {len(ports)} serial port(s):\n")
        for p in ports:
            # p.device, p.description, p.hwid are commonly available
            click.echo(f"- {p.device} | {p.description} | {p.hwid}")
