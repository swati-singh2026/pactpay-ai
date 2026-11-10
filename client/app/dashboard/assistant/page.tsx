"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Bot, Send, User, Sparkles, ArrowLeft } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface UserData {
  name: string;
  email: string;
  role: string;
}

export default function AssistantPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm PactPay AI Assistant. Ask me anything about contracts, milestones, payments, or freelancing.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = input.trim();

    if (!message || isLoading) return;

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to get AI response.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.data.reply,
        },
      ]);
    } catch (err) {
      console.error("AI Chat Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout userName={user?.name ?? ""} onLogout={handleLogout}>
      <div className="mx-auto flex h-[calc(100vh-130px)] max-w-5xl flex-col">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3">
              <Sparkles className="text-blue-600" size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                PactPay AI Assistant
              </h1>
              <p className="mt-1 text-gray-500">
                Your smart assistant for contracts and payments.
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-200 bg-blue-50 px-6 py-4">
            <div className="rounded-full bg-blue-600 p-2">
              <Bot className="text-white" size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">AI Chat Assistant</h2>
              <p className="text-xs text-green-600">Ready to help</p>
            </div>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`rounded-full p-2 ${
                    message.role === "user" ? "bg-blue-600" : "bg-blue-100"
                  }`}
                >
                  {message.role === "user" ? (
                    <User size={18} className="text-white" />
                  ) : (
                    <Bot size={18} className="text-blue-600" />
                  )}
                </div>

                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 ${
                    message.role === "user"
                      ? "rounded-tr-none bg-blue-600 text-white"
                      : "rounded-tl-none bg-slate-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <Bot size={18} className="text-blue-600" />
                </div>

                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-gray-500">
                  AI is thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {error && (
            <div className="mx-6 mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 border-t border-gray-200 p-4"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask PactPay AI something..."
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
              Send
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
