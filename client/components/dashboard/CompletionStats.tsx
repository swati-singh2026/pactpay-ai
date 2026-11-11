"use client";

interface CompletionStatsProps {
  total: number;
  completed: number;
  active: number;
}

export default function CompletionStats({
  total,
  completed,
  active,
}: CompletionStatsProps) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">
        Project Completion Statistics
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Overview of your contract completion progress
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-blue-600">Total Contracts</p>
          <h3 className="mt-2 text-3xl font-bold text-blue-700">{total}</h3>
        </div>

        <div className="rounded-xl bg-green-50 p-4">
          <p className="text-sm text-green-600">Completed</p>
          <h3 className="mt-2 text-3xl font-bold text-green-700">
            {completed}
          </h3>
        </div>

        <div className="rounded-xl bg-orange-50 p-4">
          <p className="text-sm text-orange-600">Active Projects</p>
          <h3 className="mt-2 text-3xl font-bold text-orange-700">{active}</h3>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-semibold text-gray-700">Completion Rate</span>

          <span className="font-bold text-green-600">{completionRate}%</span>
        </div>

        <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
