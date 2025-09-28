"use client";

import { useState } from "react";
import { MdSupportAgent } from "react-icons/md";

type MessageType = {
  role: string,
  content: string
}

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string | null>();
  const [messages, setMessages] = useState<MessageType[]>([
    // { role: "system", content: "You are a helpful assistant." }
  ]);

  const openState = () => {
    const newState = !open;
    setOpen(newState)
  }

  const sendMessage = async () => {
    const userMessage = message.trim()
    if (userMessage.length) {
      setMessage("")
      const newMessages = [
        ...messages,
        {
          role: "user",
          content: userMessage
        }
      ]
      setMessages(newMessages)
      setResponse(" ")
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });


      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let newResponse = ''
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true }).trim();
        const lines = chunk.split("\n").filter(Boolean);
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.message?.content) {
              newResponse += data.message.content;
              setResponse(newResponse);
            }
          } catch (err) {
            console.log(err)
            console.error("Bad JSON", line);
          }
        }
      }
      const newChats = [
        ...newMessages,
        {
          role: "assistant",
          content: newResponse
        }
      ]
      setMessages(newChats)
      setResponse(null);
    }
  }
  return (
    <div
      className="fixed bottom-20 right-10 z-50"
    >
      {open && <div className="flex flex-col w-lg h-[550px] bg-white text-black mb-5 overflow-hidden">
        <div className="bg-blue-400 p-5">
          <p className="text-white">AI Assistant</p>
        </div>
        <div className="overflow-y-auto h-full p-3 text-sm flex flex-col gap-5">
          {messages.map((message, index) => {
            return <div key={index}>
              { message.role == 'user' && <div className="w-full flex justify-end">
                <div className="max-w-4/5 bg-blue-50 p-2 rounded-t rounded-bl">{ message.content}</div>
              </div>}
              { message.role == 'assistant' &&<div className="max-w-4/5 bg-gray-100 p-2 rounded-t rounded-br whitespace-pre-wrap">
                <div>{ message.content}</div>
              </div>}
            </div>
          })}
          {response && <div className="max-w-4/5 bg-gray-100 p-2 rounded-t rounded-br whitespace-pre-wrap">
            {(response == " ") && <div className="flex gap-1">
              <div className="w-2 h-2 animate-ping rounded-full bg-sky-900"></div>
              <div className="w-2 h-2 animate-ping rounded-full bg-sky-900"></div>
              <div className="w-2 h-2 animate-ping rounded-full bg-sky-900"></div>
            </div>}
            {(response !== " ") &&<div>{response}</div>}
          </div>}
        </div>
        <div className="w-full h-14 bg-blue-100 p-3 text-sm">
          <form onSubmit={(e) => {e.preventDefault(); sendMessage()}} className="w-full flex gap-1">
            <input
              type="text"
              placeholder="Message"
              className="w-full outline-0 border border-blue-900 px-3 py-1 rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)} />
            <button type="submit" className="cursor-pointer">Send</button>
          </form>
        </div>
      </div>}
      <button
        onClick={openState}
        className="absolute right-0 bg-blue-900 border border-white cursor-pointer p-3 rounded-full">
        <MdSupportAgent size={30}/>
      </button>
    </div>
  );
}
