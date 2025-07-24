import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.API_URL + 'location/city'
  const rawQuery = req.query;
  const safeQuery: Record<string,string> = {}
  for (const key in rawQuery) {
    const value = rawQuery[key];
    safeQuery[key] = Array.isArray(value) ? value[0] : (value ?? '');
  }
  const params = new URLSearchParams(safeQuery);
  const rawToken: string | string[] | undefined = req.headers['token'];
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken ?? '';
  const headers: Record<string, string> = {
    'x-api-key': process.env.API_KEY ?? '',
    'Content-Type': 'application/json',
    token
  };
  try {
    const response = await fetch(`${url}?${params}`,
      {
          headers,
          method: 'GET'
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: 'Internal API error' });
  }
}