"use client";

interface TopNavbarProps {
  userName: string;
  onLogout: () => void;
}

export default function TopNavbar({ userName, onLogout }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

        <p className="text-sm text-gray-500">Welcome back, {userName} 👋</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          🔒 AI Verified • PayPal Secured
        </div>

        <button
          onClick={onLogout}
          className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
