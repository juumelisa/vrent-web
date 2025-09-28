"use client";

import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";

// import React, { useEffect, useState } from "react";


export default function Home() {
  // const [isLoginMenu, setisLoginMenu] = useState(true)
  // useEffect(() => {
  //   fetchCity("")
  //   fetchPopularCity()
  // }, []);
  

  // const fetchCity = async (search: string) => {
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("hello world")
    // if (city?.value && type?.value && startDate && endDate) {
    //   setIsErrorForm(false)
    //   router.push(`vehicle?type=${type}`)
    // } else {
    //   setIsErrorForm(true)
    // }
  }

  // const changeMenu = (menu: string) => {
  //   if (menu === "login") {
  //     setisLoginMenu(true)
  //   } else {
  //     setisLoginMenu(false)
  //   }
  // }

  return (
    <div className="w-full max-w-7xl flex mx-auto mt-20 justify-center">
      <div className="w-full max-w-2xl p-5 md:p-10">
        <div className="flex justify-center">
          <Image src="/images/login.svg" width={200} height={200} alt="login" />
        </div>
        <div className="flex justify-center w-full mt-5 md:mt-10">
          <form onSubmit={onSubmitForm} className="w-full max-w-96 flex flex-col gap-3">
            <input type="email" placeholder="Email" className="border border-gray-300 p-2 rounded text-base outline-0"/>
            <input type="password" placeholder="Password" className="border border-gray-300 p-2 rounded text-base outline-0"/>
            <button type="submit" className="bg-blue-900 text-white p-2 rounded">Login</button>
            <div className="flex gap-1">
              <p>{`Don't have an account?`}</p>
              <Link href="/register" className="text-blue-900">Register here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
