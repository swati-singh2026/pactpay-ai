"use client";

import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
  userName: string;
  onLogout: () => void;
}

export default function DashboardLayout({
  children,
  userName,
  onLogout,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Top Navigation */}
        <TopNavbar userName={userName} onLogout={onLogout} />

        {/* Page Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
