import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  const chats = [
    {
      role: "system",
      content: "you are a helpful assistant of vehicle rental website. you only help user for vehicle rent related things. if user ask unrelated querion, please refuse."
    },
    ...messages
  ]
  const ollamaRes = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      messages: chats,
      stream: true,
    }),
  });


  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  const reader = ollamaRes.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true })
    res.write(chunk);
    res.flush?.();
  }

  res.end();
}
