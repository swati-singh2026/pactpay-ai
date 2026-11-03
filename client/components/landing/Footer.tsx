import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 py-12 text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-white">PactPay AI</h2>

          <p className="mt-2">
            AI-powered contract & payment platform for freelancers.
          </p>
        </div>

        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        © 2026 PactPay AI. All Rights Reserved.
      </p>
    </footer>
  );
}
