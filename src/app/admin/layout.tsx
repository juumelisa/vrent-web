"use client";

import HeaderAdmin from "@/components/HeaderAdmin";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="w-full h-full flex transition-all duration-300">
      <Sidebar />
      <div className="w-full">
        <HeaderAdmin />
        <div>{children}</div>
      </div>
    </div>
  );
}
