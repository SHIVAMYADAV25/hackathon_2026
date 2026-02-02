"use client"

import { Bell, FileText, LayoutDashboard, Shield, Video } from "lucide-react"
import Link from "next/link"

const SideBar = () => {
  return (
    <aside className="fixed top-0 left-0 z-50 h-screen w-64 bg-neutral-50 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
      <div>
        <div className="px-6 py-6 flex items-center gap-2 font-semibold">
          <Shield className="text-blue-500" />
          <div>
            <p>College Security</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              ADMIN PANEL
            </p>
          </div>
        </div>

        <nav className="mt-6 space-y-2 px-4">
          <Link href="/dashboard"><NavItem label="Dashboard" icon={<LayoutDashboard />} /></Link>
          <Link href="/camera"><NavItem label="Camera Route" icon={<Video />} /></Link>
          <Link href="/logs"><NavItem label="Logs" icon={<FileText />} /></Link>
          <Link href="/alerts"><NavItem label="Alerts" icon={<Bell />} /></Link>
        </nav>
      </div>

      <div className="px-6 py-6 border-t border-neutral-200 dark:border-neutral-800 text-sm">
        <p className="font-medium">Admin User</p>
        <p className="text-neutral-500 dark:text-neutral-400 truncate">
          admin@college.edu
        </p>
      </div>
    </aside>
  )
}

export default SideBar

function NavItem({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5 cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  )
}
