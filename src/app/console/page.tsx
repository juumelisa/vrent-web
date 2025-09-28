"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      window.location.href = "/admin/dashboard"
    }
  }, [])
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("hello world")
    console.log(e)
    const body = {
      email,
      password
    }
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const response = await res.json();
    if (response.code === 200) {
      window.location.href = "/admin/dashboard"
      const result = response.result[0]
      const token = result.token
      const admin = result.admin
      localStorage.setItem('token', token)
      localStorage.setItem('admin', JSON.stringify(admin))
    } else {
      console.log(response)
    }
  }
  return (
    <div className="w-full max-w-7xl flex mx-auto mt-20 justify-center">
      <div className="w-full max-w-2xl p-5 md:p-10">
        <div className="flex justify-center">
          <Image src="/images/login.svg" width={200} height={200} alt="login" />
        </div>
        <div className="flex justify-center w-full mt-5 md:mt-10">
          <form onSubmit={onSubmitForm} className="w-full max-w-96 flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded text-base outline-0"/>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded text-base outline-0"/>
            <button type="submit" className="bg-blue-900 text-white p-2 rounded cursor-pointer">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
