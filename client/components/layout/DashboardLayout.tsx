"use client";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  onLogout: () => void;
}

export default function DashboardLayout({
  children,
  userName,
  onLogout,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-64">
        <TopNavbar userName={userName} onLogout={onLogout} />

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
