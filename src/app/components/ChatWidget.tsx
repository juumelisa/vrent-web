"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  requiresLogin?: boolean;
};

const SESSION_STORAGE_KEY = "vrent-chat-session-id";

export default function ChatWidget({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const sessionIdRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionIdRef.current = sessionStorage.getItem(SESSION_STORAGE_KEY);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    setError("");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          session_id: sessionIdRef.current ?? undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong. Please try again.");
        return;
      }
      sessionIdRef.current = data.session_id;
      sessionStorage.setItem(SESSION_STORAGE_KEY, data.session_id);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, requiresLogin: !!data.requires_login },
      ]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex h-[28rem] w-80 flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-200 bg-amber-900 px-4 py-3 dark:border-zinc-800">
            <p className="text-sm font-semibold text-white">VRent Assistant</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white/80 hover:text-white"
            >
              &times;
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <p className="text-sm text-zinc-500">
                Ask me about vehicles, bookings, or your reservations.
              </p>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    message.role === "user"
                      ? "bg-amber-900 text-white"
                      : "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-zinc-50"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.requiresLogin && !isLoggedIn && (
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="mt-2 inline-block font-medium text-amber-900 underline dark:text-amber-500"
                    >
                      Log in to continue
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <p className="max-w-[85%] rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-500 dark:bg-zinc-800">
                  Thinking...
                </p>
              </div>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-zinc-200 px-3 py-3 dark:border-zinc-800"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded border border-zinc-300 bg-transparent px-3 py-2 text-sm text-black outline-none focus:border-amber-900 dark:border-zinc-700 dark:text-zinc-50"
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              className="rounded bg-amber-900 px-3 py-2 text-sm font-medium text-white hover:bg-amber-800 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-900 text-white shadow-lg hover:bg-amber-800"
      >
        {isOpen ? (
          <span className="text-2xl leading-none">&times;</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M4 4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3v3.5a.5.5 0 0 0 .8.4L13 17h7a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
