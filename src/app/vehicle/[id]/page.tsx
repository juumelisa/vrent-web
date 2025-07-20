"use client";
import * as React from 'react'
import { useEffect, useState } from "react";
import { fetchWithToken } from "../../../../lib/fetchWithToken";

import Image from "next/image";
import { useParams } from 'next/navigation';
import Button from '@/components/Button';
import { IoBookmarkOutline, IoChatboxOutline, IoLocationSharp } from 'react-icons/io5';
import { MdComment, MdVerifiedUser } from 'react-icons/md';
import { IoMdArrowBack, IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';

import edwardNewGate from "../../../assets/images/edward-newgate.png"
import rose from "../../../assets/images/rose.jpg"
import michael from "../../../assets/images/michael.jpg"
import jonas from "../../../assets/images/jonas.jpg"
import Link from 'next/link';

export default function Detail() {
  const params = useParams()
  const id = params && params.id ? params.id : ''
  console.log(params)
  // const [isLoadVehicle, setIsLoadVehicle] = useState(true)
  // const [isError, setIsError] = useState(false)
  const [showVehicle, setShowVehicle] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const vehicleObj = {
    id: 1,
    brand: '',
    model: '',
    images: [],
    city: '',
    province: '',
    rentPrice: 0,
    seat: 0
  }
  const [vehicle, setVehicle] = useState(vehicleObj)
  
  useEffect(() => {
    fetchVehicle()
  }, []);
    
    
  const fetchVehicle = async () => {
    const query: Record<string,string> = {
      id: typeof(id) === 'string' ? id : '',
    }
    const queryParams = new URLSearchParams(query);
    const data = await fetchWithToken(`/api/vehicle/info?${queryParams}`);
    const rest = await data.json()
    console.log(rest)
    if (rest.code === 200) {
      const result = rest.result[0]
      setVehicle(result)
      // setIsLoadVehicle(false)
      setShowVehicle(true)
    // } else {
      // setIsLoadVehicle(false)
      // setIsError(true)
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
    <div>
     <div className='w-full max-w-32'>
      <Link href="/vehicle" className="flex gap-3 items-center hover:text-blue-900 mb-5">
          <IoMdArrowBack />
          <p>Back To List</p>
        </Link>
      </div>
      {showVehicle && <div>
        <div className="w-full flex lg:gap-10">
          <div className='w-2/5'>
            <div className="h-96 relative w-full">
              <Image
                src={vehicle.images[imageIndex]}
                alt={`${vehicle.brand} ${vehicle.model} ${vehicle.city}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            {vehicle.images.length && <div className='mt-5 flex gap-2'>
              {vehicle.images.map((image, index) => (
                <button onClick={() => setImageIndex(index)} key={index} className='border rounded w-24 h-24 relative'>
                  <Image
                    src={image}
                    alt={`${vehicle.brand} ${vehicle.model} ${index}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>}
          </div>
          <div className='w-2/5'>
            <div className='flex mb-2'>
              <div className='bg-blue-50 rounded-full py-1 px-6'>
                <p>Car</p>
              </div>
            </div>
            <p className="font-bold text-lg">{vehicle.brand} {vehicle.model}</p>
            <p className='font-bold text-2xl'>{formatRupiah(vehicle.rentPrice)}/day</p>
            <div className="flex items-center gap-1 text-blue-900">
              <IoLocationSharp size={18} />
              <p>{vehicle.city}, {vehicle.province}</p>
            </div>
            <div className='mt-5 flex gap-5'>
              <p>⭐️ 4.9</p>
              <div className='flex gap-1 items-center'>
                <MdComment className='text-blue-900' />
                <p>35</p>
              </div>
            </div>
            <div className='mt-5'>
              <p className='font-bold'>Detail</p>
              <div>
                <p className='mt-1'>Brand: {vehicle.brand}</p>
                <p className='mt-1'>Color: Red</p>
                <p className='mt-1'>Seat: {vehicle.seat}</p>
              </div>
            </div>
            <div className='mt-5'>
              <p className='font-bold'>Description</p>
              <div>
                <p className='mt-1'>Lorem ipsum <b>dolor sit</b> amet, consectetur adipiscing elit. Nulla congue vestibulum consectetur. Integer tristique urna non velit aliquet faucibus. Fusce ullamcorper ipsum metus, eu aliquam arcu feugiat sed.</p>
                <p className='mt-1'><b>Ut dignissim:</b> odio id euismod aliquet, metus erat placerat nunc, nec hendrerit diam magna sit amet metus</p>
                <p className='mt-1'><b>Proin:</b> tincidunt pretium elit euismod suscipit</p>
              </div>
            </div>
          </div>
          <div className='w-1/5'>
            <div className='border border-gray-100 p-3 rounded bg-gray-50'>
              <p>Host</p>
              <div className='flex justify-start items-start gap-3 mt-5'>
                <div className='relative w-16 h-16'>
                  <Image
                    src={"https://res.cloudinary.com/dme13qwgd/image/upload/v1752942287/VRent/1752942283348-image.jpg"}
                    fill
                    style={{objectFit: 'cover'}}
                    alt='owner'
                    className='rounded-full'
                  />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <MdVerifiedUser className='text-blue-900' size={20}/>
                    <p className='font-bold'>Mila</p>
                  </div>
                  <p className='italic text-sm'>Online 3 hours ago</p>
                  <button className='flex items-center gap-2 text-blue-900 cursor-pointer hover:text-blue-400'>
                    <IoChatboxOutline />
                    <p>Chat</p>
                  </button>
                </div>
              </div>
              <div className='mt-5'>
                <div>
                  <Button onClick={() => console.log('booked')}>Book Now</Button>
                </div>
                <button className='w-full border border-blue-900 rounded flex gap-1 justify-center items-center py-3 mt-3'>
                  <IoBookmarkOutline size={18}/>
                  <p>Bookmark</p>
                </button>
              </div>
            </div>
            
          </div>
        </div>
        <div>
          <div className='mt-10 bg-blue-50 p-5'>
            <p className='font-bold text-2xl'>36 Review</p>
            <div>
              <p className='text-lg'>4.9 out of 5</p>
              <div className='flex text-yellow-500'>
                <IoMdStar size={20}/>
                <IoMdStar size={20}/>
                <IoMdStar size={20}/>
                <IoMdStarHalf size={20} />
                <IoMdStarOutline size={20}/>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1">
            <div className="border-b border-gray-100 py-10 flex text-left gap-3">
              <div className="min-w-20 max-w-20 min-h-20 max-h-20 relative">
                <Image
                  src={edwardNewGate}
                  alt="edward"
                  className="object-cover rounded-full border w-20 h-20"
                  fill
                />
              </div>
              <div>
                <p>⭐️⭐️⭐️⭐️⭐️</p>
                <p className="font-bold">Edward, Germany</p>
                <p>{`"It was the right decision to rent vehicle here, I spent less money and enjoy the trip. It was an amazing experience to have a ride for wildlife trip!"`}</p>
              </div>
            </div>
            <div className="border-b border-gray-100 py-5 flex text-left gap-3">
              <div className="min-w-20 max-h-20 relative">
                <Image
                  src={rose}
                  alt="Rose"
                  className="object-cover rounded-full border w-20"
                  fill
                />
              </div>
              <div>
                <p>⭐️⭐️⭐️⭐️⭐️</p>
                <p className="font-bold">Rose, Australia</p>
                <p>{`"The entire booking process was smooth and fast. The car was delivered directly to my hotel in Ubud and it was in excellent condition. Highly recommend for anyone traveling around Bali!"`}</p>
              </div>
            </div>
            <div className="border-b border-gray-100 py-5 flex text-left gap-3">
              <div className="min-w-20 max-h-20 relative">
                <Image
                  src={michael}
                  alt="Rose"
                  className="object-cover rounded-full border w-20"
                  fill
                />
              </div>
              <div>
                <p>⭐️⭐️⭐️⭐️⭐️</p>
                <p className="font-bold">Michael, Singapore</p>
                <p>{`"I needed a car for a business trip in Jakarta, and this service exceeded my expectations. The vehicle was clean, reliable, and the driver was very professional. Will definitely use again."`}</p>
              </div>
            </div>
            <div className="border-b border-gray-100 py-5 flex text-left gap-3">
              <div className="min-w-20 max-h-20 relative">
                <Image
                  src={jonas}
                  alt="Rose"
                  className="object-cover rounded-full border w-20"
                  fill
                />
              </div>
              <div>
                <p>⭐️⭐️⭐️⭐️⭐️</p>
                <p className="font-bold">Jonas, USA</p>
                <p>{`"I stayed in Indonesia for two months and needed a long-term rental. The company gave me a great deal and even provided free maintenance support. Super convenient!"`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
