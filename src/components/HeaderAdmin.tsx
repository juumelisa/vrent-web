"use client";
import { useTheme } from "@/app/theme-provider";
import { LuMoon, LuSun } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

export default function HeaderAdmin() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="w-full h-16 border-b border-gray-200 flex justify-end items-center gap-5 px-5">
      <button onClick={toggleTheme} className="cursor-pointer p-2 rounded-full bg-blue-100 dark:bg-gray-500">
        { theme === 'light' && <LuSun size={24} />}
        { theme === 'dark' && <LuMoon size={24} />}
      </button>
      <button className="cursor-pointer">
        <FaUserCircle size={40} />
      </button>
    </div>
  );
}
