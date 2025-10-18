"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface GestureMapping {
  id: string
  gesture: string
  action: string
}

const AVAILABLE_GESTURES = [
  { id: "swipe_left", label: "Swipe Left" },
  { id: "swipe_right", label: "Swipe Right" },
  { id: "swipe_up", label: "Swipe Up" },
  { id: "swipe_down", label: "Swipe Down" },
  { id: "hand_approach", label: "Hand Approach" },
  { id: "hand_away", label: "Hand Away" },
  { id: "hand_roll_cw", label: "Roll Clockwise" },
  { id: "hand_roll_ccw", label: "Roll Counter-Clockwise" },
  { id: "palm_open", label: "Palm Open" },
  { id: "palm_close", label: "Palm Close" },
  { id: "point_finger", label: "Point Finger" },
  { id: "peace_sign", label: "Peace Sign" },
]

const AVAILABLE_ACTIONS = [
  { id: "desktop_left", label: "Desktop Swipe Left" },
  { id: "desktop_right", label: "Desktop Swipe Right" },
  { id: "volume_up", label: "Volume Up" },
  { id: "volume_down", label: "Volume Down" },
  { id: "play_pause", label: "Play/Pause" },
  { id: "next_track", label: "Next Track" },
  { id: "prev_track", label: "Previous Track" },
  { id: "screenshot", label: "Screenshot" },
  { id: "lock_screen", label: "Lock Screen" },
  { id: "open_menu", label: "Open Menu" },
  { id: "close_app", label: "Close App" },
  { id: "custom_1", label: "Custom Action 1" },
  { id: "custom_2", label: "Custom Action 2" },
  { id: "custom_3", label: "Custom Action 3" },
]

export default function GestureConfig() {
  const [mappings, setMappings] = useState<GestureMapping[]>([
    { id: "1", gesture: "swipe_left", action: "desktop_left" },
    { id: "2", gesture: "swipe_right", action: "desktop_right" },
  ])
  const [selectedGesture, setSelectedGesture] = useState("")
  const [selectedAction, setSelectedAction] = useState("")

  const getGestureLabel = (gestureId: string) => {
    return AVAILABLE_GESTURES.find((g) => g.id === gestureId)?.label || gestureId
  }

  const getActionLabel = (actionId: string) => {
    return AVAILABLE_ACTIONS.find((a) => a.id === actionId)?.label || actionId
  }

  const handleAddMapping = () => {
    if (selectedGesture && selectedAction) {
      // Check if gesture is already mapped
      if (mappings.some((m) => m.gesture === selectedGesture)) {
        alert("This gesture is already configured. Delete it first to change it.")
        return
      }

      const newMapping: GestureMapping = {
        id: Date.now().toString(),
        gesture: selectedGesture,
        action: selectedAction,
      }

      setMappings([...mappings, newMapping])
      setSelectedGesture("")
      setSelectedAction("")
    }
  }

  const handleRemoveMapping = (id: string) => {
    setMappings(mappings.filter((m) => m.id !== id))
  }

  const handleSaveConfig = () => {
    console.log("Saving gesture configuration:", mappings)
    // TODO: Send to backend API
    alert("Gesture configuration saved successfully!")
  }

  const usedGestures = mappings.map((m) => m.gesture)
  const availableGesturesForAdd = AVAILABLE_GESTURES.filter((g) => !usedGestures.includes(g.id))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gesture Sensor Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Mapping Section */}
        <div className="border-b pb-6">
          <h3 className="font-semibold text-foreground mb-4">Add New Gesture</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Gesture Selection */}
            <div className="space-y-2">
              <Label htmlFor="gesture-select">Select Gesture</Label>
              <Select value={selectedGesture} onValueChange={setSelectedGesture}>
                <SelectTrigger id="gesture-select">
                  <SelectValue placeholder="Choose gesture..." />
                </SelectTrigger>
                <SelectContent>
                  {availableGesturesForAdd.map((gesture) => (
                    <SelectItem key={gesture.id} value={gesture.id}>
                      {gesture.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Selection */}
            <div className="space-y-2">
              <Label htmlFor="action-select">Assign Action</Label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger id="action-select">
                  <SelectValue placeholder="Choose action..." />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_ACTIONS.map((action) => (
                    <SelectItem key={action.id} value={action.id}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Add Button */}
            <div className="flex items-end">
              <Button onClick={handleAddMapping} className="w-full" disabled={!selectedGesture || !selectedAction}>
                Add Mapping
              </Button>
            </div>
          </div>
        </div>

        {/* Current Mappings */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Configured Gestures</h3>
          {mappings.length === 0 ? (
            <p className="text-muted-foreground text-sm">No gestures configured yet</p>
          ) : (
            <div className="space-y-3">
              {mappings.map((mapping) => (
                <div
                  key={mapping.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Gesture</p>
                        <p className="font-medium">{getGestureLabel(mapping.gesture)}</p>
                      </div>
                      <div className="text-muted-foreground">→</div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Action</p>
                        <p className="font-medium">{getActionLabel(mapping.action)}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMapping(mapping.id)}
                    className="ml-4 text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <Button onClick={handleSaveConfig} className="w-full" disabled={mappings.length === 0}>
          Save Gesture Configuration
        </Button>
      </CardContent>
    </Card>
  )
}
