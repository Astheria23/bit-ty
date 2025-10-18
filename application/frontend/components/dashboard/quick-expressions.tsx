"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile, Frown, Moon, Angry, HelpCircle, Heart } from "lucide-react"

export default function QuickExpressions() {
  const expressions = [
    { icon: Smile, label: "Senyum" },
    { icon: Frown, label: "Sedih" },
    { icon: Moon, label: "Tidur" },
    { icon: Angry, label: "Marah" },
    { icon: HelpCircle, label: "Bingung" },
    { icon: Heart, label: "Suka" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ekspresi Cepat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {expressions.map((expr, index) => {
            const Icon = expr.icon
            return (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex flex-col items-center gap-2 h-auto py-3 bg-transparent"
                title={expr.label}
              >
                <Icon size={20} />
                <span className="text-xs">{expr.label}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
