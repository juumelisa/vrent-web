"use client";

import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

type SelectProp = {
  onChange: (data: string) => void,
  data: string[],
  selectedData: string
}

export default function Select({data, selectedData, onChange}: SelectProp) {
  const [isOpenOption, setIsOpenOption] = useState(false)

  const handleOption = () => {
    const isOpen = isOpenOption
    setIsOpenOption(!isOpen)
  }
  const handleSelect = (data: string) => {
    onChange(data)
    setIsOpenOption(false)
  }
  return (
    <div className="w-full relative mt-2">
      <button onClick={handleOption} className="w-full cursor-pointer flex justify-between items-center px-2 py-1 border border-gray-300 rounded">
        {!selectedData && <p>Select type</p>}
        {selectedData && <p className="capitalize">{selectedData}</p>}
        <IoMdArrowDropdown />
      </button>
      {isOpenOption && <div className="absolute w-full bg-white border border-gray-300 rounded mt-1">
        <div className="w-full flex flex-col">
          {data.map(d => (
            <button onClick={() => handleSelect(d)} key={d} className="w-full cursor-pointer text-left px-3 py-1 capitalize">{d}</button>
          ))}
        </div>
      </div>}
    </div>
  );
}
