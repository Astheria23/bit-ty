"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SensorStatus from "@/components/dashboard/sensor-status"
import QuickActions from "@/components/dashboard/quick-actions"
import ServoControl from "@/components/manual-control/servo-control"
import GestureConfig from "@/components/dashboard/gesture-config"
import { Upload, Download } from "lucide-react"

export default function Dashboard() {
  const handleUploadConfig = () => {
    console.log("Upload configuration")
    // TODO: Implement upload functionality
  }

  const handleReadData = () => {
    console.log("Read data from MCU")
    // TODO: Implement read data functionality
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-10 bg-background border-b border-border p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">Control Panel</h2>
          <div className="flex gap-3">
            <Button onClick={handleUploadConfig} variant="outline" className="gap-2 bg-transparent">
              <Upload size={18} />
              Upload Configuration
            </Button>
            <Button onClick={handleReadData} variant="outline" className="gap-2 bg-transparent">
              <Download size={18} />
              Read Data from MCU
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6 h-full">
            {/* Left: Model Visualizer - takes 2 columns for more vertical space */}
            <div className="col-span-2 row-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>3D Model Bit-Ty</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)]">
                  <div className="w-full h-full border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/30">
                    <p className="text-muted-foreground text-lg">Model will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Servo Controls */}
            <div>
              <ServoControl />
            </div>

            {/* Right: Sensor Status and Quick Actions below Servo Control */}
            <div className="space-y-6">
              <SensorStatus />
              <QuickActions />
            </div>
          </div>

          {/* Gesture Configuration */}
          <div>
            <GestureConfig />
          </div>
        </div>
      </div>
    </div>
  )
}
