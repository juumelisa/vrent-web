import { NextResponse } from "next/server";
import { getSessionToken } from "@/app/lib/session";

export async function GET() {
  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.API_URL}/auth/me`, {
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
