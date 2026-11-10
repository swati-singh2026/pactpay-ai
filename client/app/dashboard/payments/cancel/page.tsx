import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
        {/* Cancel Icon */}
        <div className="mb-5 text-6xl">❌</div>

        {/* Heading */}
        <h1 className="mb-3 text-3xl font-bold text-red-600">
          Payment Cancelled
        </h1>

        <p className="mb-6 text-gray-600">
          Your PayPal checkout was cancelled or not completed. No successful
          payment has been confirmed.
        </p>

        {/* Information Box */}
        <div className="mb-6 rounded-xl bg-gray-50 p-5 text-left">
          <h2 className="mb-2 font-semibold text-gray-900">
            What happens next?
          </h2>

          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Your payment has not been confirmed.</li>
            <li>
              • Your milestone will remain pending unless completed separately.
            </li>
            <li>• You can return to your dashboard.</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/dashboard/contracts"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
          >
            View Contracts
          </Link>
        </div>
      </div>
    </div>
  );
}
