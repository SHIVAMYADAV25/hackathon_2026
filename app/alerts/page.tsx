"use client"
import { JSX, useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  AlertTriangle,
  Flame,
  ShieldAlert,
  Stethoscope,
  Search,
  Video
} from "lucide-react"
import SideBar from "@/components/SideBar"
import { UserMode } from "@/context/ModeContext"

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

const Alerts: React.FC = () => {
  const {dark, setDark} = useContext(UserMode);
  const [filter, setFilter] = useState<"ALL" | "CRITICAL">("ALL")

  const alerts: AlertItem[] = [
    {
      id: "AL-2931",
      title: "Fire Alarm Triggered",
      location: "Block A, Floor 2, Server Room",
      time: "10:45 AM (2 mins ago)",
      severity: "CRITICAL"
    },
    {
      id: "AL-2932",
      title: "Unauthorized Access Attempt",
      location: "Library Main Entrance, Gate 2",
      time: "10:52 AM (Just now)",
      severity: "HIGH"
    },
    {
      id: "AL-2933",
      title: "Suspicious Loitering",
      location: "Parking Lot B, Row 4",
      time: "11:00 AM (Awaiting Action)",
      severity: "MEDIUM"
    },
    {
      id: "AL-2934",
      title: "Medical Emergency - Fall Reported",
      location: "Student Cafeteria, North Wing",
      time: "11:05 AM (New Alert)",
      severity: "CRITICAL"
    }
  ]

  const filteredAlerts =
    filter === "CRITICAL"
      ? alerts.filter(a => a.severity === "CRITICAL")
      : alerts

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex">

      {/* SIDEBAR */}
      <SideBar />

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <Input
            placeholder="Search alerts, locations or peons..."
            className="max-w-md bg-neutral-900 border-neutral-800"
            // icon={<Search />}
          />
          <Badge className="bg-green-500/20 text-green-400">
            SYSTEM ONLINE
          </Badge>
        </div>

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Pending Alerts</h1>
          <p className="text-sm text-neutral-400">
            Real-time monitoring and staff assignment console
          </p>
        </div>

        {/* FILTER TABS */}
        <div className="flex items-center gap-6 border-b border-neutral-800 mb-6 text-sm">
          <button
            onClick={() => setFilter("ALL")}
            className={`pb-3 ${
              filter === "ALL"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-neutral-400"
            }`}
          >
            All Alerts
          </button>

          <button
            onClick={() => setFilter("CRITICAL")}
            className={`pb-3 ${
              filter === "CRITICAL"
                ? "text-red-400 border-b-2 border-red-400"
                : "text-neutral-400"
            }`}
          >
            Critical Only
          </button>

          <span className="text-neutral-500">Active Assignments</span>
          <span className="text-neutral-500">Resolved</span>
        </div>

        {/* ALERT LIST */}
        <div className="space-y-4">
          {filteredAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-8 text-sm text-neutral-400">
          <p>Showing {filteredAlerts.length} of {alerts.length} pending alerts</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Previous</Button>
            <Button size="sm" variant="outline">Next</Button>
          </div>
        </div>

      </main>
    </div>
  )
}

export default Alerts

/* ---------------- COMPONENTS ---------------- */

interface AlertCardProps {
  alert: AlertItem
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const severityStyles: Record<Severity, string> = {
    CRITICAL: "border-l-4 border-red-500 bg-red-500/5",
    HIGH: "border-l-4 border-orange-400 bg-orange-400/5",
    MEDIUM: "border-l-4 border-blue-400 bg-blue-400/5"
  }

  const severityIcon: Record<Severity, JSX.Element> = {
    CRITICAL: <Stethoscope className="text-red-400" />,
    HIGH: <ShieldAlert className="text-orange-400" />,
    MEDIUM: <AlertTriangle className="text-blue-400" />
  }

  return (
    <div
      className={`flex justify-between items-center p-5 rounded-xl border border-neutral-800 ${severityStyles[alert.severity]}`}
    >
      <div className="flex items-start gap-4">
        {severityIcon[alert.severity]}

        <div>
          <h3 className="font-medium flex items-center gap-2">
            {alert.title}
            <span className="text-xs text-neutral-500">
              #{alert.id}
            </span>
          </h3>

          <p className="text-sm text-neutral-400">
            {alert.location}
          </p>

          <p className="text-xs text-neutral-500 mt-1">
            {alert.time}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button size="sm" variant="outline">
          <Video className="w-4 h-4 mr-2" />
          View Camera
        </Button>

        <Button size="sm">
          Assign to Peon
        </Button>
      </div>
    </div>
  )
}
