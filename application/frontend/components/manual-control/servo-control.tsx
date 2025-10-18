"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function ServoControl() {
  const [leftHand, setLeftHand] = useState(50)
  const [rightHand, setRightHand] = useState(50)
  const [head, setHead] = useState(50)
  const [body, setBody] = useState(50)

  const sliders = [
    { label: "Left Hand", value: leftHand, onChange: setLeftHand },
    { label: "Right Hand", value: rightHand, onChange: setRightHand },
    { label: "Head", value: head, onChange: setHead },
    { label: "Body", value: body, onChange: setBody },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Servo Control</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {sliders.map((slider, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">{slider.label}</label>
              <span className="text-sm text-muted-foreground">{slider.value}%</span>
            </div>
            <Slider
              value={[slider.value]}
              onValueChange={(value) => slider.onChange(value[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
