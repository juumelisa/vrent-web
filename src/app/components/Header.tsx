"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({
  isLoggedIn,
  logout,
}: {
  isLoggedIn: boolean;
  logout: () => Promise<void>;
}) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isLanding) return;
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLanding]);

  const transparent = isLanding && !isScrolled;
  const linkClass = transparent
    ? "text-white hover:underline"
    : "text-blue-900 dark:text-blue-400 hover:underline";

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full h-16 flex items-center justify-between px-6 transition-colors duration-300 ${
          transparent
            ? "bg-transparent"
            : "bg-zinc-50/95 dark:bg-black/95 backdrop-blur border-b border-zinc-200 dark:border-zinc-800"
        }`}
      >
        <Link
          href="/"
          className={`font-semibold ${transparent ? "text-white" : "text-black dark:text-zinc-50"}`}
        >
          VRent
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/vehicle" className={linkClass}>
            Vehicles
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/reservations" className={linkClass}>
                My reservations
              </Link>
              <form action={logout}>
                <button type="submit" className={linkClass}>
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass}>
                Log in
              </Link>
              <Link href="/register" className={linkClass}>
                Sign up
              </Link>
            </>
          )}
        </nav>
      </header>
      {!isLanding && <div className="h-16" />}
    </>
  );
}
