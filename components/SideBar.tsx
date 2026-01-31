// "use client"
import { Bell, FileText, LayoutDashboard, Shield, Video } from 'lucide-react'
import Link from 'next/link'
// import { useSearchParams } from 'next/navigation'
import React from 'react'

const SideBar = () => {
    // const searchParams = useSearchParams();
  return (
    <aside className="w-64 bg-neutral-50 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
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
            <Link href={"/dashboard"}><NavItem icon={<LayoutDashboard />} label="Dashboard" /></Link>
            <Link href={"/camera"}><NavItem icon={<Video />} label="Camera Route" /></Link>
            <Link href={"/logs"}><NavItem icon={<FileText />} label="Logs" /></Link>
            <Link href={"/alerts"}><NavItem icon={<Bell />} label="Alerts" /></Link>
          </nav>
        </div>

        <div className="px-6 py-6 border-t border-neutral-200 dark:border-neutral-800 text-sm">
          <p className="font-medium">Admin User</p>
          <p className="text-neutral-500 dark:text-neutral-400 truncate">
            {/* <User/> */}
          </p>
        </div>
      </aside>
  )
}

export default SideBar

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

function NavItem({ icon, label, active }: NavItemProps) {
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
  );
}
