import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservation Details",
};

export default function ReservationDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
