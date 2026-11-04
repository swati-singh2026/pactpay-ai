import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "text-blue-600",
  bgColor = "bg-blue-100",
}: DashboardCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgColor}`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>

        <ArrowUpRight className="h-5 w-5 text-gray-300 transition group-hover:text-blue-600" />
      </div>

      <h2 className={`mt-6 text-3xl font-bold ${color}`}>{value}</h2>

      <h3 className="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-500">{subtitle}</p>
    </div>
  );
}
