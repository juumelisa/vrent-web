import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.API_URL
    try {
      const response = await fetch(`${url}chat`,
        {
          headers: {
            'api_key': process.env.API_KEY ?? '',
            'Content-Type': 'application/json'
          }
        // method: 'g',
        // body: JSON.stringify({
        //   message: "hi!"
        // })
        }
      );
      const data = await response.json();
      res.status(200).json(data);
    } catch {
      res.status(500).json({ message: 'Internal API error' });
    }
}