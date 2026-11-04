"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentContractsTable from "@/components/dashboard/RecentContractsTable";
import { Wallet, FileText, ShieldCheck, BriefcaseBusiness } from "lucide-react";

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
            icon={Wallet}
            color="text-green-600"
            bgColor="bg-green-100"
          />

          <DashboardCard
            title="Smart Contracts"
            value={stats.contracts}
            subtitle="Contracts created between users"
            icon={FileText}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />

          <DashboardCard
            title="AI Risk Checks"
            value={stats.payments}
            subtitle="Contracts analyzed by AI"
            icon={ShieldCheck}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />

          <DashboardCard
            title="Active Deals"
            value={stats.activeProjects}
            subtitle="Projects currently in progress"
            icon={BriefcaseBusiness}
            color="text-orange-600"
            bgColor="bg-orange-100"
          />
        </div>
      </section>
      {/* Recent Activity */}

      <section className="mx-auto mt-10 max-w-7xl px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Activity
              </h2>

              <p className="text-sm text-gray-500">
                Latest actions across contracts, AI verification and escrow
                payments.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white">
                🤝
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Smart Contract Created
                </h3>

                <p className="text-sm text-gray-600">
                  Client and Freelancer finalized a new AI-generated contract.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-purple-100 bg-purple-50 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-600 text-white">
                🤖
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  AI Risk Analysis Completed
                </h3>

                <p className="text-sm text-gray-600">
                  Contract successfully verified with Low Risk confidence.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-green-100 bg-green-50 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
                💰
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Escrow Payment Locked
                </h3>

                <p className="text-sm text-gray-600">
                  Funds securely locked through PayPal milestone escrow.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-yellow-100 bg-yellow-50 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-500 text-white">
                ✅
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Milestone Approved
                </h3>

                <p className="text-sm text-gray-600">
                  Client approved the completed milestone for release.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white">
                🚀
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Payment Ready</h3>

                <p className="text-sm text-gray-600">
                  Escrow is ready for secure PayPal payout.
                </p>
              </div>
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
