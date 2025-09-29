import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false
  }
};

declare global {
  interface RequestInit {
    duplex?: "half";
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const url = process.env.API_URL + 'upload'
  const headers: Record<string, string> = {
    'x-api-key': process.env.API_KEY ?? '',
    "content-type": req.headers["content-type"] || "",
  };
  try {

    const bodyStream = Readable.toWeb(req) as ReadableStream;
    const response = await fetch(url,
      {
        headers,
        method: 'POST',
        body: bodyStream,
        duplex: "half",
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({
      code: 500,
      status: "error",
      message: ['Internal API error'],
      result: []
    });
  }
}