"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

type SelectProp = {
  onChange: (data: string) => void,
  data: string[],
  selectedData: string,
  customSelectClass: string | null,
  customOptionClass: string | null,
  placeholder: string,
  isOptionLoad: boolean,
  includeSearch: boolean | null,
  searchPlaceholder: string | null,
  onSearchFunction: null | ((data: string) => void)
}

export default function Select(
  {
    data,
    selectedData,
    onChange,
    customSelectClass,
    customOptionClass,
    placeholder,
    isOptionLoad,
    includeSearch,
    searchPlaceholder,
    onSearchFunction
  }: SelectProp) {
  const ref = useRef<HTMLDivElement>(null)
  const [isOpenOption, setIsOpenOption] = useState(false)

  const handleOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const isOpen = isOpenOption
    setIsOpenOption(!isOpen)
    if (onSearchFunction && isOpen) {
      onSearchFunction("")
    }
  }
  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>, data: string) => {
    e.preventDefault()
    onChange(data)
    setIsOpenOption(false)
    if (onSearchFunction) {
      onSearchFunction("")
    }
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const text = e.target.value
    if (onSearchFunction && text) {
      onSearchFunction(text)
    }
  }
  if (!customSelectClass) {
    customSelectClass = "px-2 py-1 border border-gray-300 rounded"
  }
  if (!customOptionClass) {
    customOptionClass = "bg-white border border-gray-300 rounded"
  }
  if (!searchPlaceholder) {
    searchPlaceholder = "Search here"
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpenOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="w-full relative" ref={ref}>
      <button onClick={handleOption} className={`w-full cursor-pointer flex justify-between items-center ${customSelectClass}`}>
        {!selectedData && <p className="text-gray-500">{placeholder}</p>}
        {selectedData && <p className="capitalize">{selectedData}</p>}
        <IoMdArrowDropdown />
      </button>
      {isOpenOption && <div className={`absolute z-30 w-full mt-1 ${customOptionClass}`}>
        <div className="w-full flex flex-col h-full max-h-60 overflow-y-auto">
          {includeSearch && <div className="py-2 px-3">
            <input
              className="w-full p-2 rounded border border-gray-300 outline-0"
              placeholder={searchPlaceholder}
              onChange={handleSearch}
            />
          </div>}
          {isOptionLoad && <div className="flex flex-col gap-3 px-3 py-2">
            <div className="w-full bg-gray-400 animate-pulse h-6" />
            <div className="w-full bg-gray-400 animate-pulse h-6" />
            <div className="w-full bg-gray-400 animate-pulse h-6" />
            <div className="w-full bg-gray-400 animate-pulse h-6" />
          </div>}
          {data.map(d => (
            <button
              type="button"
              onClick={(e) => handleSelect(e, d)}
              key={d}
              className={clsx(
                "w-full cursor-pointer text-left px-3 py-2 capitalize",
                selectedData === d ? "bg-blue-900/10" : ""
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>}
    </div>
  );
}
