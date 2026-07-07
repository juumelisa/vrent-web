"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Vehicle = {
  id: string;
  type: string;
  brand: string;
  model: string;
  imageUrl: string;
  pricePerDay: number;
  seats: number;
  transmission: string;
  availableUnits: string;
};

const PAGE_LIMIT = 20;

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const pageRef = useRef(1);
  const totalPagesRef = useRef(1);
  const isLoadingMoreRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchPage = useCallback(async (pageNum: number) => {
    const params = new URLSearchParams({
      page: `${pageNum}`,
      limit: `${PAGE_LIMIT}`,
    });
    const res = await fetch(`/api/vehicle?${params}`);
    if (!res.ok) throw new Error("request failed");
    const data = await res.json();
    return {
      items: Array.isArray(data.data) ? (data.data as Vehicle[]) : [],
      totalPages: data.pagination?.totalPages ?? 1,
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchPage(1)
      .then(({ items, totalPages }) => {
        if (cancelled) return;
        setVehicles(items);
        setTotalPages(totalPages);
        setPage(1);
        pageRef.current = 1;
        totalPagesRef.current = totalPages;
      })
      .catch(() => {
        if (!cancelled) setIsError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fetchPage]);

  const hasMore = page < totalPages;

  // Reads page/totalPages from refs (not the `page` state closure) and uses a
  // synchronous ref lock so a duplicate fetch can't slip in if Strict Mode's
  // mount->cleanup->remount races an async IntersectionObserver callback.
  const loadMore = useCallback(() => {
    if (isLoadingMoreRef.current) return;
    if (pageRef.current >= totalPagesRef.current) return;
    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);
    const nextPage = pageRef.current + 1;
    fetchPage(nextPage)
      .then(({ items, totalPages: newTotalPages }) => {
        setVehicles((prev) => [...prev, ...items]);
        setTotalPages(newTotalPages);
        setPage(nextPage);
        pageRef.current = nextPage;
        totalPagesRef.current = newTotalPages;
      })
      .catch(() => setIsError(true))
      .finally(() => {
        isLoadingMoreRef.current = false;
        setIsLoadingMore(false);
      });
  }, [fetchPage]);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) loadMore();
        },
        { rootMargin: "200px" }
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [loadMore]
  );

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-6xl flex-1 py-16 px-6">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-6">
          Available Vehicles
        </h1>

        {isLoading && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full">
                <div className="w-full h-40 animate-pulse bg-gray-200 dark:bg-zinc-800" />
                <div className="w-full max-w-80 h-5 animate-pulse bg-gray-200 dark:bg-zinc-800 mt-2" />
                <div className="w-20 h-5 animate-pulse bg-gray-200 dark:bg-zinc-800 mt-2" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <p className="text-xl text-red-600">Oops... something went wrong</p>
            <p className="text-blue-900 dark:text-blue-400">{`We'll fix it soon`}</p>
          </div>
        )}

        {!isLoading && !isError && vehicles.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <p className="text-lg">No vehicles available right now</p>
          </div>
        )}

        {!isLoading && !isError && vehicles.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {vehicles.map((vehicle) => (
              <Link href={`/vehicle/${vehicle.id}`} key={vehicle.id} className="w-full">
                <div className="h-40 relative bg-gray-100 dark:bg-zinc-900">
                  {vehicle.imageUrl && (
                    <Image
                      src={vehicle.imageUrl}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="mt-1 text-black dark:text-zinc-50">
                  <p className="capitalize">
                    {vehicle.brand} {vehicle.model}
                  </p>
                  <p className="font-bold text-lg">{formatRupiah(vehicle.pricePerDay)}/day</p>
                  <p className="text-blue-900 dark:text-blue-400 capitalize">
                    {vehicle.type} &middot; {vehicle.seats} seats &middot; {vehicle.transmission}
                  </p>
                  {vehicle.availableUnits === "0" && (
                    <p className="text-red-600 text-sm">Sold out</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && !isError && hasMore && (
          <div ref={sentinelRef} className="w-full flex justify-center py-8">
            {isLoadingMore && (
              <p className="text-sm text-zinc-500">Loading more vehicles…</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
