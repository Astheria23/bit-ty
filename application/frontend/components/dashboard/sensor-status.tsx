import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Mic, Hand } from "lucide-react"

export default function SensorStatus() {
  const sensors = [
    { icon: Thermometer, label: "Room Temperature: 28.5 °C" },
    { icon: Mic, label: "Microphone: Listening" },
    { icon: Hand, label: "Last Gesture: Swipe Right" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sensor Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sensors.map((sensor, index) => {
            const Icon = sensor.icon
            return (
              <div key={index} className="flex items-center gap-3">
                <Icon size={20} className="text-primary" />
                <span className="text-foreground">{sensor.label}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
