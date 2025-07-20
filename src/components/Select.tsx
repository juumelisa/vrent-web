"use client";

import clsx from "clsx";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

type SelectProp = {
  onChange: (data: string) => void,
  data: string[],
  selectedData: string,
  customSelectClass: string,
  customOptionClass: string | null,
  placeholder: string
}

export default function Select(
  {
    data,
    selectedData,
    onChange,
    customSelectClass,
    customOptionClass,
    placeholder
  }: SelectProp) {
  const [isOpenOption, setIsOpenOption] = useState(false)

  const handleOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const isOpen = isOpenOption
    setIsOpenOption(!isOpen)
  }
  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>, data: string) => {
    e.preventDefault()
    onChange(data)
    setIsOpenOption(false)
  }
  if (!customSelectClass) {
    customSelectClass = "px-2 py-1 border border-gray-300 rounded"
  }
  if (!customOptionClass) {
    customOptionClass = "bg-white border border-gray-300 rounded"
  }
  return (
    <div className="w-full relative">
      <button onClick={handleOption} className={`w-full cursor-pointer flex justify-between items-center ${customSelectClass}`}>
        {!selectedData && <p className="text-gray-500">{placeholder}</p>}
        {selectedData && <p className="capitalize">{selectedData}</p>}
        <IoMdArrowDropdown />
      </button>
      {isOpenOption && <div className={`absolute z-30 w-full mt-1 ${customOptionClass}`}>
        <div className="w-full flex flex-col">
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
