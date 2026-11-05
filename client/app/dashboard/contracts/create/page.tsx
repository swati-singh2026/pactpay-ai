"use client";

import { useEffect, useState, type FormEvent } from "react";

import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  FileText,
  ArrowLeft,
  Sparkles,
  CalendarDays,
  DollarSign,
  UserRound,
  Mail,
} from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
}

export default function CreateContractPage() {
  const [user, setUser] = useState<User | null>(null);
  const [generatedContract, setGeneratedContract] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedContractId, setSavedContractId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const savedId = localStorage.getItem("pactpay_saved_contract_id");

    if (savedId) {
      setSavedContractId(savedId);

      const loadSavedContract = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/contracts/${savedId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const result = await response.json();

          if (!response.ok) {
            console.error("Failed to load saved contract:", result.message);
            return;
          }

          setGeneratedContract(result.data.description);
        } catch (error) {
          console.error("Load Saved Contract Error:", error);
        }
      };

      loadSavedContract();
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    if (new Date(endDate) <= new Date(startDate)) {
      alert("End Date must be after Start Date.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      window.location.href = "/login";
      return;
    }

    const contractData = {
      title: formData.get("contractTitle"),
      description: formData.get("description"),
      amount: Number(formData.get("contractValue")),
      freelancerId: formData.get("freelancerId"),
    };

    try {
      const response = await fetch("http://localhost:5000/api/contracts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contractData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to create contract.");
        return;
      }

      alert("Contract saved successfully!");
    } catch (error) {
      console.error("Create Contract Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleGenerateContract = async () => {
    const form = document.querySelector("form");

    if (!form || !form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      window.location.href = "/login";
      return;
    }

    const contractData = {
      title: formData.get("contractTitle"),
      contractType: formData.get("contractType"),
      amount: Number(formData.get("contractValue")),
      clientName: formData.get("clientName"),
      freelancerName: formData.get("freelancerName"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      paymentTerms: formData.get("paymentTerms"),
      description: formData.get("description"),
      additionalRequirements: formData.get("additionalRequirements"),
    };

    try {
      setIsGenerating(true);

      const response = await fetch(
        "http://localhost:5000/api/contracts/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(contractData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Contract generation failed.");
        return;
      }

      setGeneratedContract(result.data.generatedContract);

      alert("AI Contract generated successfully!");
    } catch (error) {
      console.error("AI Contract Generation Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveGeneratedContract = async () => {
    if (!generatedContract.trim()) {
      alert("Please generate a contract first.");
      return;
    }

    const form = document.querySelector("form");

    if (!form) return;

    const formData = new FormData(form);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      window.location.href = "/login";
      return;
    }

    const contractData = {
      title: formData.get("contractTitle"),
      description: generatedContract,
      amount: Number(formData.get("contractValue")),
    };

    try {
      const isUpdating = savedContractId !== null;

      const url = isUpdating
        ? `http://localhost:5000/api/contracts/${savedContractId}`
        : "http://localhost:5000/api/contracts";

      const response = await fetch(url, {
        method: isUpdating ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contractData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to save contract.");
        return;
      }

      if (!isUpdating) {
        setSavedContractId(result.data.id);

        localStorage.setItem("pactpay_saved_contract_id", result.data.id);
      }
      alert(
        isUpdating
          ? "Contract updated successfully!"
          : "Contract saved successfully!",
      );
    } catch (error) {
      console.error("Save Contract Error:", error);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <DashboardLayout userName={user?.name ?? ""} onLogout={handleLogout}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}

        <div className="mb-8">
          <Link
            href="/dashboard"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3">
              <FileText className="text-blue-600" size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create New Contract
              </h1>

              <p className="mt-1 text-gray-500">
                Enter contract details to create your smart agreement.
              </p>
            </div>
          </div>
        </div>

        {/* Contract Form */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Basic Information */}

            <section>
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                Basic Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Contract Title
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Website Development Agreement"
                    name="contractTitle"
                    required
                    maxLength={100}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Contract Type
                  </label>
                  <select
                    name="contractType"
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="">Select Contract Type</option>
                    <option>Freelance Agreement</option>
                    <option>Service Agreement</option>
                    <option>Development Agreement</option>
                    <option>Consulting Agreement</option>
                    <option>Partnership Agreement</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Contract Value ($)
                  </label>

                  <div className="relative">
                    <DollarSign
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="number"
                      placeholder="5000"
                      name="contractValue"
                      required
                      min="1"
                      className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr />

            {/* Client Information */}

            <section>
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                Client Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Client / Party Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Enter client name"
                      name="clientName"
                      required
                      maxLength={100}
                      className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Client Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="email"
                      name="clientEmail"
                      required
                      placeholder="client@example.com"
                      className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Freelancer User ID
                  </label>

                  <input
                    type="text"
                    name="freelancerId"
                    required
                    placeholder="Enter existing freelancer user ID"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Freelancer Name
                    </label>

                    <input
                      type="text"
                      name="freelancerName"
                      required
                      placeholder="Enter freelancer name"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr />

            {/* Contract Timeline */}

            <section>
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                Contract Timeline
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Start Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="date"
                      name="startDate"
                      required
                      className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    End Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="date"
                      name="endDate"
                      required
                      className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr />

            {/* Payment Terms */}

            <section>
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                Payment Terms
              </h2>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Payment Structure
              </label>

              <select
                name="paymentTerms"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="">Select Payment Terms</option>
                <option>Milestone Based Payment</option>
                <option>Full Payment Upfront</option>
                <option>50% Advance - 50% Completion</option>
                <option>Monthly Payment</option>
              </select>
            </section>

            <hr />

            {/* Description */}

            <section>
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                Project Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Contract Description
                  </label>

                  <textarea
                    name="description"
                    rows={4}
                    required
                    placeholder="Describe the project, services and responsibilities..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Additional Requirements
                  </label>

                  <textarea
                    name="additionalRequirements"
                    rows={3}
                    placeholder="Enter any additional conditions or requirements..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </section>
            {/* Editable AI Generated Contract */}
            {generatedContract && (
              <section className="mt-8 space-y-4 rounded-2xl border border-blue-200 bg-blue-50 p-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-blue-600" size={22} />

                  <h2 className="text-xl font-bold text-gray-900">
                    AI Generated Contract
                  </h2>
                </div>

                <p className="text-sm text-gray-600">
                  Review and edit your AI-generated contract before saving it.
                </p>

                <textarea
                  value={generatedContract}
                  onChange={(e) => setGeneratedContract(e.target.value)}
                  rows={18}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={handleSaveGeneratedContract}
                  className="w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  Save Edited Contract
                </button>
              </section>
            )}
            {/* Generate Button */}

            <div className="flex justify-end border-t pt-6">
              <button
                type="button"
                onClick={handleGenerateContract}
                disabled={isGenerating}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles size={19} />
                {isGenerating ? "Generating..." : "Generate Contract"}
              </button>
            </div>
          </form>
        </div>

        {/* AI Information */}

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <Sparkles className="mt-1 shrink-0 text-blue-600" size={22} />

          <div>
            <h3 className="font-semibold text-blue-900">
              Powered by PactPay AI
            </h3>

            <p className="mt-1 text-sm text-blue-700">
              Your contract details will be used to generate professional
              agreements with AI-powered clauses, milestone suggestions and risk
              analysis.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
