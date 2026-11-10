"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PaymentChartProps {
  paid: number;
  pending: number;
  failed: number;
}

const COLORS = ["#16a34a", "#f59e0b", "#dc2626"];

export default function PaymentChart({
  paid,
  pending,
  failed,
}: PaymentChartProps) {
  const data = [
    { name: "Paid", value: paid },
    { name: "Pending", value: pending },
    { name: "Failed", value: failed },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-bold text-gray-900">Payment Overview</h2>

      <p className="mb-4 text-sm text-gray-500">
        Distribution of payment statuses
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
