import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Reservations",
};

export default function ReservationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
