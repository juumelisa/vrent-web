"use client";

import HeaderAdmin from "@/components/HeaderAdmin";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="w-full h-full flex transition-all duration-300 overflow-hidden">
      <Sidebar />
      <div className="w-full overflow-y-auto">
        <HeaderAdmin />
        <div className="mt-16">{children}</div>
      </div>
    </div>
  );
}
