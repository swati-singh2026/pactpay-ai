"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentContractsTable from "@/components/dashboard/RecentContractsTable";

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

    // Temporary Dashboard Data
    setStats({
      revenue: 14500,
      contracts: 18,
      payments: 12,
      activeProjects: 6,
    });
  }, []);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <DashboardLayout userName={user.name} onLogout={handleLogout}>
      {/* User Information */}

      <section className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold">Account Information</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold">{user.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}

      <section className="mx-auto mt-8 max-w-7xl">
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
            subtitle="Contracts created"
            color="text-blue-600"
          />

          <DashboardCard
            title="AI Risk Checks"
            value={stats.payments}
            subtitle="Contracts analyzed"
            color="text-purple-600"
          />

          <DashboardCard
            title="Active Deals"
            value={stats.activeProjects}
            subtitle="Running projects"
            color="text-orange-600"
          />
        </div>
      </section>
      {/* Recent Activity */}

      <section className="mx-auto mt-8 max-w-7xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Activity
              </h2>

              <p className="text-sm text-gray-500">
                Latest AI verification, escrow and milestone events.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-semibold">🤝 Smart Contract Created</p>
                <p className="text-sm text-gray-500">
                  TechNova Solutions ↔ Aarav Sharma
                </p>
              </div>

              <span className="text-xs font-medium text-green-600">
                Just Now
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-semibold">🤖 AI Risk Analysis Completed</p>

                <p className="text-sm text-gray-500">
                  Contract verified with Low Risk score.
                </p>
              </div>

              <span className="text-xs font-medium text-blue-600">
                10 mins ago
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-semibold">🔒 PayPal Escrow Locked</p>

                <p className="text-sm text-gray-500">
                  Milestone payment securely reserved.
                </p>
              </div>

              <span className="text-xs font-medium text-orange-600">
                30 mins ago
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-semibold">✅ Milestone Approved</p>

                <p className="text-sm text-gray-500">
                  Client approved Phase 1 delivery.
                </p>
              </div>

              <span className="text-xs font-medium text-purple-600">
                1 hour ago
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Smart Contracts */}

      <section className="mx-auto mt-8 mb-10 max-w-7xl">
        <RecentContractsTable />
      </section>
    </DashboardLayout>
  );
}
