"use client"

import { JSX, useContext, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import SideBar from "@/components/SideBar"
import { UserMode } from "@/context/ModeContext"

import {
  AlertTriangle,
  ShieldAlert,
  Stethoscope,
  Search,
  Video,
  Sun,
  Moon
} from "lucide-react"

/* ---------------- TYPES ---------------- */

type Severity = "CRITICAL" | "HIGH" | "MEDIUM"

interface AlertItem {
  id: string
  title: string
  location: string
  time: string
  severity: Severity
}

/* ---------------- PAGE ---------------- */

const AlertsPage = (): JSX.Element => {
  const { dark, setDark } = useContext(UserMode)
  const [filter, setFilter] = useState<"ALL" | "CRITICAL">("ALL")
  const [query, setQuery] = useState("")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  const alerts: AlertItem[] = [
    {
      id: "AL-2931",
      title: "Fire Alarm Triggered",
      location: "Block A • Floor 2 • Server Room",
      time: "2 mins ago",
      severity: "CRITICAL"
    },
    {
      id: "AL-2932",
      title: "Unauthorized Access Attempt",
      location: "Library • Main Entrance",
      time: "Just now",
      severity: "HIGH"
    },
    {
      id: "AL-2933",
      title: "Suspicious Loitering",
      location: "Parking Lot B • Row 4",
      time: "Awaiting action",
      severity: "MEDIUM"
    },
    {
      id: "AL-2934",
      title: "Medical Emergency Reported",
      location: "Cafeteria • North Wing",
      time: "New alert",
      severity: "CRITICAL"
    }
  ]

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter =
      filter === "CRITICAL" ? alert.severity === "CRITICAL" : true

    const matchesQuery =
      alert.title.toLowerCase().includes(query.toLowerCase()) ||
      alert.location.toLowerCase().includes(query.toLowerCase())

    return matchesFilter && matchesQuery
  })

  return (
    <div className="min-h-screen flex bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <SideBar />

      <main className="flex-1 p-8 max-w-8xl mx-auto">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-neutral-400" />
            <Input
              placeholder="Search alerts or locations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-80"
            />
          </div>

          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/15 text-green-500">
              SYSTEM ONLINE
            </Badge>

            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch checked={dark} onCheckedChange={setDark} />
              <Moon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Active Alerts</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Monitor, assign, and resolve campus security incidents
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="flex gap-6 border-b border-neutral-200 dark:border-neutral-800 mb-6 text-sm">
          {["ALL", "CRITICAL"].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`pb-3 transition ${
                filter === tab
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              }`}
            >
              {tab === "ALL" ? "All Alerts" : "Critical Only"}
            </button>
          ))}
        </div>

        {/* ALERT LIST */}
        <div className="space-y-3">
          {filteredAlerts.map(alert => (
            <AlertRow key={alert.id} alert={alert} />
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-10 text-sm text-neutral-500">
          <p>
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Previous</Button>
            <Button size="sm" variant="outline">Next</Button>
          </div>
        </div>

      </main>
    </div>
  )
}

export default AlertsPage

/* ---------------- ALERT ROW ---------------- */

const AlertRow = ({ alert }: { alert: AlertItem }) => {
  const severityConfig: Record<Severity, any> = {
    CRITICAL: {
      icon: <Stethoscope className="text-red-500" />,
      badge: "bg-red-500/15 text-red-500",
      border: "border-red-500"
    },
    HIGH: {
      icon: <ShieldAlert className="text-orange-400" />,
      badge: "bg-orange-400/15 text-orange-400",
      border: "border-orange-400"
    },
    MEDIUM: {
      icon: <AlertTriangle className="text-blue-400" />,
      badge: "bg-blue-400/15 text-blue-400",
      border: "border-blue-400"
    }
  }

  const cfg = severityConfig[alert.severity]

  return (
    <div className={`flex justify-between items-center border-l-4 ${cfg.border} border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-neutral-50 dark:bg-neutral-900`}>
      
      <div className="flex gap-4">
        {cfg.icon}

        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{alert.title}</h3>
            <span className="text-xs text-neutral-400">#{alert.id}</span>
          </div>

          <p className="text-sm text-neutral-500 mt-0.5">
            {alert.location}
          </p>

          <p className="text-xs text-neutral-400 mt-1">
            {alert.time}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge className={cfg.badge}>
          {alert.severity}
        </Badge>

        <Button size="sm" variant="outline">
          <Video className="w-4 h-4 mr-2" />
          Camera
        </Button>

        <Button size="sm">
          Assign
        </Button>
      </div>
    </div>
  )
}
