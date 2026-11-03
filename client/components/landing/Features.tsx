export default function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold">
          Why Choose PactPay AI?
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">
              AI Contract Generator
            </h3>

            <p className="text-gray-600">
              Generate professional freelancer agreements in seconds using AI.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Milestone Payments</h3>

            <p className="text-gray-600">
              Split projects into milestones for secure and transparent
              payments.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">AI Risk Detection</h3>

            <p className="text-gray-600">
              Detect risky clauses and payment issues before signing.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Secure Dashboard</h3>

            <p className="text-gray-600">
              Track contracts, payments, milestones, and project progress in one
              place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
