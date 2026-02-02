"use client"
import SideBar from "@/components/SideBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300">
      <SideBar />
      {/* Note: ml-16 if your sidebar is narrow (icon-only) 
         or ml-64 if it's the full-width version. 
      */}
      <main className="ml-16 md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}