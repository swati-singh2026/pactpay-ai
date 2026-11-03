export default function Howitworks() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold">How It Works</h2>

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">1. Sign Up</h3>

            <p className="mt-3 text-gray-600">
              Create your client or freelancer account.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">2. Create Contract</h3>

            <p className="mt-3 text-gray-600">
              AI generates a professional agreement instantly.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">3. Add Milestones</h3>

            <p className="mt-3 text-gray-600">
              Divide work into secure payment milestones.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">4. Complete & Get Paid</h3>

            <p className="mt-3 text-gray-600">
              Approve milestones and receive payments securely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
