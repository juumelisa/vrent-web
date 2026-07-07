import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/app/lib/session";

export async function GET() {
  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.API_URL}/reservations`, {
      headers: {
        "x-api-key": process.env.API_KEY ?? "",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Internal API error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.API_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY ?? "",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Internal API error" }, { status: 500 });
  }
}
