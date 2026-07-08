"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";

type VehicleUnit = {
  id: string;
  policeNumber: string;
  available: boolean;
};

type VehicleDetail = {
  id: string;
  type: string;
  brand: string;
  model: string;
  imageUrl: string;
  locationId: string;
  pricePerDay: number;
  seats: number;
  transmission: string;
  units: VehicleUnit[];
};

type Reservation = {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  policeNumber: string;
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function VehicleDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);

  const [startDate, setStartDate] = useState(todayISO());
  const [endDate, setEndDate] = useState("");
  const [isReserving, setIsReserving] = useState(false);
  const [reserveError, setReserveError] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      setIsLoading(true);
      setIsNotFound(false);
      setIsError(false);
      try {
        const res = await fetch(`/api/vehicle/${id}`);
        if (res.status === 404) {
          if (!cancelled) setIsNotFound(true);
          return;
        }
        if (!res.ok) {
          if (!cancelled) setIsError(true);
          return;
        }
        const data = await res.json();
        if (!cancelled) setVehicle(data);
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

  const availableUnits = vehicle?.units?.filter((unit) => unit.available).length ?? 0;

  const handleReserve = async (e: FormEvent) => {
    e.preventDefault();
    setReserveError("");
    setNeedsLogin(false);
    setIsReserving(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId: id, startDate, endDate }),
      });
      const data = await res.json();
      if (res.status === 401) {
        setNeedsLogin(true);
        return;
      }
      if (!res.ok) {
        setReserveError(data.message ?? "Could not create your reservation");
        return;
      }
      setReservation(data);
    } catch {
      setReserveError("Something went wrong. Please try again.");
    } finally {
      setIsReserving(false);
    }
  };

  const days =
    startDate && endDate
      ? Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000)
      : 0;
  const estimatedTotal = vehicle && days > 0 ? days * vehicle.pricePerDay : 0;

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-4xl flex-1 py-16 px-6">
        <Link
          href="/vehicle"
          className="inline-block mb-6 text-blue-900 dark:text-blue-400 hover:underline"
        >
          &larr; Back to list
        </Link>

        {isLoading && (
          <div className="w-full flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-72 animate-pulse bg-gray-200 dark:bg-zinc-800" />
            <div className="w-full md:w-1/2 flex flex-col gap-3">
              <div className="w-40 h-6 animate-pulse bg-gray-200 dark:bg-zinc-800" />
              <div className="w-60 h-8 animate-pulse bg-gray-200 dark:bg-zinc-800" />
              <div className="w-32 h-6 animate-pulse bg-gray-200 dark:bg-zinc-800" />
            </div>
          </div>
        )}

        {!isLoading && isNotFound && (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <p className="text-xl">Oops...</p>
            <p>{`We couldn't find the vehicle you're looking for.`}</p>
          </div>
        )}

        {!isLoading && !isNotFound && isError && (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <p className="text-xl text-red-600">Oops... something went wrong</p>
            <p className="text-blue-900 dark:text-blue-400">{`We'll fix it soon`}</p>
          </div>
        )}

        {!isLoading && !isNotFound && !isError && vehicle && (
          <div className="w-full flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-72 relative bg-gray-100 dark:bg-zinc-900">
              {vehicle.imageUrl && (
                <Image
                  src={vehicle.imageUrl}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>

            <div className="w-full md:w-1/2 text-black dark:text-zinc-50">
              <p className="capitalize text-blue-900 dark:text-blue-400">{vehicle.type}</p>
              <h1 className="text-2xl font-bold capitalize">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="font-bold text-2xl mt-2">
                {formatRupiah(vehicle.pricePerDay)}/day
              </p>

              <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
                <p className="text-zinc-500">Seats</p>
                <p>{vehicle.seats}</p>
                <p className="text-zinc-500">Transmission</p>
                <p>{vehicle.transmission}</p>
                <p className="text-zinc-500">Available units</p>
                <p>{availableUnits}</p>
              </div>

              <div className="mt-6">
                {reservation ? (
                  <div className="rounded bg-green-100 text-green-800 p-4">
                    <p className="font-medium">Reservation confirmed!</p>
                    <p className="text-sm mt-1">
                      {reservation.startDate} &rarr; {reservation.endDate} &middot;{" "}
                      {reservation.policeNumber}
                    </p>
                    <p className="text-sm">Total: {formatRupiah(reservation.totalPrice)}</p>
                    <Link
                      href="/reservations"
                      className="inline-block mt-2 text-sm text-blue-900 dark:text-blue-800 hover:underline"
                    >
                      View my reservations &rarr;
                    </Link>
                  </div>
                ) : needsLogin ? (
                  <p className="text-sm">
                    <Link href="/login" className="text-blue-900 dark:text-blue-400 hover:underline">
                      Log in
                    </Link>{" "}
                    to reserve this vehicle.
                  </p>
                ) : (
                  <form onSubmit={handleReserve} className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label htmlFor="startDate" className="block text-sm text-zinc-500 mb-1">
                          Start date
                        </label>
                        <input
                          id="startDate"
                          type="date"
                          required
                          min={todayISO()}
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-black dark:text-zinc-50"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="endDate" className="block text-sm text-zinc-500 mb-1">
                          End date
                        </label>
                        <input
                          id="endDate"
                          type="date"
                          required
                          min={startDate}
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-black dark:text-zinc-50"
                        />
                      </div>
                    </div>

                    {estimatedTotal > 0 && (
                      <p className="text-sm text-zinc-500">
                        {days} day{days > 1 ? "s" : ""} &middot; Estimated total:{" "}
                        <span className="font-medium text-black dark:text-zinc-50">
                          {formatRupiah(estimatedTotal)}
                        </span>
                      </p>
                    )}

                    {reserveError && <p className="text-red-600 text-sm">{reserveError}</p>}

                    <button
                      type="submit"
                      disabled={availableUnits === 0 || isReserving}
                      className="w-full py-3 rounded bg-blue-900 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800"
                    >
                      {availableUnits === 0
                        ? "Sold out"
                        : isReserving
                          ? "Reserving…"
                          : "Reserve now"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
