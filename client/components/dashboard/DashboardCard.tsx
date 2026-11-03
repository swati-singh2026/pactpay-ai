type DashboardCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  color?: string;
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  color = "text-blue-600",
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </h3>

      <h2 className={`mt-4 text-3xl font-bold ${color}`}>{value}</h2>

      <p className="mt-3 text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
