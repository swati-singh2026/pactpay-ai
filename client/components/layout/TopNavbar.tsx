"use client";

import { Bell, ShieldCheck, CircleUserRound, LogOut } from "lucide-react";

interface TopNavbarProps {
  userName: string;
  onLogout: () => void;
}

export default function TopNavbar({ userName, onLogout }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-40 flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 py-3 shadow-sm sm:px-6 lg:px-8">
      {/* Left */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back,{" "}
          <span className="font-semibold text-gray-700">{userName}</span>
          👋
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
        {/* Trust Badge */}
        <div className="hidden items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 md:flex">
          <ShieldCheck size={18} className="text-green-600" />

          <span className="text-sm font-semibold text-green-700">
            AI Verified • Escrow Protected
          </span>
        </div>

        {/* Notification */}
        <button className="rounded-full border border-gray-200 p-2 transition hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2">
          <CircleUserRound size={24} className="text-blue-600" />

          <span className="hidden max-w-24 truncate font-medium text-gray-700 sm:inline sm:max-w-32">
            {userName}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 sm:px-4 sm:text-base"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
