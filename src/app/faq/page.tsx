import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

type Faq = {
  id: string;
  question: string;
  answer: string;
};

async function getFaqs(): Promise<Faq[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/faqs`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY ?? "",
      },
    });
    if (!response.ok) return [];
    const data: Faq[] = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl flex-1 py-16 px-6">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
          Frequently asked questions
        </h1>
        <p className="text-sm text-zinc-500 mb-8">
          Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll be happy to help.
        </p>

        {faqs.length === 0 ? (
          <p className="text-sm text-zinc-500">No FAQs available right now.</p>
        ) : (
          <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800 border-t border-b border-zinc-200 dark:border-zinc-800">
            {faqs.map((faq) => (
              <details key={faq.id} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-black dark:text-zinc-50">
                  {faq.question}
                  <span className="shrink-0 text-zinc-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
