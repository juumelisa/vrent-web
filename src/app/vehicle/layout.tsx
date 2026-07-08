import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicles",
};

export default function VehicleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
