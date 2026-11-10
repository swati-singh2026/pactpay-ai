"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Transaction {
  id: string;
  paypalOrderId: string | null;
  amount: number;
  status: string;
  createdAt: string;
  milestone: {
    title: string;
    status: string;
    contract: {
      title: string;
    };
  };
}

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view transaction history.");
          return;
        }

        const response = await fetch("http://localhost:5000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Failed to load transactions.");
        }

        setTransactions(data.transactions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Transaction History
            </h1>
            <p className="mt-2 text-gray-600">
              View all your PactPay payment transactions.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
        )}

        {!error && transactions.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="text-xl font-semibold text-gray-800">
              No Transactions Found
            </p>
            <p className="mt-2 text-gray-500">
              Your payment transactions will appear here.
            </p>
          </div>
        )}

        {transactions.length > 0 && (
          <div className="overflow-x-auto rounded-xl bg-white shadow">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Contract</th>
                  <th className="p-4">Milestone</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Payment Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Order ID</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t">
                    <td className="p-4 font-medium">
                      {transaction.milestone.contract.title}
                    </td>

                    <td className="p-4">{transaction.milestone.title}</td>

                    <td className="p-4 font-semibold">
                      ${transaction.amount.toFixed(2)}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          transaction.status === "PAID"
                            ? "bg-green-100 text-green-700"
                            : transaction.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>

                    <td className="p-4 text-sm">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>

                    <td className="max-w-40 break-all p-4 text-xs text-gray-500">
                      {transaction.paypalOrderId || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
