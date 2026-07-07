import { NextResponse } from "next/server";
import { clearSessionCookie, getSessionToken } from "@/app/lib/session";

export async function POST() {
  const token = await getSessionToken();

  if (token) {
    try {
      await fetch(`${process.env.API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "x-api-key": process.env.API_KEY ?? "",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // Ignore network errors — the local cookie is cleared regardless.
    }
  }

  await clearSessionCookie();
  return NextResponse.json({ message: "Logged out" });
}
