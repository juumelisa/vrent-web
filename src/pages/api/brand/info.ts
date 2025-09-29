import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query ? req.query.id : null;
  let url = process.env.API_URL + 'vehicle'
  if (id) {
    url += `/${id}`
    const rawToken: string | string[] | undefined = req.headers['token'];
    const token = Array.isArray(rawToken) ? rawToken[0] : rawToken ?? '';
    const headers: Record<string, string> = {
      api_key: process.env.API_KEY ?? '',
      'Content-Type': 'application/json',
      token
    };
    try {
      const response = await fetch(`${url}`,
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
  } else {
    res.status(200).json({
      status: "error",
      code: 400,
      message: "id is required",
      result: []
    })
  }
}