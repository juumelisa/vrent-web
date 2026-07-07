import { NextRequest, NextResponse } from "next/server";
import { setSessionCookie } from "@/app/lib/session";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY ?? "",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    await setSessionCookie(data.token);
    return NextResponse.json({ user: data.user }, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Internal API error" }, { status: 500 });
  }
}
