"use client";
import Image from "next/image";
import { fetchWithToken } from "../../../lib/fetchWithToken";
import { useEffect, useState } from "react";

import serverError from "../../assets/images/server-error.png";
import noData from "../../assets/images/no-data.png";
import Button from "@/components/Button";

export default function Home() {
const [isLoadVehicle, setIsLoadVehicle] = useState(true)
  const [isError, setIsError] = useState(false)
  const [showVehicle, setShowVehicle] = useState(false)
  const [offset, setOffset] = useState('0')
  const [canFetchMore, setCanFetchMore] = useState(false)
  const vehicleObj = {
    id: 1,
    brand: '',
    model: '',
    images: [],
    city: '',
    province: '',
    rentPrice: 0
  }
  const [vehicleList, setVehicleList] = useState([vehicleObj])
  
  useEffect(() => {
    fetchVehicle()
  }, []);
    
    
  const fetchVehicle = async (offset = '0') => {
    const query: Record<string,string> = {
      order: 'createdAt',
      sort: 'desc',
      limit: '4',
      offset
    }
    const params = new URLSearchParams(query);
    const data = await fetchWithToken(`/api/vehicle/list?${params}`);
    const rest = await data.json()
    if (rest.code === 200) {
      const total = rest.total
      const result = rest.result
      let newList = []
      if (offset === '0') {
        newList = result
      } else {
        newList = [...vehicleList,...result]
      }
      if (newList.length < total) {
        setCanFetchMore(true)
      } else {
        setCanFetchMore(false)
      }
      console.log(newList)
      setVehicleList(newList)
      setIsLoadVehicle(false)
      setShowVehicle(true)
    } else {
      setIsLoadVehicle(false)
      setIsError(true)
    }
  }
  
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };
  const getMorePage = () => {
    console.log('get more')
    const oldOffset = parseInt(offset)
    const newOffset = String(oldOffset + 4)
    setOffset(newOffset)
    fetchVehicle(newOffset)
  }
  return (
    <div className="bg-white text-lg">
      <div>
        {isLoadVehicle && <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-5 md:py-10 gap-5">
            <div className="w-full">
              <div className="w-full h-60 animate-pulse bg-gray-200" />
              <div className="w-full max-w-80 h-5 animate-pulse bg-gray-200 mt-2" />
              <div className="w-20 h-5 animate-pulse bg-gray-200 mt-2" />
            </div>
            <div className="w-full">
              <div className="w-full h-60 animate-pulse bg-gray-200" />
              <div className="w-full max-w-80 h-5 animate-pulse bg-gray-200 mt-2" />
              <div className="w-20 h-5 animate-pulse bg-gray-200 mt-2" />
            </div>
            <div className="w-full">
              <div className="w-full h-60 animate-pulse bg-gray-200" />
              <div className="w-full max-w-80 h-5 animate-pulse bg-gray-200 mt-2" />
              <div className="w-20 h-5 animate-pulse bg-gray-200 mt-2" />
            </div>
            <div className="w-full">
              <div className="w-full h-60 animate-pulse bg-gray-200" />
              <div className="w-full max-w-80 h-5 animate-pulse bg-gray-200 mt-2" />
              <div className="w-20 h-5 animate-pulse bg-gray-200 mt-2" />
            </div>
          </div>}
          {isError && <div className="w-full h-full flex flex-col justify-center items-center mt-20">
            <Image src={serverError} alt="server error" className="w-full max-w-96"/>
            <div className="mt-2 flex flex-col justify-center items-center">
              <p className="text-xl text-red-600">Oops... something went wrong</p>
              <p>{`We'll fix it soon`}</p>
            </div>
          </div>}
          {showVehicle && <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-5 md:py-10 gap-5">
            {vehicleList.map(vehicle => (
              <div key={vehicle.id} className="w-full">
                <div className="h-60 relative">
                  {vehicle.images.length &&
                  <Image
                    src={vehicle.images[0]}
                    alt={`${vehicle.brand} ${vehicle.model} ${vehicle.city}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />}
                  {!vehicle.images.length && <Image src={noData} alt="no image found" />}
                </div>
                <div className="mt-1">
                  <p className="font-bold text-2xl">{formatRupiah(vehicle.rentPrice)}/day</p>
                  <p className="font-bold capitalize">{vehicle.brand} {vehicle.model}</p>
                  <p>{vehicle.city}, {vehicle.province}</p>
                </div>
              </div>
            ))}
          </div>}
          {canFetchMore && showVehicle && <div className="w-full flex justify-center">
            <Button onClick={getMorePage}>Show More</Button>
          </div>}
      </div>
    </div>
  );
}
