"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ContractChartProps {
  draft: number;
  active: number;
  completed: number;
  cancelled: number;
}

const COLORS = ["#f59e0b", "#3b82f6", "#16a34a", "#dc2626"];

export default function ContractChart({
  draft,
  active,
  completed,
  cancelled,
}: ContractChartProps) {
  const data = [
    { name: "Draft", value: draft },
    { name: "Active", value: active },
    { name: "Completed", value: completed },
    { name: "Cancelled", value: cancelled },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-bold text-gray-900">
        Contract Overview
      </h2>

      <p className="mb-4 text-sm text-gray-500">
        Distribution of contract statuses
      </p>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={95}
              label
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
