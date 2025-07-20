import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method
  let url = process.env.API_URL
  if (method === 'POST') {
    url += 'chat/store'
  } else {
    url += 'chat'
  }
  const rawToken: string | string[] | undefined = req.headers['token'];
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken ?? '';
  const headers: Record<string, string> = {
    api_key: process.env.API_KEY ?? '',
    'Content-Type': 'application/json',
    token
  };
  try {
    let response
    if (method === 'POST') {
      response = await fetch(`${url}`,
        {
          headers,
          method,
          body: JSON.stringify(req.body)
        }
      );
    } else {
      response = await fetch(`${url}`,
        {
          headers,
          method,
        }
      );
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: 'Internal API error' });
  }
}