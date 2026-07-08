"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function ReservationDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      setIsLoading(true);
      setIsNotFound(false);
      setIsError(false);
      try {
        const res = await fetch(`/api/reservations/${id}`);
        if (res.status === 404) {
          if (!cancelled) setIsNotFound(true);
          return;
        }
        if (!res.ok) {
          if (!cancelled) setIsError(true);
          return;
        }
        const data = await res.json();
        if (!cancelled) setReservation(data);
      } catch {
        if (!cancelled) setIsError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleCancel = async () => {
    setCancelError("");
    setIsCancelling(true);
    try {
      const res = await fetch(`/api/reservations/${id}/cancel`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setCancelError(data.message ?? "Could not cancel this reservation");
        return;
      }
      setReservation((prev) => (prev ? { ...prev, status: "cancelled" } : prev));
    } catch {
      setCancelError("Something went wrong. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-2xl flex-1 p-6">
        <Link
          href="/reservations"
          className="inline-block mb-6 text-blue-900 dark:text-blue-400 hover:underline"
        >
          &larr; Back to my reservations
        </Link>

        {isLoading && (
          <div className="w-full flex gap-6">
            <div className="w-40 h-32 animate-pulse bg-gray-200 dark:bg-zinc-800" />
            <div className="flex-1 flex flex-col gap-3">
              <div className="w-48 h-6 animate-pulse bg-gray-200 dark:bg-zinc-800" />
              <div className="w-32 h-5 animate-pulse bg-gray-200 dark:bg-zinc-800" />
            </div>
          </div>
        )}

        {!isLoading && isNotFound && (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <p className="text-xl">Oops...</p>
            <p>{`We couldn't find that reservation.`}</p>
          </div>
        )}

        {!isLoading && !isNotFound && isError && (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <p className="text-xl text-red-600">Oops... something went wrong</p>
            <p className="text-blue-900 dark:text-blue-400">{`We'll fix it soon`}</p>
          </div>
        )}

        {!isLoading && !isNotFound && !isError && reservation && (
          <div className="w-full text-black dark:text-zinc-50">
            <div className="flex gap-6">
              <div className="w-40 h-32 relative bg-gray-100 dark:bg-zinc-900 shrink-0">
                {reservation.imageUrl && (
                  <Image
                    src={reservation.imageUrl}
                    alt={`${reservation.brand} ${reservation.model}`}
                    fill
                    sizes="160px"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <div>
                <p className="capitalize text-blue-900 dark:text-blue-400">{reservation.type}</p>
                <h1 className="text-2xl font-bold capitalize">
                  {reservation.brand} {reservation.model}
                </h1>
                <p className="text-sm text-zinc-500 mt-1">{reservation.policeNumber}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-y-2 text-sm max-w-sm">
              <p className="text-zinc-500">Start date</p>
              <p>{reservation.startDate}</p>
              <p className="text-zinc-500">End date</p>
              <p>{reservation.endDate}</p>
              <p className="text-zinc-500">Total price</p>
              <p className="font-bold">{formatRupiah(reservation.totalPrice)}</p>
              <p className="text-zinc-500">Status</p>
              <p
                className={`capitalize font-medium ${
                  reservation.status === "cancelled" ? "text-red-600" : "text-green-700 dark:text-green-500"
                }`}
              >
                {reservation.status}
              </p>
            </div>

            {cancelError && <p className="text-red-600 text-sm mt-4">{cancelError}</p>}

            {reservation.status === "confirmed" && (
              <button
                onClick={handleCancel}
                disabled={isCancelling}
                className="mt-6 py-3 px-6 rounded border border-red-600 text-red-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 dark:hover:bg-red-950"
              >
                {isCancelling ? "Cancelling…" : "Cancel reservation"}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
