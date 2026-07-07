"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Could not create your account");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-sm flex-1 py-16 px-6">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-6">
          Create an account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm text-zinc-500 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-black dark:text-zinc-50"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-zinc-500 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-black dark:text-zinc-50"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-zinc-500 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-black dark:text-zinc-50"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded bg-blue-900 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800"
          >
            {isSubmitting ? "Creating account…" : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-zinc-500">
          {`Already have an account? `}
          <Link href="/login" className="text-blue-900 dark:text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}
