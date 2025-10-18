"use client"

import { useState } from "react"
import { LayoutDashboard, Settings, Circle, ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isMinimized, setIsMinimized] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "settings", label: "Setting", icon: Settings },
  ]

  return (
    <aside
      className={`bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${
        isMinimized ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
        {!isMinimized && <h1 className="text-2xl font-bold text-sidebar-foreground">Bit-Ty 🤖</h1>}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-1 hover:bg-sidebar-accent rounded-lg transition-colors"
          title={isMinimized ? "Expand" : "Minimize"}
        >
          {isMinimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
              title={isMinimized ? item.label : undefined}
            >
              <Icon size={20} />
              {!isMinimized && <span className="font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Connection Status */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-sidebar-foreground">
          <Circle size={12} className="fill-green-500 text-green-500" />
          {!isMinimized && <span className="text-sm">Connected (Serial @ COM3)</span>}
        </div>
      </div>
    </aside>
  )
}
