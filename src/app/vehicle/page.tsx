"use client";
import Image from "next/image";
import { fetchWithToken } from "../../../lib/fetchWithToken";
import { useEffect, useState } from "react";

import serverError from "../../assets/images/server-error.png";
import noData from "../../assets/images/no-data.png";
import Button from "@/components/Button";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";
import Select from "@/components/Select";
import { useRouter, useSearchParams } from "next/navigation";

type vehicleObj = {
  id: string,
  brand: string,
  model: string,
  images: string[],
  city: string,
  province: string,
  rentPrice: 0
}

export default function Vehicle() {
  const tempVehicleList: vehicleObj[] = []
  const router = useRouter();
  const searchParams = useSearchParams();
  const vehicleType: string[] = [
    "all",
    "car",
    "motorbike",
    "minivan"
  ]
  const queryTemp: Record<string,string> = {
    order: "createdAt",
    sort: "desc",
    limit: "20",
    offset: "0",
    type: "all"
  }
  const [isLoadVehicle, setIsLoadVehicle] = useState(true)
  const [isError, setIsError] = useState(false)
  const [showVehicle, setShowVehicle] = useState(false)
  const [canFetchMore, setCanFetchMore] = useState(false)
  const [totalData, setTotalData] = useState(0)
  const [emptyList, setEmptyList] = useState(false)
  const [totalShowedData, setTotalShowedData] = useState(0)
  const [query, setQuery] = useState(queryTemp)
  
  const [vehicleList, setVehicleList] = useState(tempVehicleList)
  
  useEffect(() => {
    const params: Record<string,string> = {}
    Object.keys(query).forEach(key => {
      const value = searchParams?.get(key) ?? '';
      if (value) {
        params[key] = value
      } else {
        params[key] = query[key]
      }
    })
    setQuery(params)
    fetchVehicle(params)
  }, []);
    
    
  const fetchVehicle = async (query: Record<string,string>) => {
    setIsLoadVehicle(true)
    const queries: Record<string, string> = {}
    Object.keys(query).forEach(key => {
      if (key !== "type" || (vehicleType.includes(query[key]) && query[key] !== "all")) {
        queries[key] = query[key]
      }
    })
    setQuery(queries)
    const params = new URLSearchParams(queries);
    const data = await fetchWithToken(`/api/vehicle/list?${params}`);
    const rest = await data.json()
    if (rest.code === 200) {
      const total = rest.total
      const result = rest.result
      let newList = []
      if (queries.offset === "0") {
        newList = result
      } else {
        newList = [...vehicleList,...result]
      }
      setTotalData(total)
      setTotalShowedData(newList.length)
      if (newList.length < total) {
        setCanFetchMore(true)
      } else {
        setCanFetchMore(false)
      }
      setVehicleList(newList)
      setIsLoadVehicle(false)
      if (newList.length) {
        setShowVehicle(true)
        setEmptyList(false)
      } else {
        setEmptyList(true)
      }
    } else {
      setIsLoadVehicle(false)
      setIsError(true)
    }
  }
  
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(value);
  };

  const getMorePage = () => {
    setIsLoadVehicle(true)
    const newOffset = parseInt(query.offset) + 20
    const newQuery = {...query, offset: `${newOffset}`}
    setQuery(newQuery)
    fetchVehicle(newQuery)
  }

  const handleTypeChange = (d: string) => {
    if (d !== query.type) {
      const newQuery = {...query, type: d, offset: "0"}
      const queryParams = newQuery ? newQuery : {}
      const params = new URLSearchParams(queryParams);
      router.push(`?${params.toString()}`);
      setVehicleList([])
      setQuery(newQuery)
      fetchVehicle(newQuery)
    }
  }

  const resetFilter = () => {
    setQuery(queryTemp)
    setEmptyList(false)
    fetchVehicle(queryTemp)
  }
  return (
    <div className="bg-white py-10">
      <div className="flex flex-col lg:flex-row gap-5 justify-start items-start">
        <div className="w-full lg:w-1/5">
          <p className="font-bold">Filter</p>
          {!isLoadVehicle && <div className="bg-gray-50 p-3 mt-3 grid grid-cols-1 gap-5">
            <div>
              <p className="font-bold">Type</p>
              <Select
                data={vehicleType}
                selectedData={query.type}
                customOptionClass={null}
                customSelectClass={null}
                placeholder="Vehicle type"
                onChange={(d) => handleTypeChange(d)}
              />
            </div>
            <div>
              <p className="font-bold">Location</p>
            </div>
          </div>}
          {isLoadVehicle && <div className="bg-gray-50 p-3 mt-3 grid grid-cols-1 gap-5">
            <div>
              <div className=" w-12 h-5 animate-pulse bg-gray-200" />
              <div className=" w-full h-8 animate-pulse bg-gray-200 mt-2" />
            </div>
            <div>
              <div className=" w-12 h-5 animate-pulse bg-gray-200" />
              <div className=" w-full h-8 animate-pulse bg-gray-200 mt-2" />
            </div>
          </div>}
        </div>
        <div className="w-full lg:w-4/5">
          {showVehicle && <div className="w-full flex justify-between mb-3">
            <p>Showing {totalShowedData} from {totalData} vehicles</p>
            <div>
              <p>Sort by:</p>
            </div>
          </div>}
          {emptyList && <div className="w-full h-full flex flex-col justify-center">
            <div className="relative w-80 h-80 mx-auto">
              <Image src="/images/no-data.png" fill style={{objectFit: 'cover'}} alt="no data found"/>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-lg">Oops...</p>
              <p>{`We couldn't find the data you're looking for`}</p>
              <div className="w-full max-w-52 mt-5">
                <Button onClick={resetFilter}>Reset filter</Button>
              </div>
            </div>
          </div>}
          {showVehicle && <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {vehicleList.map(vehicle => (
              <Link href={`/vehicle/${vehicle.id}`} key={vehicle.id} className="w-full">
                <div className="h-40 relative">
                  <Image
                    src={vehicle.images[0]}
                    alt={`${vehicle.brand} ${vehicle.model} ${vehicle.city}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {!vehicle.images.length && <Image src={noData} alt="no image found" />}
                </div>
                <div className="mt-1">
                  <p className="capitalize">{vehicle.brand} {vehicle.model}</p>
                  <p className="font-bold text-lg">{formatRupiah(vehicle.rentPrice)}/day</p>
                  <div className="flex items-center gap-1 text-blue-900">
                    <IoLocationSharp size={18} />
                    <p>{vehicle.city}, {vehicle.province}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>}
          {isLoadVehicle && <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="w-full">
              <div className="w-full h-40 animate-pulse bg-gray-200" />
              <div className="w-full max-w-80 h-5 animate-pulse bg-gray-200 mt-2" />
              <div className="w-20 h-5 animate-pulse bg-gray-200 mt-2" />
            </div>
            <div className="w-full">
              <div className="w-full h-40 animate-pulse bg-gray-200" />
              <div className="w-full max-w-80 h-5 animate-pulse bg-gray-200 mt-2" />
              <div className="w-20 h-5 animate-pulse bg-gray-200 mt-2" />
            </div>
            <div className="w-full">
              <div className="w-full h-40 animate-pulse bg-gray-200" />
              <div className="w-full max-w-80 h-5 animate-pulse bg-gray-200 mt-2" />
              <div className="w-20 h-5 animate-pulse bg-gray-200 mt-2" />
            </div>
            <div className="w-full">
              <div className="w-full h-40 animate-pulse bg-gray-200" />
              <div className="w-full max-w-80 h-5 animate-pulse bg-gray-200 mt-2" />
              <div className="w-20 h-5 animate-pulse bg-gray-200 mt-2" />
            </div>
          </div>}
          {isError && <div className="w-full h-full flex flex-col justify-center items-center mt-20">
            <Image src={serverError} alt="server error" className="w-full max-w-96"/>
            <div className="mt-2 flex flex-col justify-center items-center">
              <p className="text-xl text-red-600">Oops... something went wrong</p>
              <p className="text-blue-900">{`We'll fix it soon`}</p>
            </div>
          </div>}
          {canFetchMore && showVehicle && <div className="w-full flex justify-center">
            <Button onClick={getMorePage}>Show More</Button>
          </div>}
        </div>
      </div>
    </div>
  );
}
