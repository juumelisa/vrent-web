import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.API_URL + 'user/'
  const headers: Record<string, string> = {
    'x-api-key': process.env.API_KEY ?? '',
    'Content-Type': 'application/json'
  };
  try {
    const response = await fetch(url,
      {
          headers,
          method: 'POST',
          body: req.body
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: 'Internal API error' });
  }
}