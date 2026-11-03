"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";

interface User {
  name: string;
  email: string;
  role: string;
}

interface Stats {
  revenue: number;
  contracts: number;
  payments: number;
  activeProjects: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  const [stats, setStats] = useState<Stats>({
    revenue: 0,
    contracts: 0,
    payments: 0,
    activeProjects: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Temporary dummy data
    // Later this will come from backend API
    setStats({
      revenue: 0,
      contracts: 0,
      payments: 0,
      activeProjects: 0,
    });
  }, []);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Navbar */}

      <div className="flex items-center justify-between bg-white px-8 py-5 shadow">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">
            PactPay AI Dashboard
          </h1>

          <p className="text-gray-500">Welcome back, {user.name}</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* User Info */}

      <section className="mx-auto mt-8 max-w-7xl px-8">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-3 text-xl font-semibold">Account Information</h2>

          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </section>

      {/* Dashboard Cards */}

      <section className="mx-auto mt-10 max-w-7xl px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Escrow Balance"
            value={`$${stats.revenue}`}
            subtitle="Funds secured in PayPal Escrow"
            color="text-green-600"
          />

          <DashboardCard
            title="Smart Contracts"
            value={stats.contracts}
            subtitle="Contracts created between users"
            color="text-blue-600"
          />

          <DashboardCard
            title="AI Risk Checks"
            value={stats.payments}
            subtitle="Contracts analyzed by AI"
            color="text-purple-600"
          />

          <DashboardCard
            title="Active Deals"
            value={stats.activeProjects}
            subtitle="Projects currently in progress"
            color="text-orange-600"
          />
        </div>
      </section>

      {/* Recent Activity */}

      <section className="mx-auto mt-10 max-w-7xl px-8 pb-10">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-2xl font-semibold">PactPay AI Activity</h2>

          <ul className="space-y-4">
            <li className="border-b pb-3">
              🤝 Smart contract created between Client and Freelancer
            </li>

            <li className="border-b pb-3">
              🤖 AI verified contract terms and detected low risk
            </li>

            <li className="border-b pb-3">
              💰 PayPal escrow payment securely locked
            </li>

            <li className="border-b pb-3">✅ Milestone approved by client</li>

            <li>🚀 Escrow ready for PayPal payout</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
