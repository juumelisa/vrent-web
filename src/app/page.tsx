import Image from "next/image";
import Link from "next/link";

type Location = {
  id: string;
  name: string;
  city: string;
  imageUrl: string;
};

type City = {
  name: string;
  imageUrl: string;
};

type Vehicle = {
  id: string;
  type: string;
  brand: string;
  model: string;
  imageUrl: string;
  pricePerDay: number;
};

type Review = {
  name: string;
  location: string;
  rating: number;
  quote: string;
};

const reviews: Review[] = [
  {
    name: "Amelia Putri",
    location: "Jakarta",
    rating: 5,
    quote:
      "Booking was quick and the car was spotless. Pickup and return were both hassle-free.",
  },
  {
    name: "Rangga Saputra",
    location: "Bandung",
    rating: 5,
    quote:
      "Great selection of vehicles and the pricing was exactly what I saw at checkout, no surprises.",
  },
  {
    name: "Dewi Lestari",
    location: "Surabaya",
    rating: 4,
    quote:
      "Smooth experience overall. Customer support responded fast when I had a question about my reservation.",
  },
];

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

async function getCities(): Promise<City[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/locations`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY ?? "",
      },
    });
    if (!response.ok) return [];
    const data: Location[] = await response.json();
    const seen = new Set<string>();
    const cities: City[] = [];
    for (const location of data) {
      if (seen.has(location.city)) continue;
      seen.add(location.city);
      cities.push({ name: location.city, imageUrl: location.imageUrl });
    }
    return cities;
  } catch {
    return [];
  }
}

async function getVehicles(): Promise<Vehicle[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/vehicles?limit=10`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY ?? "",
      },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data.data) ? (data.data as Vehicle[]) : [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const [cities, vehicles] = await Promise.all([getCities(), getVehicles()]);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <section className="relative w-full h-screen">
        <Image
          src="/banner.jpg"
          alt="Sports car driving down a scenic road at sunset"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Find your next ride
          </h1>
          <p className="mt-4 text-lg md:text-xl text-zinc-100 max-w-2xl">
            Rent the perfect vehicle for your next trip, from everyday cars to
            something a little more exciting.
          </p>
          <Link
            href="/vehicle"
            className="mt-8 inline-block rounded bg-amber-900 px-8 py-3 text-white font-medium hover:bg-amber-800"
          >
            Browse vehicles
          </Link>
        </div>
      </section>

      <main className="w-full max-w-7xl flex-1 p-6 text-center">
        {cities.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 text-left">
              Available in these cities
            </h2>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {cities.map((city) => (
                <Link
                  href={`/vehicle?city=${encodeURIComponent(city.name)}`}
                  key={city.name}
                  className="relative h-40 block overflow-hidden rounded border border-zinc-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900"
                >
                  <Image
                    src={city.imageUrl}
                    alt={city.name}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-amber-900/30" />
                  <p className="absolute inset-0 flex items-center justify-center font-bold text-white text-3xl drop-shadow">
                    {city.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
        {vehicles.length > 0 && (
          <div className="mb-16 text-left">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
                Vehicles
              </h2>
              <Link
                href="/vehicle"
                className="text-sm text-amber-900 dark:text-amber-400 hover:underline"
              >
                See more &rarr;
              </Link>
            </div>
            <div className="mt-8 flex gap-5 overflow-x-auto pb-2 px-6 snap-x snap-mandatory">
              {vehicles.map((vehicle) => (
                <Link
                  href={`/vehicle/${vehicle.id}`}
                  key={vehicle.id}
                  className="w-56 shrink-0 snap-start"
                >
                  <div className="h-40 relative bg-gray-100 dark:bg-zinc-900">
                    {vehicle.imageUrl && (
                      <Image
                        src={vehicle.imageUrl}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        fill
                        sizes="224px"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className="mt-1 text-black dark:text-zinc-50">
                    <p className="capitalize truncate">
                      {vehicle.brand} {vehicle.model}
                    </p>
                    <p className="font-bold">{formatRupiah(vehicle.pricePerDay)}/day</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 text-left">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            What our customers say
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
              >
                <div
                  aria-label={`${review.rating} out of 5 stars`}
                  className="text-amber-500"
                >
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="mt-4 font-medium text-black dark:text-zinc-50">
                  {review.name}
                </p>
                <p className="text-sm text-zinc-500">{review.location}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
