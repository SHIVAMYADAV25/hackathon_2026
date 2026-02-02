"use client"
import { type ReactNode, useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Download,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Sun,
  Moon
} from "lucide-react"
import SideBar from "@/components/SideBar"
import { UserMode } from "@/context/ModeContext"

/* ---------------- TYPES ---------------- */

type LogStatus = "Pending" | "In Progress" | "Resolved"

type AlertType =
  | "Motion Detected"
  | "Unauthorized Entry"
  | "Door Ajar"
  | "Loitering"
  | "Door Secured"

interface SecurityLog {
  time: string
  camera: string
  type: AlertType
  status: LogStatus
  peon: string
}

interface StatusBadgeProps {
  status: LogStatus
}

interface AlertBadgeProps {
  type: AlertType
}

interface StatCardProps {
  label: string
  value: string
  icon?: ReactNode
}

/* ---------------- PAGE ---------------- */

const SecurityLogs: React.FC = () => {
  const {dark, setDark} = useContext(UserMode);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [dark])

  const logs: SecurityLog[] = [
    { time: "14:20:05", camera: "Hallway B", type: "Motion Detected", status: "Pending", peon: "Rahul S." },
    { time: "14:15:12", camera: "Main Gate", type: "Unauthorized Entry", status: "In Progress", peon: "Priya K." },
    { time: "13:50:44", camera: "Library Entrance", type: "Door Ajar", status: "Resolved", peon: "Rahul S." },
    { time: "13:45:10", camera: "Parking Lot A", type: "Loitering", status: "Pending", peon: "Amit V." },
    { time: "13:10:22", camera: "Admin Block", type: "Door Secured", status: "Resolved", peon: "Suresh M." },
        { time: "14:20:05", camera: "Hallway B", type: "Motion Detected", status: "Pending", peon: "Rahul S." },
    { time: "14:15:12", camera: "Main Gate", type: "Unauthorized Entry", status: "In Progress", peon: "Priya K." },
    { time: "13:50:44", camera: "Library Entrance", type: "Door Ajar", status: "Resolved", peon: "Rahul S." },
    { time: "13:45:10", camera: "Parking Lot A", type: "Loitering", status: "Pending", peon: "Amit V." },
    { time: "13:10:22", camera: "Admin Block", type: "Door Secured", status: "Resolved", peon: "Suresh M." },
        { time: "14:20:05", camera: "Hallway B", type: "Motion Detected", status: "Pending", peon: "Rahul S." },
    { time: "14:15:12", camera: "Main Gate", type: "Unauthorized Entry", status: "In Progress", peon: "Priya K." },
    { time: "13:50:44", camera: "Library Entrance", type: "Door Ajar", status: "Resolved", peon: "Rahul S." },
    { time: "13:45:10", camera: "Parking Lot A", type: "Loitering", status: "Pending", peon: "Amit V." },
    { time: "13:10:22", camera: "Admin Block", type: "Door Secured", status: "Resolved", peon: "Suresh M." }
  ]

  return (
    <div className=" min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 flex transition-colors">


      {/* MAIN */}
      <main className="flex-1 p-8 max-w-9xl mx-auto ">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Security Logs</h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Real-time monitoring and alert management feed
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* THEME TOGGLE */}
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch checked={dark} onCheckedChange={setDark} />
              <Moon className="w-4 h-4" />
            </div>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>

            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
            <Input
              placeholder="Search logs by camera, personnel or event ID..."
              className="pl-9 bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
            />
          </div>

          <Button variant="outline">Alert Type</Button>
          <Button variant="outline">Time Range</Button>
          <button className="text-sm text-blue-500">Clear Filters</button>
        </div>

        {/* TABLE */}
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-y-auto max-h-[490px] scrollbar">
          <table className="w-full text-sm">
            <thead className="text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Camera</th>
                <th className="px-4 py-3 text-left">Alert Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Assigned Peon</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, idx) => (
                <tr
                  key={idx}
                  className="border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40"
                >
                  <td className="px-4 py-3">{log.time}</td>
                  <td className="px-4 py-3 text-green-500">● {log.camera}</td>
                  <td className="px-4 py-3">
                    <AlertBadge type={log.type} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={log.status} />
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>{log.peon[0]}</AvatarFallback>
                    </Avatar>
                    {log.peon}
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <StatCard label="Active Cameras" value="42 / 45" />
          <StatCard label="Open Alerts" value="08" icon={<AlertTriangle />} />
          <StatCard label="Peons on Duty" value="12" />
        </div>
      </main>
    </div>
  )
}

export default SecurityLogs

/* ---------------- HELPERS ---------------- */

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  if (status === "Resolved")
    return (
      <Badge className="bg-green-500/20 text-green-500">
        <CheckCircle className="w-3 h-3 mr-1" />
        Resolved
      </Badge>
    )

  if (status === "In Progress")
    return (
      <Badge className="bg-blue-500/20 text-blue-500">
        <Clock className="w-3 h-3 mr-1" />
        In Progress
      </Badge>
    )

  return (
    <Badge className="bg-yellow-500/20 text-yellow-500">
      Pending
    </Badge>
  )
}

const AlertBadge: React.FC<AlertBadgeProps> = ({ type }) => {
  const color =
    type === "Unauthorized Entry"
      ? "bg-red-500/20 text-red-500"
      : type === "Motion Detected"
      ? "bg-orange-500/20 text-orange-500"
      : "bg-neutral-300 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"

  return <Badge className={color}>{type}</Badge>
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
        {label}
      </p>
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>
    </div>
  )
}
