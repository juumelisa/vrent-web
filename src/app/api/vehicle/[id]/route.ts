import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = req.headers.get("token") ?? "";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": process.env.API_KEY ?? "",
    token,
  };

  try {
    const response = await fetch(`${process.env.API_URL}/vehicles/${id}`, {
      headers,
      method: "GET",
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Internal API error" }, { status: 500 });
  }
}
