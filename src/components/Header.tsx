"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const transparentPath = ['/', '/about', '/about']
  const pathname:string = usePathname() || ''
  const bgTransparent = transparentPath.includes(pathname)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
        className={clsx("fixed z-30 w-full flex flex-row justify-between items-center p-5 md:px-10 xl:px-20",
        !scrolled && bgTransparent ? "bg-transparent text-white" : "bg-white text-blue-900" )}
    >
      
      <Link href="/" className="font-bold text-3xl flex items-center">
        <p>VRent</p>
      </Link>
      <nav>
        <ul className="flex gap-6">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/login">Login or Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
}
