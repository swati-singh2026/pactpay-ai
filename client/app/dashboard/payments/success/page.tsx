"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Transaction {
  id: string;
  paypalOrderId: string | null;
  amount: number;
  status: string;
  milestone: {
    title: string;
    status: string;
    contract: {
      title: string;
    };
  };
}

export default function PaymentSuccessPage() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const captureStarted = useRef(false);

  useEffect(() => {
    if (captureStarted.current) return;

    captureStarted.current = true;

    const verifyPayment = async () => {
      try {
        // Get PayPal Order ID from URL
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("token");

        if (!orderId) {
          throw new Error("PayPal Order ID not found.");
        }

        // Get JWT token
        const authToken = localStorage.getItem("token");

        if (!authToken) {
          throw new Error("Please login to view your payment details.");
        }

        // Step 1: Capture PayPal payment
        const captureResponse = await fetch(
          "http://localhost:5000/api/paypal/capture-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ orderId }),
          },
        );

        const captureData = await captureResponse.json();

        if (!captureResponse.ok || !captureData.success) {
          throw new Error(captureData.message || "Payment capture failed.");
        }

        // Step 2: Fetch updated transaction history
        const response = await fetch("http://localhost:5000/api/transactions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Unable to fetch transaction details.");
        }

        // Step 3: Find matching transaction
        const matchedTransaction = data.transactions.find(
          (item: Transaction) => item.paypalOrderId === orderId,
        );

        if (!matchedTransaction) {
          throw new Error("Payment transaction not found.");
        }

        // Step 4: Verify payment status
        if (matchedTransaction.status !== "PAID") {
          throw new Error("Payment is not confirmed yet.");
        }

        setTransaction(matchedTransaction);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium">
          Verifying and capturing your payment...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Payment Verification Failed
        </h1>

        <p className="text-center text-gray-600">{error}</p>

        <Link
          href="/dashboard"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>

        <Link
          href="/dashboard/payments/history"
          className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100"
        >
          View Transaction History
        </Link>
      </div>
    );
  }

  // Payment success page
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mb-5 text-6xl">✅</div>

        <h1 className="mb-3 text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>

        <p className="mb-6 text-gray-600">
          Your PayPal payment has been successfully captured and verified.
        </p>

        {transaction && (
          <div className="mb-6 space-y-4 rounded-xl bg-gray-50 p-5 text-left">
            <div>
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="text-2xl font-bold text-gray-900">
                ${transaction.amount.toFixed(2)} USD
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <p className="font-semibold text-green-600">
                {transaction.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Milestone</p>
              <p className="font-medium text-gray-900">
                {transaction.milestone.title}
              </p>

              <p className="text-sm text-green-600">
                Milestone Status: {transaction.milestone.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Contract</p>
              <p className="font-medium text-gray-900">
                {transaction.milestone.contract.title}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">PayPal Order ID</p>
              <p className="break-all text-sm font-medium text-gray-900">
                {transaction.paypalOrderId}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/dashboard/payments/history"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Transaction History
          </Link>
        </div>
      </div>
    </div>
  );
}
