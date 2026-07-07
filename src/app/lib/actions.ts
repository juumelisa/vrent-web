"use server";

import { redirect } from "next/navigation";
import { clearSessionCookie, getSessionToken } from "@/app/lib/session";

export async function logout() {
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
  redirect("/login");
}
