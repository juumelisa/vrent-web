// Select.tsx
import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdCloseCircle } from "react-icons/io";

type Option = {
  key: string;
  value: string;
};

type SelectProps = {
  options: Option[] | string[];
  value?: Option | string;
  label?: string;
  search?: boolean;
  placeholder?: string;
  onChange: (value: string | null, key: string | null) => void;
  onSearch?: (search: string) => void;
};

export default function Select({
  options,
  value,
  placeholder = "Select...",
  label,
  search,
  onChange,
  onSearch = () => {}
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const getKey = (option: Option | string) => {
    if (typeof option === 'string') {
      return option
    } else {
      return option.key
    }
  }
  const getValue = (option: Option | string) => {
    if (typeof option === 'string') {
      return option
    } else {
      return option.value
    }
  }
  const searchFunction = async (value: string) => {
    setOnLoad(true)
    await onSearch(value)
    setOnLoad(false)
  }
  return (
    <div ref={ref} className="relative w-full">
      {label && <span className="block mb-1 capitalize font-semibold">{label}</span>}
      {search && <div>
        {(!value || !getValue(value)) && 
          <input
            onClick={() => setOpen(true)}
            onChange={(e) => searchFunction(e.target.value)}
            placeholder="Search here"
            className="w-full border border-gray-200 dark:border-gray-700 rounded px-3 py-2 outline-0" />
        }
        {(value && getValue(value)) && 
          <button
            onClick={() => {setOpen(true); onChange(null, null)}}
            className="w-full border border-gray-200 dark:border-gray-700 rounded px-3 py-2 flex justify-between items-center capitalize"
          >
            <span>{getValue(value)}</span>
            <IoMdCloseCircle />
          </button>
        }
      </div>}
      {!search && <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full border border-gray-200 dark:border-gray-700 rounded px-3 py-2 flex justify-between items-center capitalize"
      >
        <span>{value ? getValue(value) :placeholder}</span>
        {!open && <IoMdArrowDropdown />}
        {open && <IoMdArrowDropup />}
      </button>}
      {open && (
        <ul className="absolute mt-1 w-full h-auto max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-[#202020] shadow-lg z-10">
          {onLoad && <li className="px-3">
            <div className="h-8 w-full mt-2 bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-full mt-2 bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-full my-2 bg-gray-200 animate-pulse"></div>
          </li>}
          {!onLoad && options.map((opt) => (
            <li
              key={getKey(opt)}
            >
              <button
                onClick={() => {
                  onChange(getValue(opt), getKey(opt));
                  setOpen(false);
                }}
                disabled={value && getKey(opt) === getKey(value) ? true : false}
                className={`w-full text-left px-3 py-2 cursor-pointer capitalize hover:bg-blue-50 dark:hover:bg-gray-500 disabled:cursor-default
                  ${ value && getKey(opt) === getKey(value) ? 
                   "bg-blue-100 disabled:hover:bg-blue-100 dark:bg-gray-700 dark:disabled:hover:bg-gray-700" : ""
                }`}>
                {getValue(opt)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
