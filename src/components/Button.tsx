"use client";
// import { useEffect, useState } from "react";
// import clsx from "clsx";
// import Link from "next/link";
// import { TbMessageChatbotFilled } from "react-icons/tb";
// import { IoMdClose } from "react-icons/io";
// import { FaPaperPlane } from "react-icons/fa";
// import { RiCustomerService2Fill } from "react-icons/ri";
// import { fetchWithToken } from "../../lib/fetchWithToken";
// import { usePathname } from "next/navigation";
type MyButtonProps = {
  onClick: () => void
  children: React.ReactNode
  // className?: string
}

export default function Button({onClick, children}: MyButtonProps) {
  
  return (
    <button
      onClick={onClick}
      className="bg-blue-900 text-white rounded px-5 py-2 cursor-pointer"
    >
      {children}
    </button>
  );
}
