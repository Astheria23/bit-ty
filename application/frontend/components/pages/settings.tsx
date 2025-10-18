"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function Settings() {
  const [baudrate, setBaudrate] = useState("9600")
  const [port, setPort] = useState("")
  const [wifiSSID, setWifiSSID] = useState("")
  const [wifiPassword, setWifiPassword] = useState("")
  const [wifiConnected, setWifiConnected] = useState(false)

  // Mock available ports - in real app, this would come from backend
  const availablePorts = [
    { id: "COM3", label: "COM3 (Arduino Uno)" },
    { id: "COM4", label: "COM4" },
    { id: "/dev/ttyUSB0", label: "/dev/ttyUSB0 (Linux)" },
    { id: "/dev/ttyACM0", label: "/dev/ttyACM0 (Linux)" },
    { id: "/dev/cu.usbserial-1420", label: "/dev/cu.usbserial-1420 (macOS)" },
  ]

  const baudrates = ["300", "1200", "2400", "4800", "9600", "14400", "19200", "28800", "38400", "57600", "115200"]

  const handleSaveSerialSettings = () => {
    console.log("Saving serial settings:", { baudrate, port })
    // TODO: Send to backend API
  }

  const handleConnectWifi = () => {
    if (wifiSSID && wifiPassword) {
      console.log("Connecting to WiFi:", { wifiSSID })
      setWifiConnected(true)
      // TODO: Send to backend API
    }
  }

  const handleDisconnectWifi = () => {
    setWifiConnected(false)
    setWifiSSID("")
    setWifiPassword("")
    // TODO: Send to backend API
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-foreground mb-8">Setting</h2>
      <div className="space-y-6">
        {/* Serial Configuration Card */}
        <Card>
          <CardHeader>
            <CardTitle>Arduino Serial Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Port Selection */}
            <div className="space-y-2">
              <Label htmlFor="port-select">USB / COM / TTY Port</Label>
              <Select value={port} onValueChange={setPort}>
                <SelectTrigger id="port-select">
                  <SelectValue placeholder="Select port..." />
                </SelectTrigger>
                <SelectContent>
                  {availablePorts.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Select the USB port connected to the Arduino controller</p>
            </div>

            {/* Baudrate Selection */}
            <div className="space-y-2">
              <Label htmlFor="baudrate-select">Baudrate</Label>
              <Select value={baudrate} onValueChange={setBaudrate}>
                <SelectTrigger id="baudrate-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {baudrates.map((rate) => (
                    <SelectItem key={rate} value={rate}>
                      {rate} bps
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Serial communication speed with Arduino (default: 9600 bps)
              </p>
            </div>

            {/* Save Button */}
            <Button onClick={handleSaveSerialSettings} className="w-full" disabled={!port}>
              Save Serial Settings
            </Button>
          </CardContent>
        </Card>

        {/* WiFi Configuration Card */}
        <Card>
          <CardHeader>
            <CardTitle>WiFi Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {wifiConnected ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">✓ Connected to: {wifiSSID}</p>
                </div>
                <Button onClick={handleDisconnectWifi} variant="outline" className="w-full bg-transparent">
                  Disconnect WiFi
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* SSID Input */}
                <div className="space-y-2">
                  <Label htmlFor="wifi-ssid">SSID / Network Name</Label>
                  <Input
                    id="wifi-ssid"
                    placeholder="Enter WiFi network name"
                    value={wifiSSID}
                    onChange={(e) => setWifiSSID(e.target.value)}
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="wifi-password">Password</Label>
                  <Input
                    id="wifi-password"
                    type="password"
                    placeholder="Enter WiFi password"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                  />
                </div>

                {/* Connect Button */}
                <Button onClick={handleConnectWifi} className="w-full" disabled={!wifiSSID || !wifiPassword}>
                  Connect to WiFi
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Serial Status</p>
                <p className="font-medium">{port ? "✓ Connected" : "✗ Not Connected"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WiFi Status</p>
                <p className="font-medium">{wifiConnected ? "✓ Connected" : "✗ Not Connected"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
