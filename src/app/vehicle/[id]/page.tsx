"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export default function VehicleDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

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

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-4xl flex-1 py-16 px-6">
        <Link
          href="/"
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
                {isReserved ? (
                  <p className="w-full text-center py-3 rounded bg-green-100 text-green-800">
                    Reservation request sent! We&apos;ll contact you shortly.
                  </p>
                ) : (
                  <button
                    onClick={() => setIsReserved(true)}
                    disabled={availableUnits === 0}
                    className="w-full py-3 rounded bg-blue-900 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800"
                  >
                    {availableUnits === 0 ? "Sold out" : "Reserve now"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
