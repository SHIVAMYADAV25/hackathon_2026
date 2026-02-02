"use client";

import React, { useEffect, useContext } from "react";
import { useAuth } from "@clerk/nextjs";
import LogoutButton from "@/components/LogoutButton";
import { UserMode } from "@/context/ModeContext";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  AlertTriangle,
  Camera,
  Clock,
  Bell,
  Shield,
  Sun,
  Moon,
  Users,
  Activity,
  CheckCircle2,
  Lock,
  Wifi,
  WifiOff,
  ArrowRight,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function AdminDashboard() {
  const { isLoaded } = useAuth();
  const { dark, setDark } = useContext(UserMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500">
      <main className="max-w-9xl mx-auto p-8 text-neutral-900 dark:text-neutral-100 animate-in fade-in duration-700">

        {/* ================= TOP BAR ================= */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Security Control Center
            </h1>

            <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                System Online
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                12:48 PM
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="">
              <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch checked={dark} onCheckedChange={setDark} />
              <Moon className="w-4 h-4" />
            </div>
            </div>

            {/* Notification */}
            <div className="relative group cursor-pointer">
              <Bell className="w-5 h-5 text-neutral-500 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>

            <LogoutButton />
          </div>
        </header>

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<AlertTriangle />}
            label="Unresolved Alerts"
            value="4"
            accent="red"
          />
          <StatCard
            icon={<Camera />}
            label="Active Cameras"
            value="32"
            accent="blue"
          />
          <StatCard
            icon={<Users />}
            label="On-Duty Staff"
            value="6"
            accent="green"
          />
          <StatCard
            icon={<Activity />}
            label="Avg Response"
            value="11m"
            accent="amber"
          />
        </section>

        {/* ================= GRID ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AlertLifecycle />
          <CameraRiskOverview />
        </section>

        {/* ================= ACTIVE ALERTS ================= */}
        <section className="mt-12">
          <h2 className="text-sm font-semibold text-neutral-500 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            Active Alerts
          </h2>
          <ActiveAlerts />
        </section>

        {/* ================= ACTIONS ================= */}
        <section className="mt-12 flex gap-4">
          <Button className="group">
            View Cameras
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button variant="outline">View Logs</Button>

          <Button variant="destructive" className="group">
            <Lock className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Lockdown
          </Button>
        </section>

        <ActivityLogs />
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ icon, label, value, accent }: any) {
  const accents: any = {
    red: "text-red-500 bg-red-500/10",
    blue: "text-blue-500 bg-blue-500/10",
    green: "text-emerald-500 bg-emerald-500/10",
    amber: "text-amber-500 bg-amber-500/10",
  };

  return (
    <div className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${accents[accent]}`}>
          {React.cloneElement(icon, { size: 16 })}
        </div>
        <span className="text-xs uppercase text-neutral-500">{label}</span>
      </div>
      <p className="text-3xl font-semibold tracking-tight group-hover:tracking-widest transition-all">
        {value}
      </p>
    </div>
  );
}

function AlertLifecycle() {
  const steps = [
    { name: "Created", count: 2, icon: <AlertTriangle /> },
    { name: "Assigned", count: 1, icon: <Users /> },
    { name: "In Progress", count: 1, icon: <Activity /> },
    { name: "Resolved", count: 14, icon: <CheckCircle2 /> },
  ];

  return (
    <div className="animate-in slide-in-from-left duration-700">
      <h3 className="text-sm font-semibold text-neutral-500 mb-4">
        Alert Lifecycle
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {steps.map((s) => (
          <div
            key={s.name}
            className="group p-4 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-neutral-500">
                {React.cloneElement(s.icon, { size: 14 })}
                <span className="text-xs">{s.name}</span>
              </div>
              <span className="text-2xl font-semibold">{s.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CameraRiskOverview() {
  const items = [
    { label: "Critical", count: 2, icon: <Shield />, accent: "red" },
    { label: "Monitoring", count: 5, icon: <Activity />, accent: "amber" },
    { label: "Stable", count: 24, icon: <Wifi />, accent: "green" },
    { label: "Offline", count: 1, icon: <WifiOff />, accent: "neutral" },
  ];

  return (
    <div className="animate-in slide-in-from-right duration-700">
      <h3 className="text-sm font-semibold text-neutral-500 mb-4">
        Camera Health
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map((i) => (
          <div
            key={i.label}
            className="group p-4 border rounded-lg flex items-center gap-3 hover:border-blue-500/50 transition"
          >
            {React.cloneElement(i.icon, { size: 16 })}
            <div>
              <p className="text-xs text-neutral-500">{i.label}</p>
              <p className="text-xl font-semibold">{i.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActiveAlerts() {
  const alerts = [
    { issue: "Motion detected", source: "Main Gate", time: "12 min" },
    { issue: "Temperature spike", source: "Server Room", time: "8 min" },
  ];

  return (
    <div className="space-y-3">
      {alerts.map((a, i) => (
        <div
          key={i}
          className="group flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition"
        >
          <div>
            <p className="font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
              {a.issue}
            </p>
            <p className="text-xs text-neutral-500">
              {a.source} • {a.time} ago
            </p>
          </div>
          <Button size="sm" className="group-hover:scale-105 transition">
            Assign
          </Button>
        </div>
      ))}
    </div>
  );
}

function ActivityLogs() {
  const logs = [
    "Alert created at Main Gate",
    "Assigned to Staff A",
    "Alert resolved at Server Room",
  ];

  return (
    <section className="mt-14 animate-in fade-in duration-700">
      <h3 className="text-sm font-semibold text-neutral-500 mb-4">
        System Logs
      </h3>
      <div className="border rounded-lg p-4 space-y-2 text-xs text-neutral-500 font-mono">
        {logs.map((l, i) => (
          <div key={i} className="flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            {l}
          </div>
        ))}
      </div>
    </section>
  );
}
