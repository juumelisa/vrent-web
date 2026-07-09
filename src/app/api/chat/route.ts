import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/app/lib/session";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.message !== "string" || !body.message.trim()) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const token = await getSessionToken();

  try {
    const response = await fetch(`${process.env.AGENT_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        message: body.message,
        session_id: typeof body.session_id === "string" ? body.session_id : undefined,
      }),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Agent is unavailable" }, { status: 502 });
  }
}
