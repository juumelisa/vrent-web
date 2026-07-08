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

export default async function Home() {
  const cities = await getCities();

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
            className="mt-8 inline-block rounded bg-blue-900 px-8 py-3 text-white font-medium hover:bg-blue-800"
          >
            Browse vehicles
          </Link>
        </div>
      </section>

      <main className="w-full max-w-6xl flex-1 py-16 px-6 text-center">
        {cities.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
              Available in these cities
            </h2>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {cities.map((city) => (
                <div
                  key={city.name}
                  className="relative h-32 overflow-hidden rounded border border-zinc-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900"
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
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Why VRent?
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="font-medium text-black dark:text-zinc-50">
              Wide selection
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              Choose from a wide range of vehicles across multiple locations.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-black dark:text-zinc-50">
              Simple booking
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              Reserve a vehicle in just a few clicks, no hassle.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-black dark:text-zinc-50">
              Transparent pricing
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              See the total price up front, with no hidden fees.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
