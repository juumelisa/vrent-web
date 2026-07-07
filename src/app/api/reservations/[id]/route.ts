import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/app/lib/session";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.API_URL}/reservations/${id}`, {
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
