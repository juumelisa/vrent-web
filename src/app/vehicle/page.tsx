"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  locationId: string;
};

type Location = {
  id: string;
  name: string;
  city: string;
};

const PAGE_LIMIT = 20;

const VEHICLE_TYPES = [
  "sedan",
  "suv",
  "hatchback",
  "mpv",
  "van",
  "pickup",
  "jeep",
  "electric",
  "luxury sedan",
  "motorcycle",
];

function LocationPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-3.5 w-3.5 shrink-0"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

function VehicleListContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const pageRef = useRef(1);
  const totalPagesRef = useRef(1);
  const isLoadingMoreRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  // Bumped on every new filter so a slow, superseded response can't clobber
  // the results of a filter change that happened after it was sent.
  const requestIdRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/locations")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!cancelled) setLocations(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const fetchPage = useCallback(async (pageNum: number, city: string, type: string) => {
    const params = new URLSearchParams({
      page: `${pageNum}`,
      limit: `${PAGE_LIMIT}`,
    });
    if (city) params.set("city", city);
    if (type) params.set("type", type);
    const res = await fetch(`/api/vehicle?${params}`);
    if (!res.ok) throw new Error("request failed");
    const data = await res.json();
    return {
      items: Array.isArray(data.data) ? (data.data as Vehicle[]) : [],
      totalPages: data.pagination?.totalPages ?? 1,
    };
  }, []);

  // The URL query string is the single source of truth for the city/type filters:
  // reading them straight from searchParams (instead of mirroring into state) keeps
  // the filters and the URL in sync in both directions for free.
  const searchParamsString = searchParams.toString();
  const cityFilter = searchParams.get("city") ?? "";
  const typeFilter = searchParams.get("type") ?? "";

  // Fetches page 1 for the given filter and applies the result. Every setState call
  // here happens inside a promise callback (never synchronously), so this is safe to
  // call from the URL-sync effect below as well as from event handlers.
  const fetchFirstPage = useCallback(
    (city: string, type: string) => {
      const requestId = ++requestIdRef.current;
      fetchPage(1, city, type)
        .then(({ items, totalPages }) => {
          if (requestIdRef.current !== requestId) return;
          setVehicles(items);
          setTotalPages(totalPages);
          setPage(1);
          pageRef.current = 1;
          totalPagesRef.current = totalPages;
        })
        .catch(() => {
          if (requestIdRef.current === requestId) setIsError(true);
        })
        .finally(() => {
          if (requestIdRef.current === requestId) setIsLoading(false);
        });
    },
    [fetchPage]
  );

  // Refetches whenever the URL's city/type params change: on mount, when the
  // handlers below push a new URL, or on browser back/forward.
  useEffect(() => {
    fetchFirstPage(searchParams.get("city") ?? "", searchParams.get("type") ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsString]);

  // Pushes the new filter values into the URL. The effect above reacts to that change
  // and performs the actual refetch, so this is the only place callers need to call.
  const updateFilters = useCallback(
    (city: string, type: string) => {
      setIsLoading(true);
      setIsError(false);
      const params = new URLSearchParams(searchParamsString);
      if (city) params.set("city", city);
      else params.delete("city");
      if (type) params.set("type", type);
      else params.delete("type");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParamsString]
  );

  const handleCityChange = (city: string) => updateFilters(city, typeFilter);
  const handleTypeChange = (type: string) => updateFilters(cityFilter, type);
  const clearCityFilter = () => updateFilters("", typeFilter);

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
    const requestId = requestIdRef.current;
    fetchPage(nextPage, cityFilter, typeFilter)
      .then(({ items, totalPages: newTotalPages }) => {
        if (requestIdRef.current !== requestId) return;
        setVehicles((prev) => [...prev, ...items]);
        setTotalPages(newTotalPages);
        setPage(nextPage);
        pageRef.current = nextPage;
        totalPagesRef.current = newTotalPages;
      })
      .catch(() => {
        if (requestIdRef.current === requestId) setIsError(true);
      })
      .finally(() => {
        isLoadingMoreRef.current = false;
        setIsLoadingMore(false);
      });
  }, [fetchPage, cityFilter, typeFilter]);

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

  const cities = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const location of locations) {
      if (seen.has(location.city)) continue;
      seen.add(location.city);
      result.push(location.city);
    }
    return result.sort((a, b) => a.localeCompare(b));
  }, [locations]);

  const locationsById = useMemo(() => {
    const map = new Map<string, Location>();
    for (const location of locations) map.set(location.id, location);
    return map;
  }, [locations]);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-7xl flex-1 p-6">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-6">
          Available Vehicles
        </h1>

        {cityFilter && (
          <div className="mb-6 flex items-center gap-2 text-sm">
            <span className="text-zinc-500">
              Showing vehicles in <span className="font-medium">{cityFilter}</span>
            </span>
            <button
              type="button"
              onClick={clearCityFilter}
              className="text-blue-900 dark:text-blue-400 hover:underline"
            >
              Clear
            </button>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-4">
          <div>
            <label htmlFor="city" className="block text-sm text-zinc-500 mb-1">
              City
            </label>
            <select
              id="city"
              value={cityFilter}
              onChange={(e) => handleCityChange(e.target.value)}
              className="rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-black dark:text-zinc-50"
            >
              <option value="">All cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm text-zinc-500 mb-1">
              Vehicle type
            </label>
            <select
              id="type"
              value={typeFilter}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-black dark:text-zinc-50 capitalize"
            >
              <option value="">All types</option>
              {VEHICLE_TYPES.map((type) => (
                <option key={type} value={type} className="capitalize">
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

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
            {vehicles.map((vehicle) => {
              const location = locationsById.get(vehicle.locationId);
              return (
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
                    {location && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                        <LocationPinIcon />
                        <span className="truncate">
                          {location.name}, {location.city}
                        </span>
                      </p>
                    )}
                    {vehicle.availableUnits === "0" && (
                      <p className="text-red-600 text-sm">Sold out</p>
                    )}
                  </div>
                </Link>
              );
            })}
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

export default function VehicleListPage() {
  return (
    <Suspense fallback={null}>
      <VehicleListContent />
    </Suspense>
  );
}
