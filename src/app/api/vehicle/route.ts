import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = `${process.env.API_URL}/vehicles`;
  const params = req.nextUrl.searchParams.toString();
  const token = req.headers.get("token") ?? "";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": process.env.API_KEY ?? "",
    token,
  };

  try {
    const response = await fetch(`${url}?${params}`, {
      headers,
      method: "GET",
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Internal API error" }, { status: 500 });
  }
}
