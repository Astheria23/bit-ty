"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Volume2 } from "lucide-react"

export default function QuickActions() {
  const [voiceCommand, setVoiceCommand] = useState(false)
  const [gestureShortcut, setGestureShortcut] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Voice Command Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Listen to Voice Commands</label>
          <Switch checked={voiceCommand} onCheckedChange={setVoiceCommand} />
        </div>

        {/* Gesture Shortcut Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Enable Gesture Shortcuts</label>
          <Switch checked={gestureShortcut} onCheckedChange={setGestureShortcut} />
        </div>

        {/* Test Sound Button */}
        <Button className="w-full mt-4" variant="default">
          <Volume2 size={16} className="mr-2" />
          Play Test Sound
        </Button>
      </CardContent>
    </Card>
  )
}
