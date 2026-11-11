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
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-0 min-h-screen min-w-0 w-full md:ml-64 md:w-auto">
        {/* Top Navigation */}
        <TopNavbar userName={userName} onLogout={onLogout} />

        {/* Page Content */}
        <main className="w-full min-w-0 p-3 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
