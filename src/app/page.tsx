"use client";
import Image from "next/image";
import Footer from "@/components/Footer";
import backgroundImage from "../assets/images/background-image.png"
import edwardNewGate from "../assets/images/edward-newgate.png"
import rose from "../assets/images/rose.jpg"
import michael from "../assets/images/michael.jpg"
import jonas from "../assets/images/jonas.jpg"
import serverError from "../assets/images/server-error.png"
import noData from "../assets/images/no-data.png"
import { fetchWithToken } from "../../lib/fetchWithToken";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isLoadVehicle, setIsLoadVehicle] = useState(true)
  const [isError, setIsError] = useState(false)
  const [showVehicle, setShowVehicle] = useState(false)

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
  
  
  const fetchVehicle = async () => {
    const query: Record<string,string> = {
      order: 'createdAt',
      sort: 'desc',
      limit: '8',
      offset: '0'
    }
    const params = new URLSearchParams(query);
    const data = await fetchWithToken(`/api/vehicle/list?${params}`);
    const rest = await data.json()
    if (rest.code === 200) {
      const result = rest.result
      setVehicleList(result)
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
  return (
    <div className="absolute bg-white text-lg text-black left-0 top-0">
      <div className="relative z-10 h-screen">
        <Image src={backgroundImage} alt="background image z-10" fill style={{objectFit: 'cover'}}/>
        <div className="bg-blue-900 opacity-70 h-full w-full absolute top-0" />
        <div className="absolute top-0 w-full h-full">
          <div className="w-full lg:w-[580px] h-full flex flex-col justify-center p-5 md:p-10 xl:p-20 text-white">
            <h1 className="font-bold text-6xl leading-20">Explore and Travel</h1>
            <div className="w-full">
              <p className="font-bold text-xl my-6">Vehicle Finder</p>
              <div className="border-t w-12" />
              <div className="mt-10">
                <form className="grid gap-3 md:gap-5 text-black">
                  <input name="type" placeholder="type" className="w-full py-2 px-3 bg-blue-100/90 rounded outline-0" />
                  <div className="flex flex-row gap-3">
                    <input name="location" placeholder="location" className="w-full py-2 px-3 bg-blue-100/90 rounded outline-0" />
                    <input name="date" placeholder="date" className="w-full py-2 px-3 bg-blue-100/90 rounded outline-0" />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white py-2 font-bold rounded cursor-pointer">Search</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-5 md:p-10 xl:p-20">
        <div>
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <h2 className="font-bold text-3xl">Vehicles</h2>
            <Link href="/vehicle">View more</Link>
          </div>
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
        </div>
        <div className="mt-10 xl:mt-20">
          <h2 className="font-bold text-3xl">Testimonials</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-5 md:py-10 gap-5">
            <div className="border border-gray-100 rounded-md p-5 flex flex-col justify-start items-center text-left gap-3">
              <Image src={edwardNewGate} alt="background image z-10" className="w-40 h-40 object-cover rounded-full" />
              <p>⭐️⭐️⭐️⭐️⭐️</p>
              <p className="font-bold">Edward, Germany</p>
              <p>{`"It was the right decision to rent vehicle here, I spent less money and enjoy the trip. It was an amazing experience to have a ride for wildlife trip!"`}</p>
            </div>
            <div className="border border-gray-100 rounded-md p-5 flex flex-col justify-start items-center text-left gap-2">
              <Image src={rose} alt="background image z-10" className="w-40 h-40 object-cover rounded-full" />
              <p>⭐️⭐️⭐️⭐️⭐️</p>
              <p className="font-bold">Rose, Australia</p>
              <p>{`"The entire booking process was smooth and fast. The car was delivered directly to my hotel in Ubud and it was in excellent condition. Highly recommend for anyone traveling around Bali!"`}</p>
            </div>
            <div className="border border-gray-100 rounded-md p-5 flex flex-col justify-start items-center text-left gap-2">
              <Image src={michael} alt="background image z-10" className="w-40 h-40 object-cover rounded-full" />
              <p>⭐️⭐️⭐️⭐️⭐️</p>
              <p className="font-bold">Michael, Singapore</p>
              <p>{`"I needed a car for a business trip in Jakarta, and this service exceeded my expectations. The vehicle was clean, reliable, and the driver was very professional. Will definitely use again."`}</p>
            </div>
            <div className="border border-gray-100 rounded-md p-5 flex flex-col justify-start items-center text-left gap-2">
              <Image src={jonas} alt="background image z-10" className="w-40 h-40 object-cover rounded-full" />
              <p>⭐️⭐️⭐️⭐️⭐️</p>
              <p className="font-bold">Jonas, USA</p>
              <p>{`"I stayed in Indonesia for two months and needed a long-term rental. The company gave me a great deal and even provided free maintenance support. Super convenient!"`}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
