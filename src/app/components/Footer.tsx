import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-black dark:text-zinc-50">VRent</p>
          <p className="mt-1 text-sm text-zinc-500">
            Find and book the perfect vehicle for your next trip.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link
            href="/vehicle"
            className="text-amber-900 dark:text-amber-400 hover:underline"
          >
            Vehicles
          </Link>
          <Link
            href="/about"
            className="text-amber-900 dark:text-amber-400 hover:underline"
          >
            About us
          </Link>
          <Link
            href="/faq"
            className="text-amber-900 dark:text-amber-400 hover:underline"
          >
            FAQ
          </Link>
          <Link
            href="/reservations"
            className="text-amber-900 dark:text-amber-400 hover:underline"
          >
            My reservations
          </Link>
        </nav>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} VRent. All rights reserved.
      </div>
    </footer>
  );
}
