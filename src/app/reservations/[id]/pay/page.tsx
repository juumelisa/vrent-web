"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Reservation = {
  id: string;
  brand: string;
  model: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending_payment" | "confirmed" | "cancelled";
};

type SnapResult = { order_id: string; status_code: string; transaction_status: string };

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks: {
          onSuccess?: (result: SnapResult) => void;
          onPending?: (result: SnapResult) => void;
          onError?: (result: SnapResult) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

const SNAP_SRC =
  process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export default function ReservationPayPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const router = useRouter();

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);

  const [snapToken, setSnapToken] = useState("");
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [payError, setPayError] = useState("");
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const requestedToken = useRef(false);

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

  useEffect(() => {
    if (!reservation || reservation.status !== "pending_payment" || requestedToken.current) return;
    requestedToken.current = true;

    (async () => {
      setIsPreparingPayment(true);
      setPayError("");
      try {
        const res = await fetch(`/api/reservations/${id}/pay`, { method: "POST" });
        const data = await res.json();
        if (!res.ok) {
          setPayError(data.message ?? "Could not start payment for this reservation");
          return;
        }
        setSnapToken(data.snapToken);
      } catch {
        setPayError("Something went wrong. Please try again.");
      } finally {
        setIsPreparingPayment(false);
      }
    })();
  }, [reservation, id]);

  const handlePayNow = () => {
    if (!snapToken || !window.snap) return;
    setIsPaying(true);

    // Midtrans's webhook can't reach a local dev server, so pull the transaction
    // status ourselves right after Snap reports an outcome instead of waiting
    // for /payments/notification.
    const syncAndRedirect = async () => {
      try {
        await fetch(`/api/reservations/${id}/sync-payment`, { method: "POST" });
      } finally {
        router.push(`/reservations/${id}`);
      }
    };

    window.snap.pay(snapToken, {
      onSuccess: syncAndRedirect,
      onPending: syncAndRedirect,
      onError: () => {
        setIsPaying(false);
        setPayError("Payment failed. Please try again.");
      },
      onClose: () => setIsPaying(false),
    });
  };

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <Script src={SNAP_SRC} data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} onReady={() => setIsScriptReady(true)} />

      <main className="w-full max-w-md flex-1 p-6">
        <Link
          href={`/reservations/${id}`}
          className="inline-block mb-6 text-amber-900 dark:text-amber-400 hover:underline"
        >
          &larr; Back to reservation
        </Link>

        {isLoading && (
          <div className="w-full h-40 animate-pulse bg-gray-200 dark:bg-zinc-800" />
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
            <p className="text-amber-900 dark:text-amber-400">{`We'll fix it soon`}</p>
          </div>
        )}

        {!isLoading && !isNotFound && !isError && reservation && (
          <div className="w-full text-black dark:text-zinc-50">
            <h1 className="text-2xl font-semibold mb-6">Complete your payment</h1>

            <div className="rounded border border-zinc-200 dark:border-zinc-800 p-4 mb-6">
              <p className="capitalize font-medium">
                {reservation.brand} {reservation.model}
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                {reservation.startDate} &rarr; {reservation.endDate}
              </p>
              <p className="font-bold text-xl mt-2">{formatRupiah(reservation.totalPrice)}</p>
            </div>

            {reservation.status === "confirmed" && (
              <div className="rounded bg-green-100 text-green-800 p-4">
                <p className="font-medium">This reservation is already paid.</p>
                <Link href={`/reservations/${id}`} className="inline-block mt-2 text-sm hover:underline">
                  View reservation &rarr;
                </Link>
              </div>
            )}

            {reservation.status === "cancelled" && (
              <div className="rounded bg-zinc-100 dark:bg-zinc-900 p-4">
                <p className="font-medium">This reservation has been cancelled.</p>
              </div>
            )}

            {reservation.status === "pending_payment" && (
              <div className="flex flex-col gap-3">
                {payError && <p className="text-red-600 text-sm">{payError}</p>}

                <button
                  onClick={handlePayNow}
                  disabled={!snapToken || !isScriptReady || isPreparingPayment || isPaying}
                  className="w-full py-3 rounded bg-amber-900 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-800"
                >
                  {isPreparingPayment || !isScriptReady
                    ? "Preparing payment…"
                    : isPaying
                      ? "Waiting for payment…"
                      : "Pay now"}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
