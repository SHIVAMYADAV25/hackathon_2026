"use client";

import { useState, useEffect, JSX } from "react";
import { useAuth } from "@clerk/nextjs";
import LogoutButton from "@/components/LogoutButton";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import {
  Shield,
  LayoutDashboard,
  Video,
  FileText,
  Bell,
  AlertTriangle,
  Clock,
  Camera,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import SideBar from "@/components/SideBar";

/* ================= PAGE ================= */

export default function AdminDashboard(): JSX.Element {
  const { isLoaded, userId } = useAuth();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  //@ts-ignore
  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 flex transition-colors">

      {/* ================= SIDEBAR ================= */}
      <SideBar/>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-10">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold">Admin Dashboard Overview</h1>

          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-600 dark:text-green-400">
              Online
            </Badge>

            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch checked={dark} onCheckedChange={setDark} />
              <Moon className="w-4 h-4" />
            </div>

            <Bell className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />

            <LogoutButton />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Unresolved Alerts"
            value="7"
            status="URGENT"
            icon={<AlertTriangle className="text-red-500" />}
            sub="+2% increase"
            color="red"
          />

          <StatCard
            title="Total Logs Today"
            value="23"
            status="+15%"
            icon={<Clock className="text-blue-500" />}
            sub="activity"
            color="blue"
          />

          <StatCard
            title="Active Cameras"
            value="12"
            status="STABLE"
            icon={<Camera className="text-green-500" />}
            sub="100% online"
            color="green"
          />
        </div>

        {/* QUICK ACTIONS */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <Button>Camera Route</Button>
            <Button variant="outline">View Logs</Button>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-20 text-xs text-neutral-500 dark:text-neutral-400 flex justify-between">
          <p>© 2026 WatchmyCampus</p>
          <p>v2.4.0-STABLE</p>
        </footer>
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */



type StatCardProps = {
  title: string;
  value: string;
  status: string;
  icon: React.ReactNode;
  sub: string;
  color: "red" | "green" | "blue";
};

function StatCard({
  title,
  value,
  status,
  icon,
  sub,
  color,
}: StatCardProps) {
  const badgeColor =
    color === "red"
      ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
      : color === "green"
      ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
      : "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400";

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        {icon}
        <Badge className={badgeColor}>{status}</Badge>
      </div>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
        {sub}
      </p>
    </div>
  );
}
