"use client";
import { useState, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-blue-50 dark:bg-gray-700' : ''} w-full flex justify-between items-center text-left cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 p-3 rounded`}
      >
        <span>{title}</span>
        {!isOpen && <FaChevronDown />}
        {isOpen && <FaChevronUp />}
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
        }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
