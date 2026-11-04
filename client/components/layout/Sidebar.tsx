"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Bot,
  Flag,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Contracts",
    href: "/dashboard/contracts/create",
    icon: FileText,
  },
  {
    title: "AI Contract",
    href: "#",
    icon: Bot,
  },
  {
    title: "Milestones",
    href: "#",
    icon: Flag,
  },
  {
    title: "PayPal Payments",
    href: "#",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "#",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "#",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">PactPay AI</h1>

        <p className="text-sm text-gray-500">Smart Payments Platform</p>
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
              ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
