"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Reservation = {
  id: string;
  vehicleId: string;
  type: string;
  brand: string;
  model: string;
  imageUrl: string;
  policeNumber: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "confirmed" | "cancelled";
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/reservations");
        if (res.status === 401) {
          if (!cancelled) setNeedsLogin(true);
          return;
        }
        if (!res.ok) {
          if (!cancelled) setIsError(true);
          return;
        }
        const data = await res.json();
        if (!cancelled) setReservations(data);
      } catch {
        if (!cancelled) setIsError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl flex-1 p-6">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-6">
          My Reservations
        </h1>

        {isLoading && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full h-20 animate-pulse bg-gray-200 dark:bg-zinc-800" />
            ))}
          </div>
        )}

        {!isLoading && needsLogin && (
          <p className="text-sm">
            <Link href="/login" className="text-amber-900 dark:text-amber-400 hover:underline">
              Log in
            </Link>{" "}
            to see your reservations.
          </p>
        )}

        {!isLoading && !needsLogin && isError && (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <p className="text-xl text-red-600">Oops... something went wrong</p>
            <p className="text-amber-900 dark:text-amber-400">{`We'll fix it soon`}</p>
          </div>
        )}

        {!isLoading && !needsLogin && !isError && reservations.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <p className="text-lg">You have no reservations yet</p>
            <Link href="/" className="mt-2 text-amber-900 dark:text-amber-400 hover:underline">
              Browse vehicles
            </Link>
          </div>
        )}

        {!isLoading && !needsLogin && !isError && reservations.length > 0 && (
          <div className="flex flex-col gap-3">
            {reservations.map((reservation) => (
              <Link
                key={reservation.id}
                href={`/reservations/${reservation.id}`}
                className="flex items-center gap-4 p-3 border border-zinc-200 dark:border-zinc-800 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <div className="w-20 h-16 relative bg-gray-100 dark:bg-zinc-900 shrink-0">
                  {reservation.imageUrl && (
                    <Image
                      src={reservation.imageUrl}
                      alt={`${reservation.brand} ${reservation.model}`}
                      fill
                      sizes="80px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="flex-1 text-black dark:text-zinc-50">
                  <p className="capitalize font-medium">
                    {reservation.brand} {reservation.model}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {reservation.startDate} &rarr; {reservation.endDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatRupiah(reservation.totalPrice)}</p>
                  <p
                    className={`text-sm capitalize ${
                      reservation.status === "cancelled" ? "text-red-600" : "text-green-700 dark:text-green-500"
                    }`}
                  >
                    {reservation.status}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
