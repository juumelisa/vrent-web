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
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Select, { GroupBase } from 'react-select';
import Calendar from "@/components/Calendar";
import { RiErrorWarningFill } from "react-icons/ri";

type CityProp = {
  id: number,
  name: string,
  state: string,
  image: string | null
}

type SelectProp = {
  value: string,
  label: string
}

export default function Home() {
  const router = useRouter()
  const [isLoad, setIsLoad] = useState(true)
  const [isError, setIsError] = useState(false)
  const [showCity, setShowCity] = useState(false)
  const [type, setType] = useState<SelectProp | null>()
  const [city, setCity] = useState<SelectProp | null>()
  const [cityList, setCityList] = useState<SelectProp[]>([
    {
      label: "",
      value: ""
    }
  ])
  const [PopularCityList, setPopularCityList] = useState<CityProp[]>([])
  const vehicleType: SelectProp[] = [
    {label: "All", value:"all"},
    {label: "Car", value: "car"},
    {label: "Motorbike", value: "motorbike"},
    {label: "Minivan", value: "minivan"}
  ]

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isErrorForm, setIsErrorForm] = useState(false)

  useEffect(() => {
    fetchCity("")
    fetchPopularCity()
  }, []);
  
  
  const fetchPopularCity = async () => {
    const query: Record<string,string> = {
      order: "searchCount",
      sort: "desc",
      limit: "8",
      offset: "0"
    }
    const params = new URLSearchParams(query);
    const data = await fetchWithToken(`/api/city/list?${params}`);
    const rest = await data.json()
    if (rest.code === 200) {
      const result = rest.result
      setPopularCityList(result)
      setIsLoad(false)
      setShowCity(true)
    } else {
      setIsLoad(false)
      setIsError(true)
    }
  }

  const fetchCity = async (search: string) => {
    setCityList([])
    // setIsLoadCityOption(true)
    const query: Record<string,string> = {
      order: "name",
      sort: "asc",
      limit: "3",
      offset: "0",
      q: search
    }
    const params = new URLSearchParams(query);
    const data = await fetchWithToken(`/api/city/list?${params}`);
    const rest = await data.json()
    if (rest.code === 200) {
      const result = rest.result
      const cityResult = result.map((el:CityProp) => {
        return {
          label: `${el.name}, ${el.state}`,
          value: `${el.id}`
        }
      })
      setCityList(cityResult)
      // setIsLoadCityOption(false)
    } else {
      // setIsLoadCityOption(false)
    }
  }

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (city?.value && type?.value && startDate && endDate) {
      setIsErrorForm(false)
      router.push(`vehicle?type=${type}`)
    } else {
      setIsErrorForm(true)
    }
  }

  const handleSearchLocation = (inputValue: string) => {
    fetchCity(inputValue)
  }

  const handleSelectStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
    if (city?.value && type?.value && endDate) {
      setIsErrorForm(false)
    }
  }
  const handleSelectEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value)
    if (city?.value && type?.value && startDate) {
      setIsErrorForm(false)
    }
  }
  const handleChangeLocation = (value: SelectProp | null) => {
    setCity(value)
    if (type?.value && startDate && endDate) {
      setIsErrorForm(false)
    }
  }
  const handleChangeType = (value: SelectProp | null) => {
    setType(value)
    if (city?.value && startDate && endDate) {
      setIsErrorForm(false)
    }
  }
  return (
    <div className="absolute bg-white text-black left-0 top-0">
      <div className="relative z-10 h-screen">
        <Image src={backgroundImage} alt="background image z-10" fill style={{objectFit: "cover"}}/>
        <div className="bg-blue-900 opacity-70 h-full w-full absolute top-0" />
        <div className="absolute top-0 w-full h-full">
          <div className="w-full lg:w-[580px] h-full flex flex-col justify-center p-5 md:p-10 xl:p-20 text-white">
            <h1 className="font-bold text-6xl leading-20">Explore and Travel</h1>
            <div className="w-full">
              <p className="font-bold text-xl my-6">Vehicle Finder</p>
              <div className="border-t w-12" />
              <div className="mt-10">
                <form onSubmit={onSubmitForm} className="w-full md:max-w-96 grid gap-2 md:gap-3 text-black">
                  <Select<SelectProp, false, GroupBase<SelectProp>>
                    instanceId="location-select"
                    value={city}
                    onChange={handleChangeLocation}
                    options={cityList}
                    placeholder="Select Location"
                    isSearchable
                    onInputChange={handleSearchLocation}
                  />
                  <Select<SelectProp, false, GroupBase<SelectProp>>
                    instanceId="type-select"
                    value={type}
                    onChange={handleChangeType}
                    options={vehicleType}
                    placeholder="Select Type"
                    isSearchable={false}
                  />
                  <div className="flex flex-row gap-2 md:gap-3">
                    <Calendar
                      placeholder="Start from"
                      customSelectClass={`bg-white px-2 py-1.5 rounded ${isErrorForm && !startDate ? 'border border-red-600' : 'border border-gray-100'}`}
                      selectedData={startDate}
                      minDate={new Date().toISOString()}
                      onChange={handleSelectStartDate}
                    />
                    <Calendar
                      placeholder="Until"
                      customSelectClass={`bg-white px-2 py-1.5 rounded ${isErrorForm && !endDate ? 'border border-red-600' : 'border border-gray-100'}`}
                      selectedData={endDate}
                      minDate={null}
                      onChange={handleSelectEndDate}
                    />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white py-2 font-bold rounded cursor-pointer">Search</button>
                  {isErrorForm && <div className="text-red-200 italic flex items-center gap-1"><RiErrorWarningFill /><span>Please fill all the form</span></div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-5 md:p-10 xl:p-20">
        <div>
          <h2 className="font-bold text-2xl">Popular Destination</h2>
          {isLoad && <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-5 gap-5">
            <div className="w-full h-72 animate-pulse bg-gray-200" />
            <div className="w-full h-72 animate-pulse bg-gray-200" />
            <div className="w-full h-72 animate-pulse bg-gray-200" />
            <div className="w-full h-72 animate-pulse bg-gray-200" />
            <div className="w-full h-72 animate-pulse bg-gray-200" />
            <div className="w-full h-72 animate-pulse bg-gray-200" />
            <div className="w-full h-72 animate-pulse bg-gray-200" />
            <div className="w-full h-72 animate-pulse bg-gray-200" />
          </div>}
          {isError && <div className="w-full h-full flex flex-col justify-center items-center mt-20">
            <Image src={serverError} alt="server error" className="w-full max-w-96"/>
            <div className="mt-2 flex flex-col justify-center items-center">
              <p className="text-xl text-red-600">Oops... something went wrong</p>
              <p className="text-blue-900">{`We'll fix it soon`}</p>
            </div>
          </div>}
          {showCity && <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-5 gap-5 rounded">
            {PopularCityList.map(city => (
              <Link href={`/vehicle?city=${city.name}`} key={city.id} className="w-full">
                <div className="h-72 relative">
                  {city.image &&
                  <Image
                    src={city.image}
                    alt={`${city.name}`}
                    fill
                    sizes="100"
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />}
                  {!city.image &&
                  <Image
                    src={noData}
                    style={{ objectFit: "cover" }}
                    fill
                    alt="no image found"
                    className="rounded-lg" 
                  />}
                  <div className="absolute top-0 left-0 w-full h-full bg-blue-900/60 rounded-lg">
                    <div className="w-full h-full flex justify-center items-center p-5">
                      <p className="capitalize text-white text-4xl font-bold text-center">{city.name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>}
        </div>
        <div className="mt-10 xl:mt-20">
          <h2 className="font-bold text-2xl">What our client says</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-5 gap-5">
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
