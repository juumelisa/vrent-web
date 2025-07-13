"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const [isChatAvailable, setIsChatAvailable] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState([{role: '', message: ''}])

  useEffect(() => {
    fetchApiAgent()
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeShowChat = () => {
    setShowChat(!showChat)
  }

  const fetchApiAgent = async () => {
    const data = await fetch('/api/chat');
    const rest = await data.json()
    if (rest.code === 200) {
      const result = rest.result[0]
      const token = result.token
      localStorage.setItem('token', token)
      setIsChatAvailable(true)
      setChatHistory([{role: result.role, message: result.content.trim()}, {role: "user", message: "i wanna rent a car in denpasar"}])
    }
  }
  return (
    <header
        className={clsx("fixed z-30 w-full flex flex-row justify-between p-5 md:px-10 xl:px-20",
        scrolled ? "bg-white text-black" : "bg-transparent text-white")}
    >
    <Link href="/" className="font-bold text-3xl">vrent</Link>
      <nav>
        <ul className="flex gap-6">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/login">Login or Sign Up</Link></li>
        </ul>
      </nav>
      { isChatAvailable && <div className="absolute right-20 -bottom-[550px]">
          <div className="flex flex-col items-end text-sm">
            {showChat &&  <div className={
                clsx(
                  "relative w-80 h-[400px] bg-white text-black border-2 rounded mb-5",
                  scrolled ? "border-blue-900" : "border-white"
                )
              }>
                <div className="bg-blue-900 text-white p-5 border-b">
                  <p className="font-bold">vrent Agent</p>
                </div>
                <div className="w-full h-72 p-5 overflow-y-auto">
                  {chatHistory.map((chat, index)=> {
                    return <div
                      key={index}
                      className={clsx(
                        chat.role === "assistant" ? "" : "flex justify-end"
                      )}>
                        <div className={clsx(
                          "w-auto max-w-60 p-2 rounded-b-lg mt-2",
                          chat.role === "assistant" ? "bg-blue-900/20 rounded-r-lg" : "bg-blue-400/15 rounded-l-lg"
                        )}>
                          <p>{chat.message}</p>
                        </div>
                      </div>
                  })}
                  {/* <div>
                    <div className="w-full max-w-60 bg-blue-900/20 p-2 rounded-r-md rounded-b-md">
                      <p>Hi, i am vrent virtual assisstant. How can i help you?</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <div className="w-auto max-w-60 bg-blue-400/5 p-2 rounded-l-md rounded-b-md">
                      <p>Do you have any recommendation vehicle for 2 people?</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <div className="w-auto max-w-60 bg-blue-400/5 p-2 rounded-l-md rounded-b-md">
                      <p>Do you have</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <div className="w-auto max-w-60 bg-blue-400/5 p-2 rounded-l-md rounded-b-md">
                      <p>Do you</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <div className="w-auto max-w-60 bg-blue-400/5 p-2 rounded-l-md rounded-b-md">
                      <p>Do you have any recommendation</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <div className="w-auto max-w-60 bg-blue-400/5 p-2 rounded-l-md rounded-b-md">
                      <p>Do you have any</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <div className="w-auto max-w-60 bg-blue-400/5 p-2 rounded-l-md rounded-b-md">
                      <p>Do you have any recommendation</p>
                    </div>
                  </div> */}
                </div>
                <div className="w-full absolute bottom-0">
                  <input className="border-blue-900 w-full bg-blue-400/10 py-3 px-5 outline-0" placeholder="Ask here"/>
                </div>
              </div>
            }
            <button onClick={changeShowChat} className=" bg-blue-900 border-white border-2 text-white p-3 rounded-full cursor-pointer">
              {!showChat && <div className="w-36 flex justify-center items-center gap-3">
                <p>Ask vrent</p>
                <TbMessageChatbotFilled size={30} />
              </div>
              }
              {showChat && <IoMdClose size={30}/>}
            </button>
          </div>
      </div>}
    </header>
  );
}
