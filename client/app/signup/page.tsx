"use client";

import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CLIENT",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        alert("Signup Successful!");

        setFormData({
          name: "",
          email: "",
          password: "",
          role: "CLIENT",
        });
      } else {
        alert(data.message || "Signup Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend server.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="w-96 rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mb-6 w-full rounded border p-3"
        >
          <option value="CLIENT">Client</option>
          <option value="FREELANCER">Freelancer</option>
        </select>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
