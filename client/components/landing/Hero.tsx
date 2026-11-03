"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          AI-Powered Freelancer Payment Platform
        </span>

        <h1 className="mt-8 text-5xl font-bold leading-tight text-gray-900">
          Smart Contracts.
          <br />
          Secure Payments.
          <br />
          Powered by AI.
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-gray-600">
          PactPay AI helps freelancers and clients create AI-generated
          contracts, manage milestones, and release secure payments with
          complete transparency.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-blue-600 px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
