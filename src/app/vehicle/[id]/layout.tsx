import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Details",
};

export default function VehicleDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
