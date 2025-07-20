"use client";

import moment from "moment";
import React from "react";
// import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

type Prop = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  selectedData: string | null,
  minDate: string | null,
  customSelectClass: string,
  placeholder: string
}

export default function Calendar({ onChange, selectedData, minDate, customSelectClass, placeholder }: Prop) {

  if (!customSelectClass) {
    customSelectClass = "px-2 py-1 border border-gray-300 rounded"
  }
  const changeDateFormat = (date: string) => {
    return moment(date).format('ddd, MMM Do YYYY')
  }

  return (
    <div className="w-full relative">
      <div className={`w-full cursor-pointer flex justify-between items-center ${customSelectClass}`}>
        {!selectedData && <p className="text-gray-500">{placeholder}</p>}
        {selectedData && <p className="capitalize">{changeDateFormat(selectedData)}</p>}
        <IoMdArrowDropdown />
      </div>
      <div  className="absolute top-0 left-0 z-30 w-full h-full">
        <input
          type="date"
          className="w-full h-full opacity-0"
          onChange={(e) => onChange(e)}
          {...(minDate ? { min: changeDateFormat(minDate) } : {})}
        />
      </div>
    </div>
  );
}
