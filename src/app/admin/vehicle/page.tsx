"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Vehicle - VRent";
  }, []);
  return (
    <div className="p-10 bg-[--color-bg] dark:bg-[--color-bg-dark]">
      <h1 className="text-4xl">Dark Mode Test</h1>
    </div>
  );
}
