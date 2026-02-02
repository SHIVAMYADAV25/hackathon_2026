"use client"
import { useState, useEffect, type ReactNode, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  LayoutGridIcon,
  Sun,
  Moon,
  Search,
  Bell,
  AlertTriangle,
  Video,
  FileTextIcon,
  MapIcon,
  Settings2Icon
} from "lucide-react"
import SideBar from "@/components/SideBar"
import { UserMode } from "@/context/ModeContext"

/* ---------------- TYPES ---------------- */

type CameraStatus = "normal" | "intrusion"

interface Camera {
  id: string
  name: string
  status: CameraStatus
}

interface NavItemProps {
  icon: ReactNode
  label: string
  active?: boolean
}

interface CameraCardProps {
  cam: Camera
}

/* ---------------- PAGE ---------------- */

const CameraRoute: React.FC = () => {
  const {dark, setDark} = useContext(UserMode);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [dark])

  const cameras: Camera[] = [
    { id: "CAM-01", name: "Library Entrance", status: "normal" },
    { id: "CAM-02", name: "Computer Lab 101", status: "intrusion" },
    { id: "CAM-03", name: "Main Entrance Gate", status: "normal" },
    { id: "CAM-04", name: "Staff Common Room", status: "normal" },
    { id: "CAM-05", name: "Main Auditorium", status: "normal" },
    { id: "CAM-06", name: "Sports Complex", status: "normal" },
    { id: "CAM-07", name: "Student Cafeteria", status: "normal" },
    { id: "CAM-08", name: "Parking Area B", status: "normal" },
    { id: "CAM-09", name: "Science Lab 304", status: "normal" },
    { id: "CAM-10", name: "Administration Hall", status: "normal" },
    { id: "CAM-11", name: "Data Center", status: "normal" },
    { id: "CAM-12", name: "Visitor Lobby", status: "normal" }
  ]

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 flex transition-colors">

      {/* SIDEBAR */}
      <SideBar/>

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Camera Route Grid</h1>
            <Badge className="bg-green-500/20 text-green-600 dark:text-green-400">
              LIVE SYSTEM
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
              <input
                placeholder="Search rooms or sectors..."
                className="pl-9 pr-3 py-2 text-sm rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 outline-none"
              />
            </div>

            <Bell className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />

            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch checked={dark} onCheckedChange={setDark} />
              <Moon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cameras.map((cam) => (
            <CameraCard key={cam.id} cam={cam} />
          ))}
        </div>

        {/* FOOTER */}
        <footer className="mt-20 text-xs text-neutral-500 dark:text-neutral-400 flex justify-between">
          <p>11 Online • 1 Warning • 0 Offline</p>
          <p>Storage: 84% Full • Last backup: 12m ago</p>
        </footer>
      </main>
    </div>
  )
}

export default CameraRoute

/* ---------------- COMPONENTS ---------------- */

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer 
      ${
        active
          ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  )
}

const CameraCard: React.FC<CameraCardProps> = ({ cam }) => {
  const isAlert: boolean = cam.status === "intrusion"

  return (
    <div
      className={`rounded-xl overflow-hidden border 
      ${
        isAlert
          ? "border-red-500"
          : "border-neutral-200 dark:border-neutral-800"
      } bg-neutral-50 dark:bg-neutral-900`}
    >
      <div className="h-36 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
        <Video className="text-neutral-500" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bg-neutral-200 dark:bg-neutral-800 px-2 py-1 rounded">
            {cam.id}
          </span>

          {isAlert && (
            <Badge className="bg-red-500 text-white flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> ALERT
            </Badge>
          )}
        </div>

        <p className="font-medium mb-3">{cam.name}</p>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
          >
            Normal
          </Button>

          <Button
            size="sm"
            variant="outline"
            className={`flex-1 ${
              isAlert
                ? "bg-red-600 text-white border-red-600"
                : "text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            }`}
          >
            Intrusion
          </Button>
        </div>
      </div>
    </div>
  )
}
