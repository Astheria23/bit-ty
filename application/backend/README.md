# Bit-Ty Backend

Backend Flask service responsible for bridging the Bit-Ty robot (ESP32) with desktop integrations.

## Quick start

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
cp .env.example .env
flask --app run.py run
```

Alternatively, to launch with Socket.IO support:

```bash
python run.py
```

List available serial devices (USB) detected by the system:

```bash
flask --app run.py devices
```

## Project layout

```
backend/
├── app/
│   ├── __init__.py       # Flask application factory and extensions
│   ├── config.py         # Centralized configuration values
│   └── routes.py         # REST endpoints
├── .env.example          # Sample environment variables
├── README.md             # This file
├── requirements.txt      # Python dependencies
└── run.py                # Socket.IO-enabled development server entrypoint
```

## Next steps

- Implement auto-selection of the correct Bit-Ty serial port from the `devices` output and wire it into app startup.
- Wire `/status` endpoint to real data from Serial/WiFi subsystems.
- Add authentication and rate limiting before exposing beyond localhost.
