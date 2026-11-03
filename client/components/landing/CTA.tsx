"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-blue-600 py-20 text-white">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-bold">Ready to Work Smarter?</h2>

        <p className="mt-6 text-lg text-blue-100">
          Join PactPay AI and simplify contracts, milestones, and payments.
        </p>

        <Link
          href="/signup"
          className="mt-10 inline-block rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 hover:bg-gray-100"
        >
          Create Free Account
        </Link>
      </div>
    </section>
  );
}
