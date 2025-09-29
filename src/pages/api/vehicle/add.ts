import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const url = process.env.API_URL + "vehicle"
  const rawToken: string | string[] | undefined = req.headers["token"];
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken ?? "";
  const headers: Record<string, string> = {
    "x-api-key": process.env.API_KEY ?? "",
    "Content-Type": "application/json",
    token
  };
  try {
    const response = await fetch(`${url}`,
      {
        headers,
        method: "POST",
        body: JSON.stringify(req.body)
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(200).json({
      status: "error",
      code: 400,
      message: ["internal server error"],
      result: []
    })
  }
}