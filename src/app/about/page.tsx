import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

type Value = {
  title: string;
  description: string;
};

const values: Value[] = [
  {
    title: "Reliability",
    description:
      "Every vehicle in our fleet is inspected and maintained so you can hit the road with confidence.",
  },
  {
    title: "Transparency",
    description:
      "The price you see at checkout is the price you pay, no hidden fees or last-minute surprises.",
  },
  {
    title: "Local expertise",
    description:
      "Our partners are based in the cities we serve, so pickup, return, and support always feel personal.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl flex-1 py-16 px-6">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
          About VRent
        </h1>
        <p className="text-sm text-zinc-500 mb-8">
          We help people find and book the right vehicle for wherever
          they&apos;re headed next.
        </p>

        <div className="text-sm text-zinc-600 dark:text-zinc-300 space-y-4">
          <p>
            VRent started with a simple idea: renting a car shouldn&apos;t be
            complicated. We built a platform that connects renters with a
            wide range of vehicles across multiple cities, backed by clear
            pricing and a booking flow that takes minutes, not hours.
          </p>
          <p>
            Today, we work with trusted local partners to offer everything
            from everyday city cars to vehicles for those special trips,
            all bookable online with instant confirmation.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
            What we care about
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
              >
                <p className="font-medium text-black dark:text-zinc-50">
                  {value.title}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
