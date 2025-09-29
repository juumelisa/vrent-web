"use client";

import { fetchWithToken } from "@/app/lib/fetchWithToken";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Vehicle - VRent";
    fetchVehicle()
  }, []);

  const fetchVehicle = async () => {
    // setIsLoadVehicle(true)
    // const queries: Record<string, string> = {}
    // Object.keys(query).forEach(key => {
    //   if (key !== "type" || (vehicleType.includes(query[key]) && query[key] !== "all")) {
    //     queries[key] = query[key]
    //   }
    // })
    // setQuery(queries)
    // const params = new URLSearchParams(queries);
    const data = await fetchWithToken(`/api/vehicle/list`);
    const rest = await data.json()
    if (rest.code === 200) {
      // const total = rest.total
      const result = rest.result
      console.log(result)
      // let newList = []
      // if (queries.offset === "0") {
      //   newList = result
      // } else {
      //   newList = [...vehicleList,...result]
      // }
      // setTotalData(total)
      // setTotalShowedData(newList.length)
      // if (newList.length < total) {
      //   setCanFetchMore(true)
      // } else {
      //   setCanFetchMore(false)
      // }
      // setVehicleList(newList)
      // setIsLoadVehicle(false)
      // if (newList.length) {
      //   setShowVehicle(true)
      //   setEmptyList(false)
      // } else {
      //   setEmptyList(true)
      // }
    } else {
      // setIsLoadVehicle(false)
      // setIsError(true)
    }
  }
    
  return (
    <div className="p-10 bg-[--color-bg] dark:bg-[--color-bg-dark]">
      <h1 className="text-4xl">Dark Mode Test</h1>
    </div>
  );
}
