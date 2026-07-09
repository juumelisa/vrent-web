import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay for Reservation",
};

export default function ReservationPayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
