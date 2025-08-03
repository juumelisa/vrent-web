"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
// import { useState } from "react";

// import React, { useEffect, useState } from "react";

export default function Home() {
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const rest = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data)
    })
    const result = await rest.json()
    if (result.code === 200) {
      await login()
    } else {
      setIsError(true)
      const message = result.message[0]
      setErrorMessage(message)
    }
  }

  const login = async () => {
    const rest = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    const result = await rest.json()
    if (result.code === 200) {
      const resultData = result.result[0]
      const token = resultData.token
      if (token) {
        localStorage.setItem("token", token)
        window.location.href = "/"
      }
    }
  }
  const onChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.id
    const value = e.target.value
    if (id && value) {
      const newData = data
      if (id === "name" || id === "email" || id === "password") {
        newData[id] = value
        setData(newData)
      }
    }
  }
  return (
    <div className="w-full max-w-7xl flex mx-auto mt-20 justify-center">
      <div className="w-full max-w-2xl p-5 md:p-10">
        <div className="flex justify-center">
          <Image src="/images/register.svg" width={200} height={200} alt="welcome" />
        </div>
        <div className="flex justify-center w-full mt-5 md:mt-10">
          <form onSubmit={onSubmitForm} className="w-full max-w-96 flex flex-col gap-3">
            <p className="text-red-600 italic">{errorMessage}</p>
            <input type="text" placeholder="Name" id="name" onChange={onChangeData} className="border border-gray-300 p-2 rounded text-base outline-0"/>
            <input type="email" placeholder="Email" id="email" onChange={onChangeData} className="border border-gray-300 p-2 rounded text-base outline-0"/>
            <input type="password" placeholder="Password" id="password" onChange={onChangeData} className="border border-gray-300 p-2 rounded text-base outline-0"/>
            <button type="submit" className="bg-blue-900 text-white p-2 rounded cursor-pointer">Sign Up</button>
            <div className="flex gap-1">
              <p>{`Have an account?`}</p>
              <Link href="/register" className="text-blue-900">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
