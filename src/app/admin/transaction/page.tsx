"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Transaction - VRent";
  }, []);
  return (
    <div className="p-10 bg-[--color-bg] dark:bg-[--color-bg-dark]">
      <h1 className="text-4xl">Transaction</h1>
    </div>
  );
}
